'use strict';

/**
 * HTTP-layer tests, run against a real Stripe SDK instance (offline — `constructEvent` is pure
 * HMAC) and a real signature. The case that matters most: an unsigned or forged webhook must
 * never mint a key, because that would let anyone issue themselves a free license.
 */
const crypto = require('crypto');
const http = require('http');
const { ed25519 } = require('@noble/curves/ed25519');
const Stripe = require('stripe');
const { createApp } = require('../src/server');
const { createMemoryStore, createMemoryMailer } = require('../src/fulfillment');

let pass = 0;
let fail = 0;
function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { pass += 1; console.log(`  ok   ${name}`); }
  else { fail += 1; console.log(`  FAIL ${name}\n         expected ${JSON.stringify(expected)}\n         actual   ${JSON.stringify(actual)}`); }
}

const WEBHOOK_SECRET = 'whsec_test_secret_do_not_use_in_production';
const privateKeyHex = Buffer.from(ed25519.utils.randomPrivateKey()).toString('hex');

/** Build the Stripe-Signature header exactly as Stripe does. */
function signPayload(payload, secret, timestamp = Math.floor(Date.now() / 1000)) {
  const signed = `${timestamp}.${payload}`;
  const signature = crypto.createHmac('sha256', secret).update(signed).digest('hex');
  return `t=${timestamp},v1=${signature}`;
}

function request(server, { method = 'GET', path: urlPath, body, headers = {} }) {
  return new Promise((resolve) => {
    const { port } = server.address();
    const req = http.request(
      { host: '127.0.0.1', port, path: urlPath, method, headers },
      (res) => {
        let data = '';
        res.on('data', (c) => { data += c; });
        res.on('end', () => {
          let json = null;
          try { json = JSON.parse(data); } catch { /* non-JSON body */ }
          resolve({ status: res.statusCode, body: data, json });
        });
      },
    );
    if (body) req.write(body);
    req.end();
  });
}

const checkoutEvent = (id) => JSON.stringify({
  id,
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_http_1',
      customer_email: 'buyer@example.com',
      amount_total: 29900,
      currency: 'usd',
      created: 1784497435,
      metadata: { edition: 'pro', seats: '5' },
    },
  },
});

(async () => {
  const store = createMemoryStore();
  const mailer = createMemoryMailer();
  const app = createApp({
    stripe: new Stripe('sk_test_dummy'),
    store,
    mailer,
    privateKeyHex,
    webhookSecret: WEBHOOK_SECRET,
  });
  const server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });

  const post = (payload, signature) => request(server, {
    method: 'POST',
    path: '/webhook',
    body: payload,
    headers: {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(payload),
      ...(signature ? { 'stripe-signature': signature } : {}),
    },
  });

  console.log('health');
  check('GET /health returns ok', (await request(server, { path: '/health' })).json, { ok: true });

  console.log('\nwebhook signature enforcement');
  const payload = checkoutEvent('evt_http_1');

  const noSig = await post(payload, null);
  check('missing signature is rejected (400)', noSig.status, 400);
  check('  ...and mints nothing', mailer.sent.length, 0);

  const badSig = await post(payload, 't=1,v1=deadbeef');
  check('garbage signature is rejected (400)', badSig.status, 400);
  check('  ...and mints nothing', mailer.sent.length, 0);

  const wrongSecret = await post(payload, signPayload(payload, 'whsec_the_wrong_secret'));
  check('signature from the wrong secret is rejected (400)', wrongSecret.status, 400);
  check('  ...and mints nothing', mailer.sent.length, 0);

  // Valid signature over a DIFFERENT body — catches naive implementations that verify the
  // header in isolation rather than against the received bytes.
  const otherPayload = checkoutEvent('evt_attacker');
  const mismatched = await post(payload, signPayload(otherPayload, WEBHOOK_SECRET));
  check('signature not matching the body is rejected (400)', mismatched.status, 400);
  check('  ...and mints nothing', mailer.sent.length, 0);

  // Stripe's SDK enforces a default 5-minute tolerance on the timestamp.
  const stale = await post(payload, signPayload(payload, WEBHOOK_SECRET, Math.floor(Date.now() / 1000) - 3600));
  check('stale timestamp is rejected (replay defence)', stale.status, 400);
  check('  ...and mints nothing', mailer.sent.length, 0);

  console.log('\nwebhook happy path');
  const good = await post(payload, signPayload(payload, WEBHOOK_SECRET));
  check('valid signature is accepted (200)', good.status, 200);
  check('reports fulfilled', good.json && good.json.status, 'fulfilled');
  check('sends exactly one email', mailer.sent.length, 1);
  check('email goes to the buyer', mailer.sent[0].to, 'buyer@example.com');

  console.log('\nwebhook idempotency over HTTP');
  const replay = await post(payload, signPayload(payload, WEBHOOK_SECRET));
  check('replay is accepted (200, so Stripe stops retrying)', replay.status, 200);
  check('replay reports duplicate', replay.json && replay.json.status, 'duplicate');
  check('replay sends no second email', mailer.sent.length, 1);

  console.log('\nunrelated event types');
  const other = JSON.stringify({ id: 'evt_other', type: 'invoice.paid', data: { object: {} } });
  const ignored = await post(other, signPayload(other, WEBHOOK_SECRET));
  check('unrelated event is acknowledged', ignored.status, 200);
  check('  ...and marked ignored', ignored.json && ignored.json.ignored, 'invoice.paid');
  check('  ...and mints nothing', mailer.sent.length, 1);

  console.log('\nGET /license');
  const noSession = await request(server, { path: '/license' });
  check('missing session_id is a 400', noSession.status, 400);

  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})();
