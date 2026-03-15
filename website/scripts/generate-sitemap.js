#!/usr/bin/env node

/**
 * Post-build script to generate sitemap.xml from the static export.
 * Scans the dist/ directory for .html files and produces an XML sitemap.
 *
 * Usage: node scripts/generate-sitemap.js [--base-url https://your-domain.com]
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const OUTPUT = path.join(DIST_DIR, 'sitemap.xml');

// Parse --base-url flag (default to empty for relative URLs)
const args = process.argv.slice(2);
const baseUrlIndex = args.indexOf('--base-url');
const rawBaseUrl = baseUrlIndex !== -1 ? args[baseUrlIndex + 1] || '' : 'https://www.reactnatives.dev';
const BASE_URL = rawBaseUrl.replace(/\/+$/, '');
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

// Directories/files to exclude from sitemap
const EXCLUDE = new Set(['_sitemap.html', '+not-found.html']);
// URL patterns to exclude (template routes, redirects)
const EXCLUDE_PATTERNS = [/\[.*\]/, /\/docs\/?$/, /\/modal\/?$/];

function toUrlPath(relativePath) {
  let urlPath = `/${relativePath}`
    .replace(/\\/g, '/')
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '');

  // Remove Expo Router group syntax from URL paths.
  urlPath = urlPath.replace(/\/\([^)]+\)/g, '');
  urlPath = urlPath.replace(/\/+/g, '/');

  if (urlPath === '/index' || urlPath === '/') {
    return '/';
  }

  return urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
}

function routeMeta(url) {
  if (url === '/') {
    return { priority: '1.0', changefreq: 'weekly' };
  }

  if (url.startsWith('/components/docs/')) {
    return { priority: '0.9', changefreq: 'weekly' };
  }

  if (url === '/components/getting-started') {
    return { priority: '0.9', changefreq: 'monthly' };
  }

  if (url === '/components' || url.startsWith('/components/')) {
    return { priority: '0.8', changefreq: 'weekly' };
  }

  if (url === '/theming' || url.startsWith('/features/')) {
    return { priority: '0.8', changefreq: 'monthly' };
  }

  return { priority: '0.6', changefreq: 'monthly' };
}

function collectHtmlFiles(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let pages = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Skip hidden directories and asset directories
      if (entry.name.startsWith('.') || entry.name === '_expo') continue;
      pages = pages.concat(collectHtmlFiles(fullPath, relativePath));
    } else if (entry.name.endsWith('.html') && !EXCLUDE.has(entry.name)) {
      const urlPath = toUrlPath(relativePath);
      const lastmod = fs.statSync(fullPath).mtime.toISOString().split('T')[0];

      pages.push({
        url: urlPath,
        lastmod,
      });
    }
  }

  return pages;
}

function dedupePages(pages) {
  const pageMap = new Map();

  for (const page of pages) {
    const existing = pageMap.get(page.url);
    if (!existing || page.lastmod > existing.lastmod) {
      pageMap.set(page.url, page);
    }
  }

  return [...pageMap.values()];
}

function generateSitemap(pages) {
  const urlEntries = pages.map((page) => {
    const fullUrl = `${BASE_URL}${page.url}`;
    const { priority, changefreq } = routeMeta(page.url);

    return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${escapeXml(DEFAULT_IMAGE)}</image:loc>
    </image:image>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>
`;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Main
if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist/ directory not found. Run "npm run build" first.');
  process.exit(1);
}

const pages = dedupePages(collectHtmlFiles(DIST_DIR))
  .filter((page) => !EXCLUDE_PATTERNS.some((pattern) => pattern.test(page.url)))
  .sort((a, b) => a.url.localeCompare(b.url));
const sitemap = generateSitemap(pages);

fs.writeFileSync(OUTPUT, sitemap, 'utf-8');
console.log(`Sitemap generated with ${pages.length} URLs: ${OUTPUT}`);
