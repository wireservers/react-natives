'use strict';

const { mintLicenseKey } = require('./license-key');
const { buildOrderEmail } = require('./order-email');

/**
 * Turn a completed Stripe checkout session into a license key + order email.
 *
 * Idempotency is enforced here rather than at the route: Stripe retries webhooks on any non-2xx
 * response (and occasionally delivers duplicates even on success), and a customer receiving two
 * "here is your license" emails looks broken. Keyed on the Stripe event id.
 *
 * Deliberately takes `store` and `mailer` as parameters so the whole flow is testable without
 * Stripe, a database, or an SMTP server.
 */
async function fulfillCheckout({ event, store, mailer, privateKeyHex, now }) {
  const eventId = event.id;
  if (!eventId) throw new Error('event.id is required');

  const already = await store.get(eventId);
  if (already) {
    return { status: 'duplicate', licenseKey: already.licenseKey, emailSent: false };
  }

  const session = event.data && event.data.object;
  if (!session) throw new Error('event.data.object is required');

  const email =
    session.customer_email ||
    (session.customer_details && session.customer_details.email) ||
    null;
  if (!email) throw new Error('no customer email on the checkout session');

  // Seats/edition ride along as Checkout metadata so pricing changes don't require a code change.
  const metadata = session.metadata || {};
  const edition = metadata.edition || 'pro';
  const seats = metadata.seats != null ? Number(metadata.seats) : undefined;
  const expiresAt = metadata.expires_at != null ? Number(metadata.expires_at) : undefined;

  const issuedAt = Math.floor((now ? now.getTime() : Date.now()) / 1000);
  const licenseKey = mintLicenseKey({
    email,
    edition,
    seats,
    expiresAt,
    privateKeyHex,
    issuedAt,
  });

  const email_ = buildOrderEmail({
    email,
    licenseKey,
    edition,
    seats,
    amountMinor: session.amount_total,
    currency: session.currency,
    createdAt: session.created || issuedAt,
    orderId: session.id ? String(session.id).slice(-12) : eventId.slice(-12),
    receiptUrl: session.receipt_url,
    expiresAt,
  });

  // Record BEFORE sending: a crash mid-send must not cause a retry to mint a second key.
  // Worst case the customer misses an email and asks for a resend, which is recoverable;
  // a duplicate key with different bytes is not.
  await store.put(eventId, { licenseKey, email, issuedAt });

  await mailer.send({
    to: email,
    subject: email_.subject,
    text: email_.text,
    html: email_.html,
  });

  return { status: 'fulfilled', licenseKey, emailSent: true, email };
}

/** In-memory store. Swap for Table Storage / SQL in production — same two methods. */
function createMemoryStore() {
  const map = new Map();
  return {
    async get(id) {
      return map.get(id) || null;
    },
    async put(id, value) {
      map.set(id, value);
    },
    get size() {
      return map.size;
    },
  };
}

/** Captures messages instead of sending. Used by the tests. */
function createMemoryMailer() {
  const sent = [];
  return {
    async send(message) {
      sent.push(message);
    },
    sent,
  };
}

module.exports = { fulfillCheckout, createMemoryStore, createMemoryMailer };
