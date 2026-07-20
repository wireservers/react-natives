// Drives real mouse drags against the Scheduler in headless Chromium.
// Drag behaviour is the one thing unit tests genuinely cannot confirm — PanResponder wiring,
// gesture thresholds, and whether a drag actually commits are only observable at runtime.
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
      if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
      res.end(fs.readFileSync(full));
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const bodyText = (page) => page.evaluate(() => document.body.innerText);

// Read the "Scheduler — N events · last: X" status line the demo renders.
async function schedulerStatus(page) {
  const text = await bodyText(page);
  const m = text.match(/Scheduler — (\d+) events · last: ([^\n]*)/);
  return m ? { count: Number(m[1]), last: m[2].trim() } : null;
}

/** A slow, human-like drag — a single instant jump often fails gesture thresholds. */
async function drag(page, from, to, steps = 12) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i += 1) {
    await page.mouse.move(
      from.x + ((to.x - from.x) * i) / steps,
      from.y + ((to.y - from.y) * i) / steps,
    );
    await new Promise((r) => setTimeout(r, 16));
  }
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 500));
}

(async () => {
  const server = await serve();
  const url = `http://127.0.0.1:${server.address().port}/`;
  console.log(`driving ${url}\n`);

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1400 });
  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(String(e)));

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  console.log('scheduler renders');
  const text = await bodyText(page);
  check('scheduler section present', /Scheduler —/.test(text), text.slice(-300));
  check('hour gutter rendered', /8am/.test(text) && /12pm/.test(text), text.slice(-400));
  check('day headings rendered', /(Sun|Mon|Tue|Wed|Thu|Fri|Sat)/.test(text));
  const initial = await schedulerStatus(page);
  check('seeded with 3 events', initial && initial.count === 3, JSON.stringify(initial));

  // Scroll the scheduler into view so mouse coordinates land on it.
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(
      (n) => n.textContent && n.textContent.startsWith('Scheduler —') && n.getBoundingClientRect().height > 250 && n.getBoundingClientRect().height < 700,
    );
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SHOTS, '05-scheduler.png') });

  // Locate the scheduler grid in viewport coordinates.
  const box = await page.evaluate(() => {
    // The scheduler section: text starts with the heading and it is the ~420px tall block.
    // (Using parentElement here would resolve to the page root.)
    const section = Array.from(document.querySelectorAll('div')).find(
      (n) => n.textContent && n.textContent.startsWith('Scheduler —') && n.getBoundingClientRect().height > 250 && n.getBoundingClientRect().height < 700,
    );
    if (!section) return null;
    const r = section.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  check('scheduler grid located on screen', Boolean(box) && box.width > 200, JSON.stringify(box));

  if (box) {
    // Empty space in a later day column (right side), below the day headings.
    const colX = box.x + box.width * 0.72;
    const topY = box.y + 90;

    console.log('\ndrag-to-create');
    const before = await schedulerStatus(page);
    await drag(page, { x: colX, y: topY }, { x: colX, y: topY + 96 });
    const afterCreate = await schedulerStatus(page);
    check('a drag on empty space created an event',
      afterCreate && before && afterCreate.count === before.count + 1,
      `before=${JSON.stringify(before)} after=${JSON.stringify(afterCreate)}`);
    check('  ...and reported the creation', afterCreate && /created/.test(afterCreate.last), JSON.stringify(afterCreate));
    await page.screenshot({ path: path.join(SHOTS, '06-after-create.png') });

    console.log('\ndrag-to-move');
    // Grab the event block we just made and drag it down an hour.
    const evBox = await page.evaluate(() => {
      // Pick the SMALLEST element containing "New": a plain find() matches the day column,
      // whose only text child is this event, and dragging its centre lands on empty space.
      const nodes = Array.from(document.querySelectorAll('div'))
        .filter((n) => n.textContent && n.textContent.trim().startsWith('New'))
        .map((n) => ({ n, r: n.getBoundingClientRect() }))
        .filter((o) => o.r.height > 8 && o.r.height < 200 && o.r.width < 250)
        .sort((a, b) => a.r.height * a.r.width - b.r.height * b.r.width);
      if (nodes.length === 0) return null;
      const r = nodes[0].r;
      return { x: r.x + r.width / 2, y: r.y + r.height / 2, h: r.height, w: r.width };
    });
    check('created event is on screen', Boolean(evBox), JSON.stringify(evBox));
    if (evBox) {
      const beforeMove = await schedulerStatus(page);
      await drag(page, { x: evBox.x, y: evBox.y }, { x: evBox.x, y: evBox.y + 48 });
      const afterMove = await schedulerStatus(page);
      check('dragging an event body reported a change',
        afterMove && /changed/.test(afterMove.last),
        `before=${JSON.stringify(beforeMove)} after=${JSON.stringify(afterMove)}`);
      check('  ...without creating a duplicate',
        afterMove && beforeMove && afterMove.count === beforeMove.count,
        `${beforeMove && beforeMove.count} -> ${afterMove && afterMove.count}`);
      await page.screenshot({ path: path.join(SHOTS, '07-after-move.png') });
    }

    console.log('\ndrag-to-resize');
    const resizeBox = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('div'))
        .filter((n) => n.textContent && n.textContent.trim().startsWith('New'))
        .map((n) => ({ n, r: n.getBoundingClientRect() }))
        .filter((o) => o.r.height > 8 && o.r.height < 200 && o.r.width < 250)
        .sort((a, b) => a.r.height * a.r.width - b.r.height * b.r.width);
      if (nodes.length === 0) return null;
      const r = nodes[0].r;
      // Bottom edge handle sits in the last few px of the event block.
      return { x: r.x + r.width / 2, y: r.y + r.height - 3 };
    });
    if (resizeBox) {
      const beforeResize = await schedulerStatus(page);
      await drag(page, resizeBox, { x: resizeBox.x, y: resizeBox.y + 48 });
      const afterResize = await schedulerStatus(page);
      check('dragging the bottom edge reported a change',
        afterResize && /changed/.test(afterResize.last), JSON.stringify(afterResize));
      check('  ...still no duplicate events',
        afterResize && beforeResize && afterResize.count === beforeResize.count);
      await page.screenshot({ path: path.join(SHOTS, '08-after-resize.png') });
    }
  }

  console.log('\nruntime health');
  check('no uncaught page errors during dragging', pageErrors.length === 0, pageErrors.slice(0, 3).join('\n'));

  await browser.close();
  server.close();
  console.log(`\nscreenshots: ${SHOTS}`);
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => { console.error('harness error:', e); process.exit(1); });
