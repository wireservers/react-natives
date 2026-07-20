#!/usr/bin/env node
'use strict';

/**
 * Post-deploy smoke test against a LIVE wsui-license deployment.
 *
 * Read-only and safe to run against production: it never completes a purchase. The point is to
 * confirm the deployed instance rejects forged webhooks and unknown plans *before* Stripe is
 * pointed at it — a service that accepts unsigned webhooks would mint free licenses for anyone
 * who finds the URL.
 *
 * Usage:
 *   BASE_URL=https://wsui-license.azurewebsites.net node scripts/smoke.js
 */

const BASE_URL = (process.env.BASE_URL || '').replace(/\/$/, '');
if (!BASE_URL) {
  console.error('BASE_URL is required, e.g. BASE_URL=https://wsui-license.azurewebsites.net');
  process.exit(1);
}

let pass = 0;
let fail = 0;
function check(name, ok, detail) {
  if (ok) { pass += 1; console.log(`  ok   ${name}`); }
  else { fail += 1; console.log(`  FAIL ${name}${detail ? `\n         ${detail}` : ''}`); }
}

async function req(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  const text = await response.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* non-JSON */ }
  return { status: response.status, json, text };
}

(async () => {
  console.log(`smoke testing ${BASE_URL}\n`);

  console.log('liveness');
  try {
    const health = await req('/health');
    check('GET /health returns 200', health.status === 200, `got ${health.status}`);
    check('  ...with {ok:true}', health.json && health.json.ok === true, JSON.stringify(health.json));
  } catch (error) {
    check('service is reachable', false, error.message);
    console.log('\nService unreachable — aborting.');
    process.exit(1);
  }

  console.log('\nplan catalogue');
  const plans = await req('/plans');
  check('GET /plans returns 200', plans.status === 200, `got ${plans.status}`);
  check('  ...lists plans', Boolean(plans.json && Array.isArray(plans.json.plans) && plans.json.plans.length > 0));
  check('  ...does not leak price env names', !plans.text.includes('STRIPE_PRICE'));
  check('  ...does not leak connection strings', !/AccountKey|whsec_|sk_live|sk_test/.test(plans.text));

  console.log('\nwebhook rejects forged deliveries');
  const fakeEvent = JSON.stringify({
    id: `evt_smoke_${Date.now()}`,
    type: 'checkout.session.completed',
    data: { object: { id: 'cs_smoke', customer_email: 'smoke@example.com', metadata: {} } },
  });

  const unsigned = await req('/webhook', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: fakeEvent,
  });
  check('unsigned webhook is rejected (400)', unsigned.status === 400, `got ${unsigned.status} — A 200 HERE MEANS ANYONE CAN MINT LICENSES`);

  const badSig = await req('/webhook', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': 't=1,v1=deadbeef' },
    body: fakeEvent,
  });
  check('forged signature is rejected (400)', badSig.status === 400, `got ${badSig.status}`);
  check('  ...error body leaks no secret', !/whsec_|sk_live|sk_test/.test(badSig.text));

  console.log('\ncheckout input validation');
  const unknownPlan = await req('/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ plan: 'free-please' }),
  });
  check('unknown plan is rejected (400)', unknownPlan.status === 400, `got ${unknownPlan.status}`);

  const protoPlan = await req('/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ plan: '__proto__' }),
  });
  check('__proto__ is rejected (400)', protoPlan.status === 400, `got ${protoPlan.status}`);

  const noPlan = await req('/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({}),
  });
  check('missing plan is rejected (400)', noPlan.status === 400, `got ${noPlan.status}`);

  console.log('\nlicense lookup validation');
  const noSession = await req('/license');
  check('missing session_id is rejected (400)', noSession.status === 400, `got ${noSession.status}`);

  const bogusSession = await req('/license?session_id=cs_definitely_not_real');
  check('bogus session does not return a key', !(bogusSession.json && bogusSession.json.licenseKey), bogusSession.text.slice(0, 120));

  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail > 0) {
    console.log('\nDo NOT point Stripe at this deployment until the failures above are resolved.');
  }
  process.exit(fail === 0 ? 0 : 1);
})();
