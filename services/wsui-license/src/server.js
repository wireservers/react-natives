'use strict';

/**
 * License issuing service.
 *
 * Routes:
 *   POST /webhook            Stripe checkout.session.completed -> mint key, send order email
 *   GET  /license            ?session_id=... -> key shown inline on the /thanks page
 *   GET  /health
 *
 * Secrets come from the environment (Key Vault in production). The signing key is never logged
 * and never leaves this process.
 */
const express = require('express');
const Stripe = require('stripe');
const { mintLicenseKey } = require('./license-key');
const { fulfillCheckout, createMemoryStore, createMemoryMailer } = require('./fulfillment');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function createApp({ stripe, store, mailer, privateKeyHex, webhookSecret }) {
  const app = express();

  app.get('/health', (_req, res) => res.json({ ok: true }));

  // Stripe signature verification needs the RAW body — express.json() would reparse it and the
  // computed HMAC would never match. This route must stay ahead of any JSON body parser.
  app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        webhookSecret,
      );
    } catch (error) {
      // Never fulfil on an unverified payload — anyone could POST a fake "purchase".
      console.warn('[webhook] signature verification failed:', error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type !== 'checkout.session.completed') {
      return res.json({ received: true, ignored: event.type });
    }

    try {
      const result = await fulfillCheckout({ event, store, mailer, privateKeyHex });
      return res.json({ received: true, status: result.status });
    } catch (error) {
      // 500 makes Stripe retry, which is what we want for a transient mail/store failure.
      console.error('[webhook] fulfilment failed:', error.message);
      return res.status(500).json({ error: 'fulfilment failed' });
    }
  });

  // Inline key retrieval for the /thanks page — covers the case where email is slow or filtered.
  app.get('/license', async (req, res) => {
    const sessionId = req.query.session_id;
    if (!sessionId) return res.status(400).json({ error: 'session_id is required' });

    try {
      const session = await stripe.checkout.sessions.retrieve(String(sessionId));
      if (session.payment_status !== 'paid') {
        return res.status(402).json({ error: 'session is not paid' });
      }
      const email =
        session.customer_email || (session.customer_details && session.customer_details.email);
      if (!email) return res.status(422).json({ error: 'no customer email on session' });

      const metadata = session.metadata || {};
      const licenseKey = mintLicenseKey({
        email,
        edition: metadata.edition || 'pro',
        seats: metadata.seats != null ? Number(metadata.seats) : undefined,
        expiresAt: metadata.expires_at != null ? Number(metadata.expires_at) : undefined,
        privateKeyHex,
      });
      return res.json({ licenseKey, email });
    } catch (error) {
      console.error('[license] lookup failed:', error.message);
      return res.status(404).json({ error: 'session not found' });
    }
  });

  return app;
}

function main() {
  const app = createApp({
    stripe: new Stripe(requireEnv('STRIPE_SECRET_KEY')),
    store: createMemoryStore(), // TODO: swap for Table Storage before launch — see README
    mailer: createMemoryMailer(), // TODO: wire Azure Communication Services / SendGrid
    privateKeyHex: requireEnv('WSUI_LICENSE_PRIVATE_KEY'),
    webhookSecret: requireEnv('STRIPE_WEBHOOK_SECRET'),
  });
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`wsui-license listening on :${port}`));
}

if (require.main === module) main();

module.exports = { createApp };
