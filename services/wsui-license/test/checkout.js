'use strict';

/**
 * Checkout endpoint, plan catalogue, and the production-readiness guard.
 *
 * Stripe is stubbed here: these tests are about *our* logic — plan resolution, the metadata that
 * rides on the session, and refusing to boot misconfigured — not about Stripe's API.
 */
const http = require('http');
const { createApp } = require('../src/server');
const { createMemoryStore, createMemoryMailer } = require('../src/fulfillment');
const { PLANS, getPlan, resolvePriceId, buildCheckoutMetadata } = require('../src/pricing');
const { createAdapters, assertProductionReady } = require('../src/adapters');

let pass = 0;
let fail = 0;
function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { pass += 1; console.log(`  ok   ${name}`); }
  else { fail += 1; console.log(`  FAIL ${name}\n         expected ${JSON.stringify(expected)}\n         actual   ${JSON.stringify(actual)}`); }
}
function checkThat(name, condition) { check(name, Boolean(condition), true); }

function request(server, { method = 'GET', path: urlPath, body, headers = {} }) {
  return new Promise((resolve) => {
    const { port } = server.address();
    const req = http.request({ host: '127.0.0.1', port, path: urlPath, method, headers }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch { /* non-JSON */ }
        resolve({ status: res.statusCode, json });
      });
    });
    if (body) req.write(body);
    req.end();
  });
}

console.log('plan catalogue');
check('pro is 1 seat', getPlan('pro').seats, 1);
check('team is 5 seats', getPlan('team').seats, 5);
check('enterprise is 25 seats', getPlan('enterprise').seats, 25);
check('unknown plan resolves to null', getPlan('free'), null);
check('unknown plan (undefined) resolves to null', getPlan(undefined), null);
// A client-supplied plan id must never reach Stripe unchecked.
check('prototype pollution attempt is rejected', getPlan('constructor'), null);
check('__proto__ is rejected', getPlan('__proto__'), null);

console.log('\nprice resolution');
check('missing price env throws', (() => {
  try { resolvePriceId(getPlan('pro'), {}); return 'no-throw'; } catch { return 'threw'; }
})(), 'threw');
check('resolves from env', resolvePriceId(getPlan('pro'), { STRIPE_PRICE_PRO: 'price_123' }), 'price_123');

console.log('\ncheckout metadata (read back by the webhook)');
const meta = buildCheckoutMetadata(getPlan('team'));
check('carries edition', meta.edition, 'team');
check('carries seats as a string (Stripe requires strings)', meta.seats, '5');
check('carries the plan id', meta.plan, 'team');
checkThat('perpetual plan has no expiry', meta.expires_at === undefined);
checkThat('all metadata values are strings', Object.values(meta).every((v) => typeof v === 'string'));

console.log('\nproduction readiness guard');
check('memory adapters are fine outside production', (() => {
  try { assertProductionReady({ storeKind: 'memory', mailerKind: 'memory' }, { NODE_ENV: 'development' }); return 'ok'; } catch { return 'threw'; }
})(), 'ok');
check('memory store in production throws', (() => {
  try { assertProductionReady({ storeKind: 'memory', mailerKind: 'acs' }, { NODE_ENV: 'production' }); return 'no-throw'; } catch { return 'threw'; }
})(), 'threw');
check('memory mailer in production throws', (() => {
  try { assertProductionReady({ storeKind: 'table-storage', mailerKind: 'memory' }, { NODE_ENV: 'production' }); return 'no-throw'; } catch { return 'threw'; }
})(), 'threw');
check('real adapters in production are fine', (() => {
  try { assertProductionReady({ storeKind: 'table-storage', mailerKind: 'acs' }, { NODE_ENV: 'production' }); return 'ok'; } catch { return 'threw'; }
})(), 'ok');
check('unconfigured env selects memory adapters', createAdapters({}).storeKind, 'memory');
check('unconfigured env selects memory mailer', createAdapters({}).mailerKind, 'memory');

(async () => {
  console.log('\nPOST /checkout');
  const created = [];
  const stripeStub = {
    checkout: {
      sessions: {
        async create(params) {
          created.push(params);
          return { url: 'https://checkout.stripe.com/c/pay/test', id: 'cs_test_new' };
        },
      },
    },
    webhooks: { constructEvent() { throw new Error('unused'); } },
  };

  const app = createApp({
    stripe: stripeStub,
    store: createMemoryStore(),
    mailer: createMemoryMailer(),
    privateKeyHex: 'aa'.repeat(32),
    webhookSecret: 'whsec_x',
    env: {
      STRIPE_PRICE_PRO: 'price_pro_123',
      STRIPE_PRICE_TEAM: 'price_team_456',
      PUBLIC_SITE_URL: 'https://reactnatives.com',
    },
  });
  const server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });

  const post = (payload) => request(server, {
    method: 'POST',
    path: '/checkout',
    body: JSON.stringify(payload),
    headers: { 'content-type': 'application/json', 'content-length': Buffer.byteLength(JSON.stringify(payload)) },
  });

  const ok = await post({ plan: 'pro' });
  check('valid plan returns 200', ok.status, 200);
  checkThat('returns a Stripe checkout url', ok.json && ok.json.url.includes('checkout.stripe.com'));
  check('uses the configured price', created[0].line_items[0].price, 'price_pro_123');
  check('attaches edition metadata', created[0].metadata.edition, 'pro');
  check('attaches seat metadata', created[0].metadata.seats, '1');
  checkThat('success_url carries the session id placeholder', created[0].success_url.includes('{CHECKOUT_SESSION_ID}'));
  checkThat('success_url points at /thanks', created[0].success_url.includes('/thanks'));

  const team = await post({ plan: 'team' });
  check('team plan works', team.status, 200);
  check('team uses its own price', created[1].line_items[0].price, 'price_team_456');
  check('team carries 5 seats', created[1].metadata.seats, '5');

  const unknown = await post({ plan: 'not-a-plan' });
  check('unknown plan is a 400', unknown.status, 400);
  const missing = await post({});
  check('missing plan is a 400', missing.status, 400);
  check('no Stripe session created for bad input', created.length, 2);

  // Configured plan with no price env — must fail closed, not sell at the wrong price.
  const unpriced = await post({ plan: 'enterprise' });
  check('plan without a configured price is a 500', unpriced.status, 500);
  check('still no extra Stripe session', created.length, 2);

  console.log('\nGET /plans');
  const plans = await request(server, { path: '/plans' });
  check('lists every plan', plans.json.plans.length, Object.keys(PLANS).length);
  checkThat('does not leak price env names', !JSON.stringify(plans.json).includes('STRIPE_PRICE'));

  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})();
