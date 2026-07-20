// Renders the docs site's /pro and /thanks pages in headless Chromium.
//
// These two pages are the entire commercial surface: if /pro misprices or /thanks implies a
// failed purchase, that is money and trust lost. Both are checked here, including the failure
// path on /thanks (no license service running is exactly what a buyer sees if it is down).
const http = require('http');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const DIST = path.resolve(__dirname, '../site/dist');
const SHOTS = path.join(__dirname, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.ico': 'image/x-icon', '.png': 'image/png', '.svg': 'image/svg+xml' };

// Must match site/app/pro.tsx. Kept here deliberately so a silent price edit fails the suite.
const EXPECTED = [
  { tier: 'Pro', price: '$49', seats: 1 },
  { tier: 'Team', price: '$199', seats: 5 },
  { tier: 'Enterprise', price: '$799', seats: 25 },
];

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? `\n         ${detail}` : ''}`); }
}

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let f = decodeURIComponent(req.url.split('?')[0]);
      if (f === '/') f = '/index.html';
      let full = path.join(DIST, f);
      if (!fs.existsSync(full) && fs.existsSync(`${full}.html`)) full = `${full}.html`;
      if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
      res.end(fs.readFileSync(full));
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

(async () => {
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  console.log(`serving ${DIST}\n`);

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200 });
  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(String(e)));

  // ---------------------------------------------------------------- discoverability
  // A pricing page nobody can reach earns nothing. Assert a real user can navigate to it.
  console.log('discoverability from the home page');
  await page.goto(`${base}/`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  const navHasPro = await page.evaluate(() =>
    Array.from(document.querySelectorAll('div,span,a'))
      .some((n) => n.children.length === 0 && n.textContent && n.textContent.trim() === 'Pro'));
  check('top nav exposes a Pro link', navHasPro);

  const heroCta = await page.evaluate(() => {
    const el = document.querySelector('[aria-label="See react-natives Pro pricing"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, visible: r.width > 0 && r.height > 0 };
  });
  check('home page has a Pro call-to-action', Boolean(heroCta && heroCta.visible), JSON.stringify(heroCta));

  if (heroCta && heroCta.visible) {
    await page.mouse.click(heroCta.x, heroCta.y);
    await new Promise((r) => setTimeout(r, 2000));
    const url = page.url();
    const landed = await page.evaluate(() => document.body.innerText);
    check('clicking it navigates to the pricing page', /\/pro/.test(url), url);
    check('  ...and the tiers render', /\$49/.test(landed) && /\$199/.test(landed), landed.slice(0, 200));
  }

  // ---------------------------------------------------------------- /pro
  await page.goto(`${base}/pro`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  const proText = await page.evaluate(() => document.body.innerText);

  console.log('/pro — pricing');
  for (const { tier, price, seats } of EXPECTED) {
    check(`${tier} tier shown`, proText.includes(tier), proText.slice(0, 200));
    check(`  ...at ${price}`, proText.includes(price), proText.slice(0, 400));
    check(`  ...with ${seats} seat${seats === 1 ? '' : 's'}`,
      new RegExp(`${seats}\\s+seats?`).test(proText));
  }
  // Guard against a stale price surviving an edit.
  for (const stale of ['$149', '$499', '$999', '$599', '$1,499']) {
    check(`no stale price ${stale}`, !proText.includes(stale), proText.slice(0, 300));
  }

  console.log('\n/pro — what is being sold');
  check('DataGridPro listed', /DataGridPro/.test(proText));
  check('Scheduler listed', /Scheduler/.test(proText), proText.slice(0, 600));
  check('DateRangePicker listed', /DateRangePicker/.test(proText));
  check('Excel export mentioned', /Excel export/.test(proText));
  check('perpetual licence stated', /[Pp]erpetual/.test(proText));
  check('free core stated', /free and MIT/.test(proText));
  check('try-before-you-buy explained', /watermark/.test(proText));

  console.log('\n/pro — buy buttons');
  const buttons = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[aria-label^="Buy the"]')).map((n) => n.getAttribute('aria-label')));
  check('three buy buttons', buttons.length === 3, JSON.stringify(buttons));
  for (const { tier } of EXPECTED) {
    check(`  ...${tier} is clickable`, buttons.some((b) => b.includes(tier)), JSON.stringify(buttons));
  }
  await page.screenshot({ path: path.join(SHOTS, '09-pricing.png'), fullPage: true });

  // ---------------------------------------------------------------- /thanks
  // No license service is running, so this exercises the failure path a buyer would hit if it
  // were down. It must never imply the payment failed.
  console.log('\n/thanks — post-purchase');
  await page.goto(`${base}/thanks?session_id=cs_test_smoke`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));
  const thanksText = await page.evaluate(() => document.body.innerText);

  check('confirms the purchase succeeded', /Thanks/.test(thanksText), thanksText.slice(0, 200));
  check('shows install command', /npm i @wireservers-ui\/react-natives/.test(thanksText));
  check('shows setLicenseKey step', /setLicenseKey/.test(thanksText));
  check('shows the Tailwind glob warning', /react-natives-pro\/src/.test(thanksText), thanksText.slice(0, 800));
  check('gives a support address', /todd@wireservers\.com/.test(thanksText));
  // The critical one: payment already went through by this point.
  check('failure path does NOT imply the payment failed',
    !/payment failed|purchase failed|declined|could not be processed/i.test(thanksText),
    thanksText.slice(0, 400));
  check('failure path reassures the key is coming',
    /on its way by email|resend/i.test(thanksText), thanksText.slice(0, 500));
  await page.screenshot({ path: path.join(SHOTS, '10-thanks.png'), fullPage: true });

  console.log('\nruntime health');
  check('no uncaught page errors', pageErrors.length === 0, pageErrors.slice(0, 3).join('\n'));

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => { console.error('harness error:', e); process.exit(1); });
