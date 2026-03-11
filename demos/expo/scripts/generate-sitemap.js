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
const BASE_URL = baseUrlIndex !== -1 ? args[baseUrlIndex + 1] || '' : 'https://www.reactnatives.dev';

// Directories/files to exclude from sitemap
const EXCLUDE = new Set(['_sitemap.html', '+not-found.html']);
// URL patterns to exclude (template routes, redirects)
const EXCLUDE_PATTERNS = [/\[.*\]/, /\/docs\/$/];

function collectHtmlFiles(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let urls = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Skip hidden directories and asset directories
      if (entry.name.startsWith('.') || entry.name === '_expo') continue;
      urls = urls.concat(collectHtmlFiles(fullPath, relativePath));
    } else if (entry.name.endsWith('.html') && !EXCLUDE.has(entry.name)) {
      // Convert file path to URL path
      let urlPath = '/' + relativePath
        .replace(/\/index\.html$/, '/')
        .replace(/\.html$/, '');

      // Clean up Expo Router's group syntax: remove (tabs)/ etc.
      urlPath = urlPath.replace(/\/\([^)]+\)/g, '');

      // Deduplicate trailing slashes
      urlPath = urlPath.replace(/\/+/g, '/');

      // Root index
      if (urlPath === '/index' || urlPath === '/') urlPath = '/';

      urls.push(urlPath);
    }
  }

  return urls;
}

function generateSitemap(urls) {
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = urls.map((url) => {
    const fullUrl = BASE_URL + url;
    const priority = url === '/' ? '1.0' : url.includes('/components/docs/') ? '0.8' : '0.6';
    const changefreq = url === '/' ? 'weekly' : 'monthly';

    return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

const urls = [...new Set(collectHtmlFiles(DIST_DIR))]
  .filter((url) => !EXCLUDE_PATTERNS.some((p) => p.test(url)))
  .sort();
const sitemap = generateSitemap(urls);

fs.writeFileSync(OUTPUT, sitemap, 'utf-8');
console.log(`Sitemap generated with ${urls.length} URLs: ${OUTPUT}`);
