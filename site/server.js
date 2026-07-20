'use strict';

/**
 * Static server for the exported docs site.
 *
 * Replaces `pm2 serve`, which cannot serve a directory route: Expo exports `/components` as
 * `components/index.html`, pm2 stats the directory, and returns a 500 error page reading
 * "Sorry, check with the site admin for error: EISDIR". `--spa` does not rescue it, because
 * that fallback only fires when a path is *missing* — and the directory exists. Top-level nav
 * routes (`/components`, `/theming`) were dead in production because of this.
 *
 * Resolution order for a request path, first hit wins:
 *   1. the exact file            /components/docs/button -> components/docs/button.html
 *   2. `<path>.html`             /pro                    -> pro.html
 *   3. `<path>/index.html`       /components             -> components/index.html
 *   4. SPA fallback to index.html, so client-side routes still boot
 *
 * No dependencies: this is deployed as-is next to the export, and adding an install step to
 * the deploy package would be a new failure mode for no benefit.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Locally the export sits in `site/dist`; when deployed, the export *is* the deploy root and
 * this file sits beside index.html. Detected rather than configured, so the same file works in
 * both places with nothing to remember.
 */
function detectRoot() {
  if (process.env.SITE_ROOT) return path.resolve(process.env.SITE_ROOT);
  const dist = path.join(__dirname, 'dist');
  if (fs.existsSync(path.join(dist, 'index.html'))) return dist;
  return __dirname;
}

const ROOT = detectRoot();
const PORT = Number(process.env.PORT) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.map': 'application/json; charset=utf-8',
};

const IMMUTABLE = new Set([
  '.js', '.mjs', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg',
  '.webp', '.avif', '.ico', '.woff', '.woff2', '.ttf', '.otf',
]);

function isFile(candidate) {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}

/**
 * Map a URL path to a file on disk, or null.
 *
 * Rejects anything that escapes ROOT after normalisation — a request for `/../../etc/passwd`
 * must not be able to read outside the export.
 */
function resolveFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null; // malformed percent-encoding
  }
  if (decoded.includes('\0')) return null;

  const clean = path.posix.normalize(decoded).replace(/\/+$/, '') || '/';
  const target = path.join(ROOT, clean);
  const rel = path.relative(ROOT, target);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;

  if (clean === '/') return path.join(ROOT, 'index.html');
  if (isFile(target)) return target;
  if (isFile(`${target}.html`)) return `${target}.html`;

  const indexFile = path.join(target, 'index.html');
  if (isFile(indexFile)) return indexFile;

  return null;
}

function send(res, status, file, { immutable = false } = {}) {
  const ext = path.extname(file).toLowerCase();
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  };
  headers['Cache-Control'] = immutable
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=0, must-revalidate';

  const body = fs.readFileSync(file);
  headers['Content-Length'] = body.length;
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('method not allowed');
    return;
  }

  const urlPath = (req.url || '/').split('?')[0].split('#')[0];

  try {
    const file = resolveFile(urlPath);
    if (file) {
      const ext = path.extname(file).toLowerCase();
      // Only hashed build assets get the immutable cache; HTML must stay revalidated or a
      // deploy would not be visible until caches expire.
      send(res, 200, file, { immutable: IMMUTABLE.has(ext) && urlPath.startsWith('/_expo/') });
      return;
    }

    // A missing *asset* is a 404, not the app shell. Falling back for `/foo.js` would answer
    // a broken script tag with HTML and a 200, which surfaces as a confusing parse error in
    // the browser instead of the missing file it actually is.
    const requestedExt = path.extname(urlPath).toLowerCase();
    if (requestedExt && requestedExt !== '.html') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('not found');
      return;
    }

    // Unknown path: hand it to the client router, which renders the app's own 404.
    const fallback = path.join(ROOT, 'index.html');
    if (isFile(fallback)) {
      send(res, 200, fallback);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('not found');
  } catch (error) {
    console.error(`[server] ${urlPath}:`, error && error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('internal server error');
  }
});

if (require.main === module) {
  if (!fs.existsSync(ROOT)) {
    console.error(`[server] missing site root: ${ROOT}`);
    process.exit(1);
  }
  server.listen(PORT, () => {
    console.log(`[server] serving ${ROOT} on :${PORT}`);
  });
}

module.exports = { server, resolveFile, ROOT };
