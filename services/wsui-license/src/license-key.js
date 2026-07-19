'use strict';

/**
 * License key minting.
 *
 * Must stay byte-compatible with the verifier in
 * `@wireservers-ui/react-natives-pro/src/licensing/license.ts` — the signature covers the exact
 * payload bytes, so any change to the key order or JSON shape here invalidates every key the
 * client can read. The round-trip is covered by test/run.js.
 */
const { ed25519 } = require('@noble/curves/ed25519');

const PRODUCT_ID = 'react-natives-pro';
const KEY_PREFIX = 'WSUI1';
const BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function base64UrlEncode(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];
    out += BASE64URL[b0 >> 2];
    out += BASE64URL[((b0 & 0x03) << 4) | (b1 === undefined ? 0 : b1 >> 4)];
    if (b1 === undefined) break;
    out += BASE64URL[((b1 & 0x0f) << 2) | (b2 === undefined ? 0 : b2 >> 6)];
    if (b2 === undefined) break;
    out += BASE64URL[b2 & 0x3f];
  }
  return out;
}

/**
 * @param {object} options
 * @param {string} options.email        buyer email
 * @param {string} [options.edition]    'pro' | 'team' | 'enterprise'
 * @param {number} [options.seats]
 * @param {number} [options.expiresAt]  epoch seconds; omit for perpetual
 * @param {string} options.privateKeyHex signing key (never logged, never persisted)
 * @param {number} [options.issuedAt]   epoch seconds; injectable for deterministic tests
 */
function mintLicenseKey(options) {
  const { email, edition = 'pro', seats, expiresAt, privateKeyHex, issuedAt } = options;
  if (!email) throw new Error('email is required');
  if (!privateKeyHex) throw new Error('privateKeyHex is required');

  const payload = {
    email,
    product: PRODUCT_ID,
    edition,
    issuedAt: issuedAt ?? Math.floor(Date.now() / 1000),
  };
  if (seats != null) payload.seats = Number(seats);
  if (expiresAt != null) payload.expiresAt = Number(expiresAt);

  const payloadBytes = Buffer.from(JSON.stringify(payload), 'utf8');
  const signature = ed25519.sign(payloadBytes, Buffer.from(privateKeyHex, 'hex'));
  return `${KEY_PREFIX}.${base64UrlEncode(payloadBytes)}.${base64UrlEncode(signature)}`;
}

module.exports = { mintLicenseKey, PRODUCT_ID, KEY_PREFIX, base64UrlEncode };
