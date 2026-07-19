'use strict';

/**
 * Service tests. The important one is the round-trip: a key minted here must verify with the
 * *client* verifier in the -pro package. Those are separate implementations of the same key
 * format, so drift between them would silently break every license sold.
 */
const path = require('path');
const { execFileSync } = require('child_process');
const Module = require('module');
const { ed25519 } = require('@noble/curves/ed25519');

const { mintLicenseKey } = require('../src/license-key');
const { buildOrderEmail } = require('../src/order-email');
const { fulfillCheckout, createMemoryStore, createMemoryMailer } = require('../src/fulfillment');

const PRO = path.resolve(__dirname, '../../../packages/react-natives-pro');
const TSC = path.resolve(__dirname, '../../../site/node_modules/.bin/tsc');
const OUT = path.join(__dirname, '.compiled');

let pass = 0;
let fail = 0;
function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { pass += 1; console.log(`  ok   ${name}`); }
  else { fail += 1; console.log(`  FAIL ${name}\n         expected ${JSON.stringify(expected)}\n         actual   ${JSON.stringify(actual)}`); }
}
function checkThat(name, condition) { check(name, Boolean(condition), true); }

// Deterministic keypair for the run.
const privateKey = ed25519.utils.randomPrivateKey();
const privateKeyHex = Buffer.from(privateKey).toString('hex');
const publicKeyHex = Buffer.from(ed25519.getPublicKey(privateKey)).toString('hex');

// --- Compile the client verifier and point it at this run's public key. -------------------
execFileSync(TSC, [
  path.join(PRO, 'src/licensing/license.ts'),
  path.join(PRO, 'src/licensing/encoding.ts'),
  '--outDir', OUT, '--module', 'commonjs', '--target', 'es2020',
  '--skipLibCheck', '--esModuleInterop', '--moduleResolution', 'node', '--strict',
], { stdio: 'inherit', cwd: PRO });

const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith('@noble/')) {
    return origResolve.call(this, path.join(PRO, 'node_modules', request), ...rest);
  }
  return origResolve.call(this, request, ...rest);
};

// Swap the embedded production public key for this run's, so the round-trip exercises the real
// verifier logic without needing the production signing key.
const fs = require('fs');
const compiled = path.join(OUT, 'license.js');
fs.writeFileSync(
  compiled,
  fs.readFileSync(compiled, 'utf8').replace(
    /const LICENSE_PUBLIC_KEY_HEX = '[0-9a-f]+'/,
    `const LICENSE_PUBLIC_KEY_HEX = '${publicKeyHex}'`,
  ),
);
const client = require(compiled);

console.log('round-trip: service mints -> client verifies');
const key = mintLicenseKey({ email: 'buyer@example.com', edition: 'team', seats: 10, privateKeyHex });
const verified = client.verifyLicenseKey(key);
check('client accepts a service-minted key', verified.valid, true);
check('email survives the round trip', verified.license && verified.license.email, 'buyer@example.com');
check('edition survives', verified.license && verified.license.edition, 'team');
check('seats survive', verified.license && verified.license.seats, 10);

const perpetual = client.verifyLicenseKey(mintLicenseKey({ email: 'a@b.com', privateKeyHex }));
check('perpetual key (no expiry) verifies', perpetual.valid, true);
check('default edition is pro', perpetual.license && perpetual.license.edition, 'pro');

const future = Math.floor(Date.now() / 1000) + 86400;
check('future-dated expiry verifies',
  client.verifyLicenseKey(mintLicenseKey({ email: 'a@b.com', privateKeyHex, expiresAt: future })).valid, true);
check('past-dated expiry is rejected',
  client.verifyLicenseKey(mintLicenseKey({ email: 'a@b.com', privateKeyHex, expiresAt: 1000 })).reason, 'expired');

// A key minted with a different signing key must not verify — proves the signature is load-bearing.
const otherKey = Buffer.from(ed25519.utils.randomPrivateKey()).toString('hex');
check('key from a different signing key is rejected',
  client.verifyLicenseKey(mintLicenseKey({ email: 'a@b.com', privateKeyHex: otherKey })).reason, 'bad-signature');

console.log('\nmintLicenseKey guards');
check('email is required', (() => { try { mintLicenseKey({ privateKeyHex }); return 'no-throw'; } catch (e) { return 'threw'; } })(), 'threw');
check('privateKeyHex is required', (() => { try { mintLicenseKey({ email: 'a@b.com' }); return 'no-throw'; } catch (e) { return 'threw'; } })(), 'threw');
checkThat('key uses the WSUI1 prefix', key.startsWith('WSUI1.'));
check('key has three segments', key.split('.').length, 3);

console.log('\norder email');
const mail = buildOrderEmail({
  email: 'buyer@example.com',
  licenseKey: key,
  edition: 'team',
  seats: 10,
  amountMinor: 29900,
  currency: 'usd',
  createdAt: 1784497435,
  orderId: 'cs_test_1234',
  receiptUrl: 'https://stripe.com/receipt/abc',
});
checkThat('subject names the product', mail.subject.includes('react-natives Pro'));
checkThat('subject carries the order id', mail.subject.includes('cs_test_1234'));
for (const part of ['text', 'html']) {
  checkThat(`${part}: contains the license key`, mail[part].includes(key));
  checkThat(`${part}: contains the install command`, mail[part].includes('npm i @wireservers-ui/react-natives'));
  checkThat(`${part}: contains setLicenseKey`, mail[part].includes('setLicenseKey'));
  checkThat(`${part}: contains the Tailwind glob`, mail[part].includes('react-natives-pro/src/**/*'));
  checkThat(`${part}: names DataGridPro`, mail[part].includes('DataGridPro'));
  checkThat(`${part}: names DateRangePicker`, mail[part].includes('DateRangePicker'));
  checkThat(`${part}: has a support address`, mail[part].includes('todd@wireservers.com'));
  checkThat(`${part}: shows the amount`, mail[part].includes('299.00 USD'));
  checkThat(`${part}: shows the seat count`, mail[part].includes('10 seats'));
}
checkThat('html has no unreplaced {{tokens}}', !/\{\{|\}\}/.test(mail.html));
checkThat('text has no unreplaced {{tokens}}', !/\{\{|\}\}/.test(mail.text));
checkThat('perpetual term is stated', buildOrderEmail({ email: 'a@b.com', licenseKey: key }).text.includes('perpetual'));
checkThat('expiring term shows the date',
  buildOrderEmail({ email: 'a@b.com', licenseKey: key, expiresAt: 1893456000 }).text.includes('expires 2030-01-01'));
check('singular seat is not pluralised',
  buildOrderEmail({ email: 'a@b.com', licenseKey: key, seats: 1 }).text.includes('1 seat\n') ||
  buildOrderEmail({ email: 'a@b.com', licenseKey: key, seats: 1 }).text.includes('1 seat '), true);
check('email is required', (() => { try { buildOrderEmail({ licenseKey: key }); return 'no-throw'; } catch { return 'threw'; } })(), 'threw');
check('licenseKey is required', (() => { try { buildOrderEmail({ email: 'a@b.com' }); return 'no-throw'; } catch { return 'threw'; } })(), 'threw');

// HTML injection: a hostile display name must not break out into markup.
const injected = buildOrderEmail({ email: '<script>alert(1)</script>@x.com', licenseKey: key });
checkThat('html escapes a script tag in the email address', !injected.html.includes('<script>'));
checkThat('html keeps the escaped form', injected.html.includes('&lt;script&gt;'));

console.log('\nfulfillment + idempotency');
function makeEvent(id, overrides = {}) {
  return {
    id,
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_abc123456789',
        customer_email: 'buyer@example.com',
        amount_total: 29900,
        currency: 'usd',
        created: 1784497435,
        metadata: { edition: 'pro', seats: '5' },
        ...overrides,
      },
    },
  };
}

(async () => {
  const store = createMemoryStore();
  const mailer = createMemoryMailer();

  const first = await fulfillCheckout({ event: makeEvent('evt_1'), store, mailer, privateKeyHex });
  check('first delivery fulfils', first.status, 'fulfilled');
  check('first delivery sends one email', mailer.sent.length, 1);
  checkThat('minted key verifies on the client', client.verifyLicenseKey(first.licenseKey).valid);

  // Stripe retries the same event — must not mint again or email again.
  const second = await fulfillCheckout({ event: makeEvent('evt_1'), store, mailer, privateKeyHex });
  check('replayed event is flagged duplicate', second.status, 'duplicate');
  check('replay sends NO second email', mailer.sent.length, 1);
  check('replay returns the same key', second.licenseKey, first.licenseKey);
  check('store holds a single record', store.size, 1);

  // A genuinely different purchase must still go through.
  const third = await fulfillCheckout({ event: makeEvent('evt_2'), store, mailer, privateKeyHex });
  check('a different event still fulfils', third.status, 'fulfilled');
  check('second purchase sends its own email', mailer.sent.length, 2);

  // Email can arrive via customer_details instead of customer_email.
  const viaDetails = makeEvent('evt_3', { customer_email: null, customer_details: { email: 'other@example.com' } });
  const fourth = await fulfillCheckout({ event: viaDetails, store, mailer, privateKeyHex });
  check('falls back to customer_details.email', fourth.email, 'other@example.com');

  // No email anywhere is a hard error — better to fail the webhook and let Stripe retry.
  const noEmail = makeEvent('evt_4', { customer_email: null });
  let threw = false;
  try { await fulfillCheckout({ event: noEmail, store, mailer, privateKeyHex }); } catch { threw = true; }
  check('missing customer email throws', threw, true);

  check('mail goes to the buyer', mailer.sent[0].to, 'buyer@example.com');
  checkThat('mail has both text and html parts', mailer.sent[0].text && mailer.sent[0].html);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})();
