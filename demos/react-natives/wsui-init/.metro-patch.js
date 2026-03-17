#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const target = path.join(__dirname, 'node_modules/metro-config/src/loadConfig.js');
if (!fs.existsSync(target)) process.exit(0);

const src = fs.readFileSync(target, 'utf8');
if (src.includes('pathToFileURL')) process.exit(0); // already patched

const patched = src.replace(
  /await import\(absolutePath\)/g,
  'await import(require("url").pathToFileURL(absolutePath).href)'
);
if (patched === src) process.exit(0); // pattern not found — nothing to do

fs.writeFileSync(target, patched, 'utf8');
console.log('  patched metro-config/src/loadConfig.js (Windows ESM URL fix)');
