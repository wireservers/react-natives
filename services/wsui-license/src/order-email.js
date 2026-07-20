'use strict';

/**
 * Order / onboarding email.
 *
 * This email doubles as the setup documentation, so its steps must stay in sync with the
 * `-pro` package README. The Tailwind content-glob step gets its own prominent section: it is
 * the one setup mistake that fails *silently* (components render unstyled with no error), and
 * is the most likely "I paid and it's broken" support ticket.
 */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatAmount(amountMinor, currency) {
  if (amountMinor == null) return '—';
  const major = (amountMinor / 100).toFixed(2);
  return `${major} ${String(currency || '').toUpperCase()}`.trim();
}

function formatDate(epochSeconds) {
  if (!epochSeconds) return '—';
  return new Date(epochSeconds * 1000).toISOString().slice(0, 10);
}

/**
 * @param {object} order
 * @param {string} order.email
 * @param {string} order.licenseKey
 * @param {string} [order.edition]
 * @param {number} [order.seats]
 * @param {number} [order.amountMinor]  amount in the currency's minor unit (Stripe convention)
 * @param {string} [order.currency]
 * @param {number} [order.createdAt]    epoch seconds
 * @param {string} [order.orderId]
 * @param {string} [order.receiptUrl]
 * @param {number} [order.expiresAt]    epoch seconds; omit for perpetual
 * @param {string} [order.docsUrl]
 * @param {string} [order.supportEmail]
 */
function buildOrderEmail(order) {
  const {
    email,
    licenseKey,
    edition = 'pro',
    seats,
    amountMinor,
    currency,
    createdAt,
    orderId = '—',
    receiptUrl,
    expiresAt,
    docsUrl = 'https://www.reactnatives.dev/pro-docs',
    supportEmail = 'todd@wireservers.com',
  } = order;

  if (!email) throw new Error('order.email is required');
  if (!licenseKey) throw new Error('order.licenseKey is required');

  const term = expiresAt ? `expires ${formatDate(expiresAt)}` : 'perpetual';
  const seatLabel = seats != null ? `${seats} seat${seats === 1 ? '' : 's'}` : '1 seat';
  const subject = `Your react-natives Pro license — order ${orderId}`;

  const installCmd =
    'npm i @wireservers-ui/react-natives @wireservers-ui/react-natives-pro';
  const activateSnippet = [
    "import { setLicenseKey } from '@wireservers-ui/react-natives-pro';",
    '',
    `setLicenseKey('${licenseKey}');`,
  ].join('\n');
  const tailwindSnippet = [
    '// tailwind.config.js',
    'content: [',
    "  './node_modules/@wireservers-ui/react-natives/src/**/*.{js,jsx,ts,tsx}',",
    "  './node_modules/@wireservers-ui/react-natives-pro/src/**/*.{js,jsx,ts,tsx}', // <- add this",
    '],',
  ].join('\n');

  const text = `Thanks for buying react-natives Pro.

ORDER
  Order:     ${orderId}
  Product:   react-natives Pro (${edition})
  Seats:     ${seatLabel}
  Term:      ${term}
  Amount:    ${formatAmount(amountMinor, currency)}
  Date:      ${formatDate(createdAt)}
  Email:     ${email}
${receiptUrl ? `  Receipt:   ${receiptUrl}\n` : ''}
LICENSE KEY (keep this safe)

${licenseKey}

1. INSTALL

   ${installCmd}

   If this is a fresh Expo app, scaffold the config first:
   npx react-natives init

2. ACTIVATE

   Call setLicenseKey once at app startup, before rendering any Pro component:

${activateSnippet.split('\n').map((l) => `   ${l}`).join('\n')}

   An invalid or missing key never breaks your app — Pro components stay fully
   functional and simply render an "unlicensed" watermark.

3. TAILWIND (easy to miss)

   Add the Pro package to your Tailwind content globs, or its components will
   render UNSTYLED with no error:

${tailwindSnippet.split('\n').map((l) => `   ${l}`).join('\n')}

WHAT YOU UNLOCKED
  - DataGridPro      CSV + Excel export, column pinning, server-side data
  - Charts           line, area, bar, stacked, donut, sparkline, stat tiles
  - Scheduler        week/day grid with drag to create, move and resize
  - DateRangePicker  dual-month range selection with presets
  - RichTextEditor   markdown toolbar with live preview
  - FormBuilder      schema-driven forms, conditional fields, wizards
  - Combobox         async autocomplete, multi-select, create-on-the-fly
  - CommandPalette   Cmd-K fuzzy command search
  - FileUpload       drag-and-drop dropzone with per-file progress
  - Kanban           drag-and-drop board with WIP limits
  - ProductTour      spotlight onboarding coachmarks
  Docs: ${docsUrl}

SUPPORT
  Questions, or need this key re-sent? ${supportEmail}
  Your license covers ${seatLabel} and is ${term}.
`;

  const html = `<!-- react-natives Pro order -->
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;line-height:1.5">
  <h1 style="font-size:20px;margin:0 0 4px">Thanks for buying react-natives Pro</h1>
  <p style="margin:0 0 20px;color:#64748b;font-size:14px">Everything you need to get set up is below.</p>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:24px 0 8px">Order</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr><td style="padding:4px 0;color:#64748b">Order</td><td style="padding:4px 0;text-align:right">${escapeHtml(orderId)}</td></tr>
    <tr><td style="padding:4px 0;color:#64748b">Product</td><td style="padding:4px 0;text-align:right">react-natives Pro (${escapeHtml(edition)})</td></tr>
    <tr><td style="padding:4px 0;color:#64748b">Seats</td><td style="padding:4px 0;text-align:right">${escapeHtml(seatLabel)}</td></tr>
    <tr><td style="padding:4px 0;color:#64748b">Term</td><td style="padding:4px 0;text-align:right">${escapeHtml(term)}</td></tr>
    <tr><td style="padding:4px 0;color:#64748b">Amount</td><td style="padding:4px 0;text-align:right">${escapeHtml(formatAmount(amountMinor, currency))}</td></tr>
    <tr><td style="padding:4px 0;color:#64748b">Date</td><td style="padding:4px 0;text-align:right">${escapeHtml(formatDate(createdAt))}</td></tr>
    <tr><td style="padding:4px 0;color:#64748b">Email</td><td style="padding:4px 0;text-align:right">${escapeHtml(email)}</td></tr>
    ${receiptUrl ? `<tr><td style="padding:4px 0;color:#64748b">Receipt</td><td style="padding:4px 0;text-align:right"><a href="${escapeHtml(receiptUrl)}">View receipt</a></td></tr>` : ''}
  </table>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:28px 0 8px">Your license key</h2>
  <pre style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;padding:12px;font-size:12px;white-space:pre-wrap;word-break:break-all;margin:0">${escapeHtml(licenseKey)}</pre>
  <p style="font-size:12px;color:#64748b;margin:8px 0 0">Keep this safe — it covers ${escapeHtml(seatLabel)} and is ${escapeHtml(term)}.</p>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:28px 0 8px">1. Install</h2>
  <pre style="background:#0f172a;color:#e2e8f0;border-radius:6px;padding:12px;font-size:12px;overflow-x:auto;margin:0">${escapeHtml(installCmd)}</pre>
  <p style="font-size:13px;color:#475569">Fresh Expo app? Scaffold the config first with <code>npx react-natives init</code>.</p>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:28px 0 8px">2. Activate</h2>
  <p style="font-size:13px;margin:0 0 8px">Call this once at startup, before rendering any Pro component:</p>
  <pre style="background:#0f172a;color:#e2e8f0;border-radius:6px;padding:12px;font-size:12px;overflow-x:auto;margin:0">${escapeHtml(activateSnippet)}</pre>
  <p style="font-size:13px;color:#475569">A missing or invalid key never breaks your app — Pro components keep working and just show an "unlicensed" watermark.</p>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:28px 0 8px">3. Tailwind — easy to miss</h2>
  <div style="border-left:3px solid #f59e0b;background:#fffbeb;padding:10px 12px;border-radius:0 6px 6px 0">
    <p style="font-size:13px;margin:0 0 8px"><strong>Add the Pro package to your Tailwind content globs</strong>, or its components render <strong>unstyled with no error</strong>:</p>
    <pre style="background:#0f172a;color:#e2e8f0;border-radius:6px;padding:12px;font-size:12px;overflow-x:auto;margin:0">${escapeHtml(tailwindSnippet)}</pre>
  </div>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:28px 0 8px">What you unlocked</h2>
  <ul style="font-size:13px;padding-left:18px;margin:0">
    <li><strong>DataGridPro</strong> — CSV + Excel export, column pinning, server-side data</li>
    <li><strong>Charts</strong> — line, area, bar, stacked, donut, sparkline, stat tiles</li>
    <li><strong>Scheduler</strong> — week/day grid with drag to create, move and resize</li>
    <li><strong>DateRangePicker</strong> — dual-month range selection with presets</li>
    <li><strong>RichTextEditor</strong> — markdown toolbar with live preview</li>
    <li><strong>FormBuilder</strong> — schema-driven forms, conditional fields, wizards</li>
    <li><strong>Combobox</strong> — async autocomplete, multi-select, create-on-the-fly</li>
    <li><strong>CommandPalette</strong> — ⌘K fuzzy command search</li>
    <li><strong>FileUpload</strong> — drag-and-drop dropzone with per-file progress</li>
    <li><strong>Kanban</strong> — drag-and-drop board with WIP limits</li>
    <li><strong>ProductTour</strong> — spotlight onboarding coachmarks</li>
  </ul>
  <p style="font-size:13px;margin:12px 0 0"><a href="${escapeHtml(docsUrl)}">Read the docs →</a></p>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:28px 0 8px">Support</h2>
  <p style="font-size:13px;margin:0">Questions, or need this key re-sent? <a href="mailto:${escapeHtml(supportEmail)}">${escapeHtml(supportEmail)}</a></p>
</div>`;

  return { subject, text, html };
}

module.exports = { buildOrderEmail, escapeHtml, formatAmount, formatDate };
