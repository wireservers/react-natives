#!/usr/bin/env node
'use strict';

/**
 * Pre-publish preflight for @wireservers-ui/react-natives and …-pro.
 *
 * Publishing is irreversible — npm forbids republishing a version, and an unpublish window is
 * 72 hours at best. These are the checks worth running while a mistake still costs nothing.
 *
 * Usage:  node scripts/preflight.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BASE = path.join(ROOT, 'packages/react-natives');
const PRO = path.join(ROOT, 'packages/react-natives-pro');

let pass = 0;
let fail = 0;
let warn = 0;
function ok(name) { pass += 1; console.log(`  ok    ${name}`); }
function bad(name, detail) { fail += 1; console.log(`  FAIL  ${name}${detail ? `\n          ${detail}` : ''}`); }
function warning(name, detail) { warn += 1; console.log(`  warn  ${name}${detail ? `\n          ${detail}` : ''}`); }
function check(name, condition, detail) { condition ? ok(name) : bad(name, detail); }

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function packedFiles(dir) {
  const out = execFileSync('npm', ['pack', '--dry-run', '--json'], { cwd: dir, encoding: 'utf8' });
  const parsed = JSON.parse(out);
  return parsed[0].files.map((f) => f.path);
}

const basePkg = readJson(path.join(BASE, 'package.json'));
const proPkg = readJson(path.join(PRO, 'package.json'));

console.log(`preflight: ${basePkg.name}@${basePkg.version} + ${proPkg.name}@${proPkg.version}\n`);

// ---------------------------------------------------------------- version consistency
console.log('version consistency');
const baseChangelog = fs.readFileSync(path.join(BASE, 'CHANGELOG.md'), 'utf8');
const baseReadme = fs.readFileSync(path.join(BASE, 'README.md'), 'utf8');
check(
  `base CHANGELOG documents ${basePkg.version}`,
  baseChangelog.includes(`[${basePkg.version}]`),
  'the repo convention is package.json + CHANGELOG + README updated together',
);
check(
  `base README references ${basePkg.version}`,
  baseReadme.includes(basePkg.version),
  'README "Release Notes" heading is stale',
);
const proChangelog = fs.readFileSync(path.join(PRO, 'CHANGELOG.md'), 'utf8');
check(`pro CHANGELOG documents ${proPkg.version}`, proChangelog.includes(`[${proPkg.version}]`));

// ---------------------------------------------------------------- publish ORDER
console.log('\npublish order (pro depends on base)');
const peerRange = (proPkg.peerDependencies || {})['@wireservers-ui/react-natives'];
check('pro declares a peer dep on the base package', Boolean(peerRange));
if (peerRange) {
  const required = peerRange.replace(/[^0-9.]/g, '');
  const cmp = (a, b) => {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i += 1) {
      if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
    }
    return 0;
  };
  check(
    `base version ${basePkg.version} satisfies pro's peer range ${peerRange}`,
    cmp(basePkg.version, required) >= 0,
    `bump the base package to >= ${required} first`,
  );

  // Is the required base version actually on npm yet?
  let published = null;
  try {
    published = execFileSync('npm', ['view', `${basePkg.name}@${basePkg.version}`, 'version'], {
      encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    published = null;
  }
  if (published === basePkg.version) {
    ok(`base ${basePkg.version} is already on npm — pro can be published now`);
  } else {
    warning(
      `base ${basePkg.version} is NOT on npm yet`,
      'publish the base package FIRST, or `npm i` of pro will fail to resolve its peer dep',
    );
  }
}

// ---------------------------------------------------------------- already published?
console.log('\nversion availability');
for (const pkg of [basePkg, proPkg]) {
  let exists = false;
  try {
    execFileSync('npm', ['view', `${pkg.name}@${pkg.version}`, 'version'], {
      encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
    });
    exists = true;
  } catch {
    exists = false;
  }
  if (exists) {
    warning(`${pkg.name}@${pkg.version} already exists on npm`, 'npm will reject a republish — bump the version');
  } else {
    ok(`${pkg.name}@${pkg.version} is not yet taken`);
  }
}

// ---------------------------------------------------------------- package contents
console.log('\npackage contents');
for (const [label, dir] of [['base', BASE], ['pro', PRO]]) {
  let files;
  try {
    files = packedFiles(dir);
  } catch (error) {
    bad(`${label}: npm pack succeeded`, String(error.message).slice(0, 200));
    continue;
  }

  check(`${label}: ships an entry point`, files.some((f) => f === 'src/index.ts'));
  check(`${label}: ships a README`, files.some((f) => /^README/i.test(f)));
  check(`${label}: ships a LICENSE`, files.some((f) => /^LICENSE/i.test(f)));
  check(`${label}: no node_modules`, !files.some((f) => f.includes('node_modules')), files.filter((f) => f.includes('node_modules')).slice(0, 3).join(', '));
  check(`${label}: no test files`, !files.some((f) => /(^|\/)(test|__tests__)\//.test(f)));
  check(`${label}: no .env or key material`, !files.some((f) => /\.env|\.key$|signing-key/.test(f)));
  check(`${label}: no tarballs`, !files.some((f) => f.endsWith('.tgz')));
}

// pro must not publish the signing tool
try {
  const proFiles = packedFiles(PRO);
  check('pro: signing tool is NOT published', !proFiles.some((f) => f.includes('sign-license')));
} catch { /* reported above */ }

// ---------------------------------------------------------------- secret scan
console.log('\nsecret scan (published files only)');
const SECRET_PATTERNS = [
  [/sk_live_[A-Za-z0-9]+/, 'Stripe live secret key'],
  [/sk_test_[A-Za-z0-9]{10,}/, 'Stripe test secret key'],
  [/whsec_[A-Za-z0-9]{10,}/, 'Stripe webhook secret'],
  [/AccountKey=[A-Za-z0-9+/=]{20,}/, 'Azure connection string'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'PEM private key'],
];
let secretHits = 0;
for (const [label, dir] of [['base', BASE], ['pro', PRO]]) {
  let files = [];
  try { files = packedFiles(dir); } catch { continue; }
  for (const rel of files) {
    const full = path.join(dir, rel);
    if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) continue;
    let content;
    try { content = fs.readFileSync(full, 'utf8'); } catch { continue; }
    for (const [pattern, what] of SECRET_PATTERNS) {
      if (pattern.test(content)) {
        secretHits += 1;
        bad(`${label}: ${what} found in ${rel}`, 'MUST NOT PUBLISH');
      }
    }
  }
}
if (secretHits === 0) ok('no secrets detected in either package');

// The embedded license public key must be present — and must be a PUBLIC key only.
const licenseSrc = fs.readFileSync(path.join(PRO, 'src/licensing/license.ts'), 'utf8');
const pubMatch = licenseSrc.match(/LICENSE_PUBLIC_KEY_HEX = '([0-9a-f]+)'/);
check('pro: embeds a license public key', Boolean(pubMatch));
check('pro: public key is 32 bytes (Ed25519)', Boolean(pubMatch) && pubMatch[1].length === 64, pubMatch ? `${pubMatch[1].length / 2} bytes` : 'missing');
check(
  'pro: no private signing key in source',
  !/PRIVATE_KEY\s*=\s*'[0-9a-f]{64,}'/.test(licenseSrc),
);

console.log(`\n${pass} passed, ${fail} failed, ${warn} warning(s)`);
if (fail > 0) {
  console.log('\nDo NOT publish until the failures above are resolved.');
  process.exit(1);
}
if (warn > 0) {
  console.log('\nWarnings above are usually about ordering — read them before publishing.');
}
console.log('\nPublish order:');
console.log(`  cd packages/react-natives     && npm publish --access public   # ${basePkg.version} FIRST`);
console.log(`  cd packages/react-natives-pro && npm publish --access public   # ${proPkg.version} second`);
process.exit(0);
