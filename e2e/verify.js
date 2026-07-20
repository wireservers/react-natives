// Drives the exported demo in a real headless Chromium: clicks the toggles and asserts what
// actually renders. This is the runtime verification that unit tests cannot provide.
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Built by `npm run build:demo`; see README.
const DIST = path.resolve(__dirname, '../demos/react-natives/wsui/dist');
const SHOTS = path.join(__dirname, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.ico': 'image/x-icon' };

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
      const full = path.join(DIST, file);
      if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
      res.end(fs.readFileSync(full));
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

// Find a clickable element whose rendered text contains `text`.
async function clickByText(page, text) {
  const handle = await page.evaluateHandle((t) => {
    const nodes = Array.from(document.querySelectorAll('div,button,span'));
    const hit = nodes.reverse().find((n) => n.textContent && n.textContent.trim().startsWith(t) && n.getBoundingClientRect().width > 0);
    return hit || null;
  }, text);
  const el = handle.asElement();
  if (!el) return false;
  await el.click();
  return true;
}

const bodyText = (page) => page.evaluate(() => document.body.innerText);

(async () => {
  const server = await serve();
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;
  console.log(`serving ${DIST}\ndriving ${url}\n`);

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => pageErrors.push(String(e)));

  // Capture the CSV/XLSX that the export buttons hand back.
  await page.evaluateOnNewDocument(() => {
    window.__downloads = [];
    const origCreate = URL.createObjectURL;
    URL.createObjectURL = function (blob) {
      window.__downloads.push({ size: blob.size, type: blob.type });
      return origCreate ? origCreate.call(URL, blob) : 'blob:stub';
    };
  });

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  console.log('page load');
  check('no uncaught page errors', pageErrors.length === 0, pageErrors.slice(0, 3).join('\n'));
  const text = await bodyText(page);
  check('demo rendered', text.includes('DataGrid v2.1.0 verification'), text.slice(0, 200));
  await page.screenshot({ path: path.join(SHOTS, '01-initial.png') });

  console.log('\ngrid rendering');
  check('column headers rendered', text.includes('Name') && text.includes('Qty'), text.slice(0, 300));
  check('data rows rendered', /pear|Apple|banana/.test(text));
  check('row counter shows the first page', /rows 25\/120/.test(text), text.slice(0, 200));

  console.log('\nlicense watermark (unlicensed by default)');
  check('watermark visible while unlicensed', /unlicensed/i.test(text), text.slice(0, 300));
  check('license toggle reads "none"', /license:\s*none/i.test(text));

  console.log('\nactivating a real signed license key');
  await clickByText(page, 'license:');
  await new Promise((r) => setTimeout(r, 800));
  const afterLicense = await bodyText(page);
  check('license toggle now reads "valid"', /license:\s*valid/i.test(afterLicense), afterLicense.slice(0, 200));
  check('watermark GONE after activating', !/unlicensed/i.test(afterLicense), 'watermark still present with a valid key');
  await page.screenshot({ path: path.join(SHOTS, '02-licensed.png') });

  console.log('\nCSV export');
  const clickedCsv = await clickByText(page, 'Export CSV');
  check('Export CSV button found and clicked', clickedCsv);
  await new Promise((r) => setTimeout(r, 800));
  const afterCsv = await bodyText(page);
  check('export produced content', /last export:/i.test(afterCsv), afterCsv.slice(0, 300));
  check('exported CSV has the header row', /last export:.*Name/i.test(afterCsv.replace(/\n/g, ' ')), afterCsv.slice(0, 300));

  console.log('\nXLSX export');
  const clickedXlsx = await clickByText(page, 'Export Excel');
  check('Export Excel button found and clicked', clickedXlsx);
  await new Promise((r) => setTimeout(r, 800));
  const downloads = await page.evaluate(() => window.__downloads || []);
  const xlsx = downloads.find((d) => d.type.includes('spreadsheetml'));
  check('xlsx blob generated', Boolean(xlsx), JSON.stringify(downloads));
  check('xlsx blob is non-trivial in size', Boolean(xlsx) && xlsx.size > 500, xlsx ? `${xlsx.size} bytes` : 'none');

  console.log('\npinned columns');
  const pinnedText = await bodyText(page);
  check('pinned toggle reads "ID + OK"', /pinned:\s*ID \+ OK/i.test(pinnedText));
  // With pinning on there are separate scroll panes; without it there is one.
  const panesPinned = await page.evaluate(() => document.querySelectorAll('div').length);
  await clickByText(page, 'pinned:');
  await new Promise((r) => setTimeout(r, 900));
  const afterUnpin = await bodyText(page);
  check('pinned toggle switches to "none"', /pinned:\s*none/i.test(afterUnpin), afterUnpin.slice(0, 200));
  check('grid still renders unpinned', /pear|Apple|banana/.test(afterUnpin));
  const panesUnpinned = await page.evaluate(() => document.querySelectorAll('div').length);
  check('layout actually changed between modes', panesPinned !== panesUnpinned, `pinned=${panesPinned} unpinned=${panesUnpinned}`);
  await page.screenshot({ path: path.join(SHOTS, '03-unpinned.png') });

  // Back to pinned for the scroll test.
  await clickByText(page, 'pinned:');
  await new Promise((r) => setTimeout(r, 900));

  console.log('\nsticky header toggle');
  await clickByText(page, 'stickyHeader:');
  await new Promise((r) => setTimeout(r, 700));
  const afterSticky = await bodyText(page);
  check('stickyHeader toggles to false', /stickyHeader:\s*false/i.test(afterSticky), afterSticky.slice(0, 200));
  check('grid survives the layout switch', /pear|Apple|banana/.test(afterSticky));
  await clickByText(page, 'stickyHeader:');
  await new Promise((r) => setTimeout(r, 700));

  console.log('\nDateRangePicker');
  const rangeText = await bodyText(page);
  check('range picker rendered', /DateRangePicker/.test(rangeText));
  check('presets rendered', /Last 7 days/.test(rangeText) && /This month/.test(rangeText), rangeText.slice(-400));
  check('empty state shown', /no start/.test(rangeText));
  await page.screenshot({ path: path.join(SHOTS, '04-range-picker.png'), fullPage: true });

  console.log('\nruntime health');
  const realErrors = consoleErrors.filter((e) => !/favicon|Download the React DevTools|deprecated/i.test(e));
  check('no console errors', realErrors.length === 0, realErrors.slice(0, 4).join('\n'));

  await browser.close();
  server.close();

  console.log(`\nscreenshots: ${SHOTS}`);
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})().catch((error) => {
  console.error('harness error:', error);
  process.exit(1);
});
