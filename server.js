const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIST = path.join(__dirname, 'demos', 'expo', 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain',
};

function tryFile(filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (stat.isFile()) return filePath;
  } catch {}
  return null;
}

function resolve(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const safePath = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const abs = path.join(DIST, safePath);

  // Exact file match
  let found = tryFile(abs);
  if (found) return found;

  // Try .html extension (e.g. /docs/button → /docs/button.html)
  found = tryFile(abs + '.html');
  if (found) return found;

  // Try directory index (e.g. /docs → /docs/index.html)
  found = tryFile(path.join(abs, 'index.html'));
  if (found) return found;

  // Fallback to root index.html for client-side routing
  return path.join(DIST, 'index.html');
}

http
  .createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    const filePath = resolve(urlPath);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Cache hashed assets for 1 year; HTML gets no-cache so deploys are instant
    const isHashed = /[-\.][a-f0-9]{8,}\.\w+$/.test(filePath);
    const cacheControl =
      ext === '.html' || filePath.endsWith('index.html')
        ? 'public, max-age=0, must-revalidate'
        : isHashed
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=86400';

    const stream = fs.createReadStream(filePath);
    stream.on('open', () => {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
      });
      stream.pipe(res);
    });
    stream.on('error', () => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    });
  })
  .listen(PORT, () => {
    console.log(`Serving demos/expo/dist on port ${PORT}`);
  });
