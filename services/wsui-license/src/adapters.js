'use strict';

/**
 * Production adapters for the two pluggable seams (idempotency store, mailer).
 *
 * Both fall back to in-memory implementations when unconfigured, which is right for local dev
 * and tests but catastrophic in production: in-memory idempotency is lost on restart, so a
 * Stripe retry after a redeploy would mint and email a *second* key. `assertProductionReady`
 * therefore refuses to boot with memory adapters when NODE_ENV=production.
 */
const { createMemoryStore, createMemoryMailer } = require('./fulfillment');

/**
 * Azure Table Storage idempotency store.
 * Partition by a constant and use the Stripe event id as the row key, so a lookup is a point
 * read rather than a scan.
 */
function createTableStore({ connectionString, tableName = 'wsuiLicenseEvents' }) {
  // Required lazily so the Azure SDK is only needed when actually configured.
  const { TableClient } = require('@azure/data-tables');
  const client = TableClient.fromConnectionString(connectionString, tableName);
  const PARTITION = 'fulfilment';
  let ensured = false;

  async function ensureTable() {
    if (ensured) return;
    await client.createTable().catch((error) => {
      // 409 = already exists, which is the normal steady state.
      if (error.statusCode !== 409) throw error;
    });
    ensured = true;
  }

  return {
    async get(eventId) {
      await ensureTable();
      try {
        const entity = await client.getEntity(PARTITION, eventId);
        return { licenseKey: entity.licenseKey, email: entity.email, issuedAt: entity.issuedAt };
      } catch (error) {
        if (error.statusCode === 404) return null;
        throw error;
      }
    },
    async put(eventId, value) {
      await ensureTable();
      // createEntity (not upsert) so a concurrent duplicate delivery loses the race loudly
      // rather than silently overwriting an already-issued key.
      try {
        await client.createEntity({
          partitionKey: PARTITION,
          rowKey: eventId,
          licenseKey: value.licenseKey,
          email: value.email,
          issuedAt: value.issuedAt,
        });
      } catch (error) {
        if (error.statusCode === 409) return; // already fulfilled by a concurrent delivery
        throw error;
      }
    },
  };
}

/** Azure Communication Services email sender. */
function createAcsMailer({ connectionString, sender }) {
  const { EmailClient } = require('@azure/communication-email');
  const client = new EmailClient(connectionString);

  return {
    async send({ to, subject, text, html }) {
      const poller = await client.beginSend({
        senderAddress: sender,
        content: { subject, plainText: text, html },
        recipients: { to: [{ address: to }] },
      });
      return poller.pollUntilDone();
    },
  };
}

/** Chooses real adapters when configured, memory otherwise. */
function createAdapters(env = process.env) {
  const store = env.AZURE_TABLES_CONNECTION_STRING
    ? createTableStore({
        connectionString: env.AZURE_TABLES_CONNECTION_STRING,
        tableName: env.AZURE_TABLES_NAME,
      })
    : createMemoryStore();

  const mailer =
    env.ACS_CONNECTION_STRING && env.ACS_SENDER_ADDRESS
      ? createAcsMailer({
          connectionString: env.ACS_CONNECTION_STRING,
          sender: env.ACS_SENDER_ADDRESS,
        })
      : createMemoryMailer();

  return {
    store,
    mailer,
    storeKind: env.AZURE_TABLES_CONNECTION_STRING ? 'table-storage' : 'memory',
    mailerKind: env.ACS_CONNECTION_STRING && env.ACS_SENDER_ADDRESS ? 'acs' : 'memory',
  };
}

/**
 * Refuse to run in production on memory adapters.
 *
 * Booting with an in-memory store looks fine — until a redeploy drops the idempotency records
 * and the next Stripe retry issues a duplicate key. Failing loudly at startup is far cheaper
 * than discovering that from a customer.
 */
function assertProductionReady({ storeKind, mailerKind }, env = process.env) {
  if (env.NODE_ENV !== 'production') return;
  const problems = [];
  if (storeKind === 'memory') problems.push('AZURE_TABLES_CONNECTION_STRING is not set (idempotency would be lost on restart)');
  if (mailerKind === 'memory') problems.push('ACS_CONNECTION_STRING / ACS_SENDER_ADDRESS are not set (order emails would be dropped)');
  if (problems.length > 0) {
    throw new Error(`Refusing to start in production with in-memory adapters:\n  - ${problems.join('\n  - ')}`);
  }
}

module.exports = { createTableStore, createAcsMailer, createAdapters, assertProductionReady };
