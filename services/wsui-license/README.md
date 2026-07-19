# wsui-license

License issuing service for `@wireservers-ui/react-natives-pro`. Verifies Stripe checkout
webhooks, mints Ed25519-signed license keys, and sends the order/onboarding email.

## Why keys are signed, not stored

A key is a self-contained signed token. The client verifies it **offline** against an embedded
public key — no callback to this service, ever. A customer's production app therefore has zero
runtime dependency on our infrastructure: if this service is down, existing licenses keep
working. The only persistence needed is webhook idempotency (below), not key lookup.

## Routes

| Route | Purpose |
|---|---|
| `POST /webhook` | Stripe `checkout.session.completed` → mint key → send order email |
| `GET /license?session_id=…` | Mint/return the key inline for the `/thanks` page |
| `GET /health` | Liveness probe |

Both delivery paths exist deliberately: email is the durable copy, the `/thanks` page covers the
case where mail is slow or lands in spam.

## Environment

| Variable | Notes |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from the webhook endpoint |
| `WSUI_LICENSE_PRIVATE_KEY` | Ed25519 signing key, hex. **Key Vault only** — never commit it |
| `PORT` | Defaults to 8080 |

In production these come from `wireservers-dev-kv`. The signing key's public half is embedded in
`@wireservers-ui/react-natives-pro/src/licensing/license.ts`; **rotating the private key
invalidates every key already sold**, so treat it as permanent.

## Webhook security

`stripe.webhooks.constructEvent` verifies an HMAC over the **raw** request body, which is why the
route uses `express.raw()` and must stay ahead of any JSON body parser. Reparsing the body
changes its bytes and verification will always fail.

Covered by `test/http.js`: missing signature, garbage signature, signature from the wrong secret,
a valid signature over a *different* body, and a stale timestamp (replay) are all rejected with
400 and mint nothing.

## Idempotency

Stripe retries webhooks on any non-2xx, and can deliver duplicates even after a 200. Fulfilment
is keyed on the Stripe **event id**, and the record is written *before* the email is sent: a
crash mid-send costs the customer an email (recoverable via a resend) rather than issuing a
second key with different bytes (not recoverable).

## Before launch

Two stubs in `src/server.js` are wired to in-memory implementations and must be replaced:

- **`createMemoryStore()`** → Azure Table Storage or a single SQL table. In-memory idempotency
  is lost on restart, which would let a retry after a redeploy send a duplicate email.
- **`createMemoryMailer()`** → Azure Communication Services or SendGrid. Also set up SPF/DKIM on
  the sending domain, or order emails will land in spam.

## Deploy

Kudu zip deploy, matching the other services in this org (not a GitHub Actions deploy workflow).

## Tests

```bash
npm test    # 77 assertions: key round-trip, email content, fulfilment, HTTP/webhook security
```

The key test is the round-trip in `test/run.js`: a key minted here is verified with the **client**
verifier compiled from the `-pro` package. They are separate implementations of the same format,
so drift between them would silently break every license sold.
