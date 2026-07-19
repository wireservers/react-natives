#!/usr/bin/env node
/**
 * Mint a license key.
 *
 * The signing private key is read from the WSUI_LICENSE_PRIVATE_KEY environment variable and is
 * never stored in this repository. In production this same logic runs inside the license
 * service, which pulls the key from Key Vault after verifying a Stripe webhook signature.
 *
 * Usage:
 *   WSUI_LICENSE_PRIVATE_KEY=<hex> node tools/sign-license.js \
 *     --email someone@example.com [--edition pro] [--seats 5] [--expires 2027-01-01]
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

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 2) {
    const flag = argv[i];
    if (!flag.startsWith('--')) continue;
    args[flag.slice(2)] = argv[i + 1];
  }
  return args;
}

function main() {
  const privateKeyHex = process.env.WSUI_LICENSE_PRIVATE_KEY;
  if (!privateKeyHex) {
    console.error('WSUI_LICENSE_PRIVATE_KEY is not set.');
    process.exit(1);
  }

  const args = parseArgs(process.argv);
  if (!args.email) {
    console.error('--email is required.');
    process.exit(1);
  }

  const payload = {
    email: args.email,
    product: PRODUCT_ID,
    edition: args.edition || 'pro',
    issuedAt: Math.floor(Date.now() / 1000),
  };
  if (args.seats) payload.seats = Number(args.seats);
  if (args.expires) {
    const expires = Math.floor(new Date(args.expires).getTime() / 1000);
    if (Number.isNaN(expires)) {
      console.error(`Could not parse --expires "${args.expires}".`);
      process.exit(1);
    }
    payload.expiresAt = expires;
  }

  // Key ordering matters: the signature covers these exact bytes, so the verifier must be
  // handed the payload verbatim rather than a re-serialized copy.
  const payloadBytes = Buffer.from(JSON.stringify(payload), 'utf8');
  const signature = ed25519.sign(payloadBytes, Buffer.from(privateKeyHex, 'hex'));

  const key = `${KEY_PREFIX}.${base64UrlEncode(payloadBytes)}.${base64UrlEncode(signature)}`;
  console.log(key);
}

main();
