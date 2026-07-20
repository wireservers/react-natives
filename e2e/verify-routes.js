// Exercises site/server.js — the real production entry point — against the real export.
//
// This reproduces and guards a live production failure: /components answered 500
// ("Sorry, check with the site admin for error: EISDIR") because Expo exports it as
// `components/index.html` and the previous `pm2 serve` startup command cannot serve a
// directory route. `--spa` did not help: that fallback only fires for *missing* paths, and the
// directory exists. Top-level nav routes were dead.
//
//   cd ../site && npm run build
//   node verify-routes.js
const http = require('http');
const path = require('path');

const { server } = require('../site/server.js');

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? `  — ${detail}` : ''}`); }
}

function request(base, route) {
  return new Promise((resolve) => {
    http.get(`${base}${route}`, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on('error', (e) => resolve({ status: 0, headers: {}, body: String(e.message) }));
  });
}

// Flat exports — these always worked.
const FLAT_ROUTES = ['/', '/pro', '/pro-docs', '/thanks', '/components/getting-started', '/components/docs/button'];
// Directory-index exports — these are the ones that 500'd in production.
const DIRECTORY_ROUTES = ['/components', '/theming'];

(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  console.log(`\nroute health via site/server.js — ${base}\n`);

  for (const route of [...FLAT_ROUTES, ...DIRECTORY_ROUTES]) {
    const res = await request(base, route);
    const ok = res.status === 200 && /<html|<!DOCTYPE/i.test(res.body);
    check(`${route} serves HTML`, ok, `status ${res.status}`);
  }

  // The exact regression, called out by name.
  const components = await request(base, '/components');
  check('/components is not the EISDIR error page',
    !/EISDIR|check with the site admin/i.test(components.body));

  // Trailing slashes must resolve the same way, or nav links break arbitrarily.
  const slash = await request(base, '/components/');
  check('/components/ resolves like /components', slash.status === 200);

  // Unknown paths hand off to the client router rather than hard-failing.
  const unknown = await request(base, '/no-such-page-here');
  check('unknown route falls back to the app shell', unknown.status === 200);

  // Path traversal must not escape the export.
  for (const attack of ['/../package.json', '/..%2f..%2fpackage.json', '/%2e%2e/server.js']) {
    const res = await request(base, attack);
    const leaked = /"name"\s*:|require\(/.test(res.body) && !/<html|<!DOCTYPE/i.test(res.body);
    check(`traversal blocked: ${attack}`, !leaked, `status ${res.status}`);
  }

  // Content types, since a wrong one silently breaks the page. Bundle names are hashed, so
  // the filename is discovered rather than guessed.
  const fsMod = require('fs');
  const jsDir = path.resolve(__dirname, '../site/dist/_expo/static/js/web');
  const bundle = fsMod.existsSync(jsDir)
    ? fsMod.readdirSync(jsDir).find((f) => f.endsWith('.js'))
    : null;
  check('a JS bundle was exported', Boolean(bundle));
  if (bundle) {
    const js = await request(base, `/_expo/static/js/web/${encodeURIComponent(bundle)}`);
    check('JS bundle is served', js.status === 200, `status ${js.status}`);
    check('JS is served as JavaScript', /javascript/.test(js.headers['content-type'] || ''),
      js.headers['content-type']);
    check('hashed assets are cached immutably', /immutable/.test(js.headers['cache-control'] || ''),
      js.headers['cache-control']);
  }

  // A missing asset must 404 rather than silently returning the HTML shell, which would
  // surface as a script parse error instead of the missing file it actually is.
  const missingAsset = await request(base, '/_expo/static/js/web/does-not-exist.js');
  check('missing asset 404s instead of serving HTML',
    missingAsset.status === 404 && !/<html/i.test(missingAsset.body), `status ${missingAsset.status}`);

  const html = await request(base, '/pro');
  check('HTML is served as HTML', /text\/html/.test(html.headers['content-type'] || ''));
  check('HTML is revalidated, not cached immutably',
    /must-revalidate|max-age=0/.test(html.headers['cache-control'] || ''),
    html.headers['cache-control']);
  check('nosniff is set', html.headers['x-content-type-options'] === 'nosniff');

  // /pro must stay a flat export: a directory index there would have taken checkout down on
  // the old host, and this is what caught that during the Pro docs work.
  const fs = require('fs');
  const DIST = path.resolve(__dirname, '../site/dist');
  check('/pro is a flat file, not a directory index',
    fs.existsSync(path.join(DIST, 'pro.html')) && !fs.existsSync(path.join(DIST, 'pro', 'index.html')));

  server.close();
  console.log(`\nroutes: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
