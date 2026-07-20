// Renders the six newest Pro components in headless Chromium and drives them with real
// input. Every bug this session that unit tests missed — a dead layout gap, a watermark over
// a toolbar, a drag that silently died, misaligned cards — was only visible once rendered.
//
// Unlike the other suites this one runs against a live Expo dev server rather than a static
// export, so it reflects the working tree without a build step:
//
//   cd ../demos/react-natives/wsui && npx expo start --web --port 8099
//   node verify-panel-two.js
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const URL = process.env.DEMO_URL || 'http://localhost:8099';
const SHOTS = path.join(__dirname, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? `\n         ${detail}` : ''}`); }
}

const bodyText = (page) => page.evaluate(() => document.body.innerText);

/** Smallest element whose own text matches — avoids matching a container that merely contains it. */
async function findByText(page, text, tag = '*') {
  return page.evaluateHandle((t, sel) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    const hits = nodes.filter((n) => n.textContent && n.textContent.trim() === t);
    if (hits.length === 0) return null;
    // The last hit is the deepest, since querySelectorAll is document order.
    return hits[hits.length - 1];
  }, text, tag);
}

async function clickText(page, text) {
  const handle = await findByText(page, text);
  const element = handle.asElement();
  if (!element) throw new Error(`no element with exact text "${text}"`);
  await element.click();
  await new Promise((r) => setTimeout(r, 350));
}

async function clickLabel(page, label) {
  const el = await page.$(`[aria-label="${label}"]`);
  if (!el) throw new Error(`no element with aria-label "${label}"`);
  await el.click();
  await new Promise((r) => setTimeout(r, 350));
}

// The wizard and the tour both render a "Next", so a bare aria-label lookup hits whichever
// comes first in the document. Tour clicks are scoped to the tour card's own subtree.
async function clickInTour(page, label) {
  const clicked = await page.evaluate((l) => {
    const card = Array.from(document.querySelectorAll('[aria-label]'))
      .find((n) => /^.+\. Step \d+ of \d+$/.test(n.getAttribute('aria-label') || ''));
    if (!card) return 'no-card';
    const btn = card.querySelector(`[aria-label="${l}"]`);
    if (!btn) return 'no-button';
    btn.click();
    return 'ok';
  }, label);
  if (clicked !== 'ok') throw new Error(`tour click "${label}": ${clicked}`);
  await new Promise((r) => setTimeout(r, 400));
}

/** The tour's own "N of M" counter, read from the card's accessibility label. */
async function tourStep(page) {
  return page.evaluate(() => {
    const card = Array.from(document.querySelectorAll('[aria-label]'))
      .find((n) => /^.+\. Step \d+ of \d+$/.test(n.getAttribute('aria-label') || ''));
    if (!card) return null;
    const m = card.getAttribute('aria-label').match(/Step (\d+) of (\d+)$/);
    return m ? `${m[1]} of ${m[2]}` : null;
  });
}

/** Read the demo's "log: X" status line. */
async function readLog(page) {
  const text = await bodyText(page);
  const m = text.match(/log: ([^\n]*)/);
  return m ? m[1].trim() : null;
}

async function drag(page, from, to, steps = 20) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i += 1) {
    await page.mouse.move(
      from.x + ((to.x - from.x) * i) / steps,
      from.y + ((to.y - from.y) * i) / steps,
    );
    await new Promise((r) => setTimeout(r, 12));
  }
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 400));
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') pageErrors.push(m.text()); });

  console.log(`\nPro panel two — ${URL}\n`);
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  // --- navigation ---
  const panelOne = await bodyText(page);
  check('panel one is the default (existing suites unaffected)', /DataGrid v2\.1\.0 verification/.test(panelOne));

  await clickLabel(page, 'Show panel two');
  let text = await bodyText(page);
  check('panel two renders', /Pro panel 2/.test(text));

  // --- all six components mounted ---
  for (const name of ['CommandPalette', 'Combobox', 'FormBuilder', 'FileUpload', 'Kanban', 'RichTextEditor', 'ProductTour']) {
    check(`${name} section present`, text.includes(name));
  }

  // --- FormBuilder wizard ---
  check('wizard starts on step 1', /Step 1 of 3/.test(text));
  check('wizard shows only step-1 fields', text.includes('Email') && !text.includes('Plan'));
  // Next with an empty required field must not advance.
  await clickLabel(page, 'Next');
  text = await bodyText(page);
  check('empty required field blocks Next', /Step 1 of 3/.test(text));
  check('required error is shown', /Email is required/.test(text));

  const emailInput = await page.$('[aria-label="Email"]');
  await emailInput.click();
  await page.keyboard.type('todd@wireservers.com');
  await clickLabel(page, 'Next');
  text = await bodyText(page);
  check('valid email advances the wizard', /Step 2 of 3/.test(text));
  check('step 2 shows the Plan field', text.includes('Plan'));
  // `seats` is showIf plan === team, and plan defaults to pro.
  check('conditional field hidden when its condition fails', !text.includes('Only shown for Team'));

  await clickLabel(page, 'Team');
  text = await bodyText(page);
  check('conditional field appears when condition met', text.includes('Only shown for Team'));

  // The now-visible required field must block Next — and it must be reachable to fix.
  await clickLabel(page, 'Next');
  text = await bodyText(page);
  check('newly-visible required field blocks Next', /Step 2 of 3/.test(text));

  await clickLabel(page, 'Pro');
  text = await bodyText(page);
  check('hiding the field again clears its block', !text.includes('Only shown for Team'));
  await clickLabel(page, 'Next');
  text = await bodyText(page);
  check('hidden required field does not block advancing', /Step 3 of 3/.test(text));

  await clickLabel(page, 'Submit');
  text = await bodyText(page);
  check('form submits', /submitted: \{/.test(text));
  check('submitted values omit the hidden branch', !/"seats"/.test(text));
  check('submitted values include the answered fields', /todd@wireservers\.com/.test(text));

  await page.screenshot({ path: path.join(SHOTS, 'panel2-forms.png'), fullPage: true });

  // --- Combobox ---
  const comboInput = await page.$('[aria-label="Search fruit…"]');
  if (comboInput) {
    await comboInput.click();
    await page.keyboard.type('ber');
    await new Promise((r) => setTimeout(r, 400));
    text = await bodyText(page);
    check('fuzzy search finds subsequence matches', /Blackberry|Blueberry|Elderberry/.test(text));
    check('fuzzy search excludes non-matches', !/\bMango\b/.test(text.split('Search fruit')[1] || ''));
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 300));
    text = await bodyText(page);
    check('combobox selection is recorded', /selected: (?!none)/.test(text));
  } else {
    check('combobox input rendered', false, 'no [aria-label="Search fruit…"]');
  }

  // --- CommandPalette ---
  await clickLabel(page, 'Open command palette');
  // The palette's own input is a placeholder, which is an attribute rather than innerText —
  // presence of the close affordance is the reliable signal that it is mounted.
  const paletteOpen = () => page.$('[aria-label="Close command palette"]').then(Boolean);
  check('palette opens', await paletteOpen());
  text = await bodyText(page);
  check('palette groups commands', /ACTIONS|Actions/.test(text) && /NAVIGATE|Navigate/.test(text));

  await page.keyboard.type('reset');
  await new Promise((r) => setTimeout(r, 300));
  text = await bodyText(page);
  check('palette filters to the match', /Reset board/.test(text));
  check('palette hides non-matches', !/Back to panel one/.test(text));

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 300));
  check('Escape closes the palette', !(await paletteOpen()));

  // ⌘K / Ctrl-K hotkey.
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyK');
  await page.keyboard.up('Control');
  await new Promise((r) => setTimeout(r, 300));
  check('Ctrl-K opens the palette', await paletteOpen());
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 300));

  // --- FileUpload ---
  text = await bodyText(page);
  check('dropzone renders', /Drag files here/.test(text));
  check('dropzone states the size limit', /Up to 5\.0 MB per file/.test(text));
  check('dropzone shows its hint', /Images, PDF or CSV/.test(text));

  // --- Kanban drag ---
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*'))
      .find((n) => n.textContent && n.textContent.trim() === 'Kanban');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 500));

  const cardBox = await page.evaluate(() => {
    const el = document.querySelector('[aria-label^="Ship Pro 0.1.0"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  check('kanban card is rendered and measurable', Boolean(cardBox));

  if (cardBox) {
    const before = await bodyText(page);
    const beforeLog = await readLog(page);
    // Drag right by roughly one column width into "In progress".
    await drag(page, cardBox, { x: cardBox.x + 250, y: cardBox.y + 20 });
    const afterLog = await readLog(page);
    check('kanban drag actually commits (PanResponder survives the parent ScrollView)',
      afterLog === 'kanban changed', `log was "${afterLog}" (was "${beforeLog}")`);

    const counts = await page.evaluate(() => {
      const out = {};
      for (const el of document.querySelectorAll('[aria-label*=", in "]')) {
        const m = el.getAttribute('aria-label').match(/, in (.+)$/);
        if (m) out[m[1]] = (out[m[1]] || 0) + 1;
      }
      return out;
    });
    check('card moved into In progress', (counts['In progress'] || 0) === 2,
      JSON.stringify(counts));
    check('card left To do', (counts['To do'] || 0) === 1, JSON.stringify(counts));
  }

  await page.screenshot({ path: path.join(SHOTS, 'panel2-kanban.png'), fullPage: true });

  // --- RichTextEditor ---
  text = await bodyText(page);
  check('editor preview renders', /PREVIEW|Preview/.test(text));
  check('preview strips markdown syntax', /Hello/.test(text) && !/# Hello/.test(text));
  check('preview renders list items', /one/.test(text) && /two/.test(text));

  const rte = await page.$('[aria-label="Write something…"]');
  if (rte) {
    const wordsBefore = (await bodyText(page)).match(/(\d+) words/);
    await rte.click();
    await page.keyboard.type(' plus more');
    await new Promise((r) => setTimeout(r, 300));
    const wordsAfter = (await bodyText(page)).match(/(\d+) words/);
    check('word counter updates as you type',
      wordsBefore && wordsAfter && Number(wordsAfter[1]) > Number(wordsBefore[1]),
      `${wordsBefore && wordsBefore[1]} -> ${wordsAfter && wordsAfter[1]}`);
  } else {
    check('rich text input rendered', false, 'no [aria-label="Write something…"]');
  }

  // Bold button toggles the marker into the source.
  const boldBtn = await page.$('[aria-label="Bold"]');
  if (boldBtn) {
    await boldBtn.click();
    await new Promise((r) => setTimeout(r, 300));
    const value = await page.evaluate(() => {
      const el = document.querySelector('[aria-label="Write something…"]');
      return el ? el.value : null;
    });
    check('Bold inserts markers at the cursor', value && value.includes('****'), String(value).slice(-40));
  } else {
    check('bold button rendered', false);
  }

  await page.screenshot({ path: path.join(SHOTS, 'panel2-richtext.png'), fullPage: true });

  // --- ProductTour ---
  await clickLabel(page, 'Start tour');
  text = await bodyText(page);
  check('tour opens on its first step', /Upload anything/.test(text));
  check('tour shows a step counter', (await tourStep(page)) === '1 of 3');

  const spotlight = await page.evaluate(() => {
    // The highlighted target carries the indigo ring.
    const el = Array.from(document.querySelectorAll('*'))
      .find((n) => getComputedStyle(n).borderTopColor === 'rgb(99, 102, 241)');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  check('tour spotlights a real, non-empty target',
    Boolean(spotlight) && spotlight.w > 20 && spotlight.h > 20, JSON.stringify(spotlight));

  const card = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('[aria-label]'))
      .find((n) => /^Upload anything\. Step/.test(n.getAttribute('aria-label') || ''));
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height, vw: window.innerWidth, vh: window.innerHeight };
  });
  check('tour card is on screen', Boolean(card));
  if (card) {
    check('tour card is fully inside the viewport horizontally',
      card.x >= 0 && card.x + card.w <= card.vw, JSON.stringify(card));
    check('tour card is fully inside the viewport vertically',
      card.y >= 0 && card.y + card.h <= card.vh, JSON.stringify(card));
  }
  if (card && spotlight) {
    check('tour card does not cover the element it is pointing at',
      card.y >= spotlight.y + spotlight.h || card.y + card.h <= spotlight.y ||
      card.x >= spotlight.x + spotlight.w || card.x + card.w <= spotlight.x,
      `card ${JSON.stringify(card)} spot ${JSON.stringify(spotlight)}`);
  }

  await page.screenshot({ path: path.join(SHOTS, 'panel2-tour.png'), fullPage: false });

  await clickInTour(page, 'Next');
  text = await bodyText(page);
  check('tour advances', /Move work along/.test(text) && (await tourStep(page)) === '2 of 3');
  await clickInTour(page, 'Back');
  check('tour goes back', (await tourStep(page)) === '1 of 3');

  await clickInTour(page, 'Next');
  await clickInTour(page, 'Next');
  check('tour reaches the final step', (await tourStep(page)) === '3 of 3');
  await clickInTour(page, 'Done');
  check('finishing the tour fires onFinish', (await readLog(page)) === 'tour finished');
  check('tour closes when finished', (await tourStep(page)) === null);

  // --- the unlicensed watermark must nag without obscuring a control ---
  // This has now regressed twice: first over the grid toolbar (top-right), then over the
  // wizard's Submit button (bottom-right). Assert it rather than re-discovering it.
  await clickInTour(page, 'Skip').catch(() => {});
  const overlaps = await page.evaluate(() => {
    const badges = Array.from(document.querySelectorAll('*')).filter(
      (n) => n.children.length === 0 && /react-natives-pro — unlicensed/.test(n.textContent || ''),
    );
    const controls = Array.from(document.querySelectorAll('[role="button"],[aria-label]')).filter((n) => {
      const r = n.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.width < 400;
    });
    const hits = [];
    for (const badge of badges) {
      const b = badge.getBoundingClientRect();
      if (!b.width) continue;
      for (const c of controls) {
        if (c.contains(badge) || badge.contains(c)) continue;
        const r = c.getBoundingClientRect();
        const hit = b.x < r.x + r.width && b.x + b.width > r.x && b.y < r.y + r.height && b.y + b.height > r.y;
        if (hit) hits.push(c.getAttribute('aria-label') || c.textContent.trim().slice(0, 30));
      }
    }
    return Array.from(new Set(hits));
  });
  check('watermark does not overlap any control', overlaps.length === 0, overlaps.join(', '));

  // --- no runtime errors anywhere in that flow ---
  const realErrors = pageErrors.filter((e) => !/Download the React DevTools|not listed in the "exports"/.test(e));
  check('no page errors during the whole run', realErrors.length === 0, realErrors.slice(0, 3).join('\n         '));

  await browser.close();
  console.log(`\npanel two: ${pass} passed, ${fail} failed`);
  console.log(`screenshots in ${SHOTS}`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
