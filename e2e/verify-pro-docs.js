// Verifies the Pro documentation page: it is what the order email sends a buyer to
// immediately after paying, so a blank or stale page here is a direct support ticket.
//
//   cd ../site && npm run build
//   node verify-pro-docs.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const DIST = path.resolve(__dirname, '../site/dist');
const SHOTS = path.join(__dirname, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.ico': 'image/x-icon', '.png': 'image/png', '.ttf': 'font/ttf' };

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? `\n         ${detail}` : ''}`); }
}

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let file = decodeURIComponent(req.url.split('?')[0]);
      if (file === '/') file = '/index.html';
      let full = path.join(DIST, file);
      // The static export writes /pro-docs as pro-docs.html.
      if (!fs.existsSync(full) && fs.existsSync(`${full}.html`)) full = `${full}.html`;
      if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
      res.end(fs.readFileSync(full));
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const bodyText = (page) => page.evaluate(() => document.body.innerText);

(async () => {
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  console.log(`\nPro docs — ${base}/pro-docs\n`);
  await page.goto(`${base}/pro-docs`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));

  const text = await bodyText(page);
  check('page renders content', text.length > 500, `${text.length} chars`);

  // Every one of the ten must be documented — the email promises all ten.
  for (const name of [
    'DataGridPro', 'LineChart', 'Scheduler', 'DateRangePicker', 'RichTextEditor',
    'FormBuilder', 'Combobox', 'CommandPalette', 'FileUpload', 'Kanban', 'ProductTour',
  ]) {
    check(`documents ${name}`, text.includes(name));
  }

  // The setup steps a buyer follows.
  check('shows the install command', /npm i @wireservers-ui\/react-natives/.test(text));
  check('shows setLicenseKey', /setLicenseKey/.test(text));
  check('calls out the Tailwind content glob', /tailwind\.config\.js|content globs?/i.test(text));
  check('warns that a missing glob renders unstyled', /unstyled/i.test(text));

  // The domain fix: no link may point at the wrong site.
  const badLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a'))
      .map((a) => a.getAttribute('href') || '')
      .filter((h) => /reactnatives\.com/.test(h)));
  check('no links to the wrong domain', badLinks.length === 0, badLinks.join(', '));

  check('has a route back to pricing', Boolean(await page.$('[aria-label="Back to pricing"]')));

  // The page must not be a wall of raw markdown.
  check('markdown is rendered, not dumped as source',
    !/^#\s|\*\*[A-Za-z]/m.test(text.slice(0, 4000)) || !text.includes('| --- |'),
    'raw markdown table or heading syntax visible');

  const title = await page.title();
  check('has a descriptive title', /Pro/.test(title), title);

  await page.screenshot({ path: path.join(SHOTS, 'pro-docs.png'), fullPage: false });

  check('no page errors', errors.length === 0, errors.slice(0, 3).join('\n         '));

  await browser.close();
  server.close();
  console.log(`\npro docs: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
