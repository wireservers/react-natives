'use strict';

/**
 * Plan catalogue.
 *
 * Stripe holds the authoritative prices (as Price objects); this maps a public plan id to the
 * Price id plus the entitlement metadata that must ride along on the Checkout session. That
 * metadata is what the webhook reads back when minting the key, so a pricing change is a
 * dashboard + env change rather than a code change.
 */

/** @returns {Record<string, {id:string, name:string, priceEnv:string, edition:string, seats:number, perpetual:boolean}>} */
const PLANS = {
  pro: {
    id: 'pro',
    name: 'Pro — single developer',
    priceEnv: 'STRIPE_PRICE_PRO',
    edition: 'pro',
    seats: 1,
    perpetual: true,
  },
  team: {
    id: 'team',
    name: 'Team — 5 developers',
    priceEnv: 'STRIPE_PRICE_TEAM',
    edition: 'team',
    seats: 5,
    perpetual: true,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise — 25 developers',
    priceEnv: 'STRIPE_PRICE_ENTERPRISE',
    edition: 'enterprise',
    seats: 25,
    perpetual: true,
  },
};

/**
 * Look up a plan by its public id.
 *
 * The id comes straight from the request body, so this must be an own-property check: a plain
 * `PLANS[planId]` would happily return `Object.prototype` for `'__proto__'` or the `Object`
 * constructor for `'constructor'`, both of which are truthy and would slip past a `!plan` guard.
 */
function getPlan(planId) {
  if (typeof planId !== 'string') return null;
  if (!Object.prototype.hasOwnProperty.call(PLANS, planId)) return null;
  return PLANS[planId];
}

/**
 * Resolve a plan's Stripe Price id from the environment.
 * Kept separate from `getPlan` so the catalogue stays testable without env setup.
 */
function resolvePriceId(plan, env = process.env) {
  const priceId = env[plan.priceEnv];
  if (!priceId) throw new Error(`${plan.priceEnv} is not set`);
  return priceId;
}

/**
 * Metadata attached to the Checkout session and read back by the webhook.
 * Stripe metadata values must be strings.
 */
function buildCheckoutMetadata(plan, { expiresAt } = {}) {
  const metadata = {
    edition: plan.edition,
    seats: String(plan.seats),
    plan: plan.id,
  };
  if (!plan.perpetual && expiresAt) metadata.expires_at = String(expiresAt);
  return metadata;
}

module.exports = { PLANS, getPlan, resolvePriceId, buildCheckoutMetadata };
