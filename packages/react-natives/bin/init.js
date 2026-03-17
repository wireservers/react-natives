#!/usr/bin/env node

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const cwd   = process.cwd();
const force = process.argv.includes('--force');

const green  = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const cyan   = (s) => `\x1b[36m${s}\x1b[0m`;
const bold   = (s) => `\x1b[1m${s}\x1b[0m`;
const dim    = (s) => `\x1b[2m${s}\x1b[0m`;

function write(filename, content) {
  const filepath = path.join(cwd, filename);
  if (fs.existsSync(filepath) && !force) {
    console.log(yellow('  skip  ') + filename + dim(' (already exists — use --force to overwrite)'));
    return;
  }
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(green('  create') + ' ' + filename);
}

// ─── Detect project type ──────────────────────────────────────────────────────

const hasExpoRouter = fs.existsSync(path.join(cwd, 'app'));

const tailwindContent = hasExpoRouter
  ? ['    "./app/**/*.{ts,tsx}"', '    "./components/**/*.{ts,tsx}"']
  : ['    "./App.{ts,tsx}"',      '    "./components/**/*.{ts,tsx}"'];

// ─── Generated file contents ──────────────────────────────────────────────────

const TAILWIND_CONFIG = `const wirePreset = require("@wireservers-ui/react-natives/tailwind-preset");
module.exports = {
  content: [
${tailwindContent.join(',\n')},
    "./node_modules/@wireservers-ui/react-natives/src/**/*.{ts,tsx}",
  ],
  presets: [wirePreset],
};
`;

const GLOBAL_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary-0: 228 228 255;
  --color-primary-50: 206 204 255;
  --color-primary-100: 183 180 255;
  --color-primary-200: 159 155 255;
  --color-primary-300: 134 128 255;
  --color-primary-400: 108 99 243;
  --color-primary-500: 80 70 230;
  --color-primary-600: 62 53 205;
  --color-primary-700: 46 38 180;
  --color-primary-800: 33 26 155;
  --color-primary-900: 22 17 130;
  --color-primary-950: 15 10 105;

  --color-secondary-0: 253 253 253;
  --color-secondary-50: 243 243 243;
  --color-secondary-100: 233 233 233;
  --color-secondary-200: 213 213 213;
  --color-secondary-300: 193 193 193;
  --color-secondary-400: 163 163 163;
  --color-secondary-500: 115 115 115;
  --color-secondary-600: 82 82 82;
  --color-secondary-700: 64 64 64;
  --color-secondary-800: 38 38 38;
  --color-secondary-900: 23 23 23;
  --color-secondary-950: 10 10 10;

  --color-tertiary-50: 255 244 236;
  --color-tertiary-100: 255 225 204;
  --color-tertiary-200: 255 197 153;
  --color-tertiary-300: 255 168 102;
  --color-tertiary-400: 255 140 51;
  --color-tertiary-500: 255 111 0;
  --color-tertiary-600: 219 93 0;
  --color-tertiary-700: 183 76 0;
  --color-tertiary-800: 146 60 0;
  --color-tertiary-900: 110 44 0;
  --color-tertiary-950: 73 29 0;

  --color-error-0: 255 242 242;
  --color-error-50: 254 226 226;
  --color-error-100: 254 202 202;
  --color-error-200: 252 165 165;
  --color-error-300: 248 113 113;
  --color-error-400: 239 68 68;
  --color-error-500: 220 38 38;
  --color-error-600: 185 28 28;
  --color-error-700: 153 27 27;
  --color-error-800: 127 29 29;
  --color-error-900: 100 20 20;
  --color-error-950: 69 10 10;

  --color-success-0: 240 253 244;
  --color-success-50: 220 252 231;
  --color-success-100: 187 247 208;
  --color-success-200: 134 239 172;
  --color-success-300: 74 222 128;
  --color-success-400: 34 197 94;
  --color-success-500: 22 163 74;
  --color-success-600: 21 128 61;
  --color-success-700: 22 101 52;
  --color-success-800: 20 83 45;
  --color-success-900: 17 68 37;
  --color-success-950: 5 46 22;

  --color-warning-0: 255 252 240;
  --color-warning-50: 254 249 195;
  --color-warning-100: 254 240 138;
  --color-warning-200: 253 224 71;
  --color-warning-300: 250 204 21;
  --color-warning-400: 234 179 8;
  --color-warning-500: 202 138 4;
  --color-warning-600: 161 98 7;
  --color-warning-700: 133 77 14;
  --color-warning-800: 113 63 18;
  --color-warning-900: 90 52 18;
  --color-warning-950: 66 32 6;

  --color-info-0: 240 249 255;
  --color-info-50: 224 242 254;
  --color-info-100: 186 230 253;
  --color-info-200: 125 211 252;
  --color-info-300: 56 189 248;
  --color-info-400: 14 165 233;
  --color-info-500: 2 132 199;
  --color-info-600: 3 105 161;
  --color-info-700: 7 89 133;
  --color-info-800: 12 74 110;
  --color-info-900: 12 64 93;
  --color-info-950: 8 47 73;

  --color-typography-0: 255 255 255;
  --color-typography-50: 245 245 245;
  --color-typography-100: 229 229 229;
  --color-typography-200: 212 212 212;
  --color-typography-300: 163 163 163;
  --color-typography-400: 140 140 140;
  --color-typography-500: 115 115 115;
  --color-typography-600: 82 82 82;
  --color-typography-700: 64 64 64;
  --color-typography-800: 38 38 38;
  --color-typography-900: 23 23 23;
  --color-typography-950: 10 10 10;

  --color-outline-0: 255 255 255;
  --color-outline-50: 245 245 245;
  --color-outline-100: 229 229 229;
  --color-outline-200: 212 212 212;
  --color-outline-300: 163 163 163;
  --color-outline-400: 140 140 140;
  --color-outline-500: 115 115 115;
  --color-outline-600: 82 82 82;
  --color-outline-700: 64 64 64;
  --color-outline-800: 38 38 38;
  --color-outline-900: 23 23 23;
  --color-outline-950: 10 10 10;

  --color-background-0: 255 255 255;
  --color-background-50: 246 246 246;
  --color-background-100: 237 237 237;
  --color-background-200: 219 219 219;
  --color-background-300: 185 185 185;
  --color-background-400: 163 163 163;
  --color-background-500: 140 140 140;
  --color-background-600: 115 115 115;
  --color-background-700: 82 82 82;
  --color-background-800: 64 64 64;
  --color-background-900: 38 38 38;
  --color-background-950: 23 23 23;
  --color-background-error: 254 226 226;
  --color-background-warning: 254 249 195;
  --color-background-muted: 245 245 245;
  --color-background-success: 220 252 231;
  --color-background-info: 224 242 254;

  --color-indicator-primary: 80 70 230;
  --color-indicator-info: 2 132 199;
  --color-indicator-error: 220 38 38;
}
`;

const METRO_CONFIG = `const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });
`;

const BABEL_CONFIG = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
`;

const NATIVEWIND_ENV = `/// <reference types="nativewind/types" />\n`;

// ─── Metro Windows ESM patch ──────────────────────────────────────────────────
//
// Metro calls `await import(absolutePath)` with a raw Windows path (D:\...).
// Node 22+'s ESM loader requires file:// URLs on Windows, so this throws
// ERR_UNSUPPORTED_ESM_URL_SCHEME. The patch converts the path via pathToFileURL.
// It lives in .metro-patch.js and runs as a postinstall script so it survives
// future `npm install` calls that would overwrite node_modules.

const METRO_PATCH_SCRIPT = `#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const target = path.join(__dirname, 'node_modules/metro-config/src/loadConfig.js');
if (!fs.existsSync(target)) process.exit(0);

const src = fs.readFileSync(target, 'utf8');
if (src.includes('pathToFileURL')) process.exit(0); // already patched

const patched = src.replace(
  /await import\\(absolutePath\\)/g,
  'await import(require("url").pathToFileURL(absolutePath).href)'
);
if (patched === src) process.exit(0); // pattern not found — nothing to do

fs.writeFileSync(target, patched, 'utf8');
console.log('  patched metro-config/src/loadConfig.js (Windows ESM URL fix)');
`;

// ─── babel.config.js ─────────────────────────────────────────────────────────

function handleBabelConfig() {
  const filepath = path.join(cwd, 'babel.config.js');

  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, BABEL_CONFIG, 'utf8');
    console.log(green('  create') + ' babel.config.js');
    return;
  }

  const existing = fs.readFileSync(filepath, 'utf8');
  if (existing.includes('jsxImportSource') && existing.includes('nativewind/babel')) {
    console.log(green('  ok    ') + ' babel.config.js');
    return;
  }

  // create-expo-app ships a single-preset babel.config.js — overwrite it
  if (/presets:\s*\[['"]babel-preset-expo['"]\]/.test(existing)) {
    fs.writeFileSync(filepath, BABEL_CONFIG, 'utf8');
    console.log(green('  update') + ' babel.config.js');
    return;
  }

  // Complex existing config — show manual instructions
  console.log(yellow('  manual') + ' babel.config.js — add NativeWind manually:');
  console.log(dim('    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"]'));
}

// ─── package.json — add postinstall ──────────────────────────────────────────

function addPostinstall() {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.scripts = pkg.scripts || {};

  const existing = pkg.scripts.postinstall || '';
  if (existing.includes('.metro-patch.js')) {
    console.log(green('  ok    ') + ' package.json postinstall');
    return;
  }

  pkg.scripts.postinstall = existing
    ? `${existing} && node .metro-patch.js`
    : 'node .metro-patch.js';

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(green('  update') + ' package.json postinstall');
}

// ─── Install nativewind + tailwindcss ────────────────────────────────────────
//
// Runs npm install which also triggers postinstall, applying the Metro patch.

function installDeps() {
  console.log(cyan('\n  Installing nativewind and tailwindcss...\n'));
  try {
    execSync('npm install nativewind@4 tailwindcss@3', { cwd, stdio: 'inherit' });
  } catch {
    console.log(yellow('\n  warn  ') + ' npm install failed — run it manually to finish setup');
  }
}

// ─── Run ─────────────────────────────────────────────────────────────────────

console.log(bold('\n@wireservers-ui/react-natives init\n'));

if (hasExpoRouter) {
  console.log(cyan('  Detected Expo Router') + '\n');
}

write('tailwind.config.js',  TAILWIND_CONFIG);
write('global.css',          GLOBAL_CSS);
write('metro.config.js',     METRO_CONFIG);
handleBabelConfig();
write('nativewind-env.d.ts', NATIVEWIND_ENV);
write('.metro-patch.js',     METRO_PATCH_SCRIPT);
addPostinstall();
installDeps();

console.log('\n' + bold('Done.') + ' Run ' + cyan('npx expo start --clear') + ' to get started.\n');
