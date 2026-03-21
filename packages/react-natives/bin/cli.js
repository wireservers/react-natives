#!/usr/bin/env node
/* eslint-env node */
/* global require, process, console */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];
const force = args.includes("--force");

if (command !== "init") {
  console.error(`Unknown command: ${command}`);
  console.error("Usage: npx @wireservers-ui/react-natives init");
  process.exit(1);
}

const cwd = process.cwd();

function isExpoProject(dir) {
  const pkgPath = path.join(dir, "package.json");
  if (!fs.existsSync(pkgPath)) return false;

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const deps = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
    };
    return Boolean(deps.expo || deps["expo-router"] || deps["react-native"]);
  } catch {
    return false;
  }
}

if (!isExpoProject(cwd)) {
  console.error(
    "\n❌ @wireservers-ui/react-natives init must be run inside an Expo project folder.",
  );
  console.error("   Example:");
  console.error("   mkdir -p demos/react-natives");
  console.error(
    "   npx create-expo-app@latest demos/react-natives/project --template blank-typescript",
  );
  console.error("   cd demos/react-natives/project");
  console.error("   npx @wireservers-ui/react-natives@2.0.1 init\n");
  process.exit(1);
}

// ── Detect package manager ─────────────────────────────────────────────────
function detectPackageManager() {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}

const pm = detectPackageManager();
const installCmd = pm === "yarn" ? "yarn add" : `${pm} install`;
let needsReinstall = false;

function getInstalledReactVersion() {
  const reactPkgPath = path.join(cwd, "node_modules", "react", "package.json");
  if (!fs.existsSync(reactPkgPath)) return null;

  try {
    const reactPkg = JSON.parse(fs.readFileSync(reactPkgPath, "utf8"));
    return typeof reactPkg.version === "string" ? reactPkg.version : null;
  } catch {
    return null;
  }
}

console.log(`\n🚀 Initializing @wireservers-ui/react-natives...\n`);
console.log(`   Package manager: ${pm}`);

// ── 0. Create .npmrc for pnpm (Metro needs hoisted modules) ────────────────
if (pm === "pnpm") {
  const npmrcPath = path.join(cwd, ".npmrc");
  const npmrcLine = "node-linker=hoisted";
  if (fs.existsSync(npmrcPath)) {
    const existing = fs.readFileSync(npmrcPath, "utf8");
    if (!existing.includes("node-linker")) {
      fs.appendFileSync(npmrcPath, `\n${npmrcLine}\n`, "utf8");
      console.log(
        "   ✏️  Added node-linker=hoisted to .npmrc (required by Metro)",
      );
      needsReinstall = true;
    }
  } else {
    fs.writeFileSync(npmrcPath, `${npmrcLine}\n`, "utf8");
    console.log(
      "   ✏️  Created .npmrc with node-linker=hoisted (required by Metro)",
    );
    needsReinstall = true;
  }
}

// ── 1. Re-install with hoisted layout (pnpm only) ─────────────────────────
if (needsReinstall) {
  console.log("\n📦 Re-installing with hoisted node_modules...\n");
  try {
    execSync(`${pm} install`, { cwd, stdio: "inherit" });
  } catch {
    console.error("Failed to reinstall. Run `pnpm install` manually.");
  }
}

// ── 2. Install peer dependencies ───────────────────────────────────────────
console.log("\n📦 Installing peer dependencies...\n");
const reactVersion = getInstalledReactVersion();
const reactDomPackage = reactVersion
  ? `react-dom@${reactVersion}`
  : "react-dom";

const peers = [
  "nativewind@^4",
  "babel-preset-expo",
  "tailwindcss@^3",
  "tailwind-variants",
  "tailwind-merge",
  "react-native-reanimated",
  "react-native-worklets",
  "react-native-svg",
  reactDomPackage,
  "react-native-web",
];

try {
  execSync(`${installCmd} ${peers.join(" ")}`, { cwd, stdio: "inherit" });
} catch {
  console.error(
    "Failed to install peer dependencies. You may need to install them manually:",
  );
  console.error(`  ${installCmd} ${peers.join(" ")}`);
}

// ── 3. Create tailwind.config.js ───────────────────────────────────────────
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@wireservers-ui/react-natives/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("@wireservers-ui/react-natives/tailwind-preset")],
};
`;

writeIfMissing("tailwind.config.js", tailwindConfig);

// ── 4. Create global.css ───────────────────────────────────────────────────
const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary-0: 255 255 255;
  --color-primary-50: 238 237 253;
  --color-primary-100: 214 211 249;
  --color-primary-200: 172 166 242;
  --color-primary-300: 132 122 235;
  --color-primary-400: 105 95 233;
  --color-primary-500: 80 70 230;
  --color-primary-600: 63 55 198;
  --color-primary-700: 47 41 163;
  --color-primary-800: 33 29 128;
  --color-primary-900: 22 20 96;
  --color-primary-950: 13 11 64;

  --color-secondary-0: 255 255 255;
  --color-secondary-50: 241 241 243;
  --color-secondary-100: 220 220 224;
  --color-secondary-200: 186 186 194;
  --color-secondary-300: 152 152 163;
  --color-secondary-400: 121 121 137;
  --color-secondary-500: 92 92 112;
  --color-secondary-600: 72 72 92;
  --color-secondary-700: 54 54 72;
  --color-secondary-800: 38 38 54;
  --color-secondary-900: 24 24 38;
  --color-secondary-950: 14 14 24;

  --color-tertiary-50: 250 245 255;
  --color-tertiary-100: 243 232 255;
  --color-tertiary-200: 222 200 252;
  --color-tertiary-300: 196 160 246;
  --color-tertiary-400: 168 120 238;
  --color-tertiary-500: 140 80 228;
  --color-tertiary-600: 114 58 200;
  --color-tertiary-700: 90 40 170;
  --color-tertiary-800: 68 28 138;
  --color-tertiary-900: 48 18 106;
  --color-tertiary-950: 30 8 72;

  --color-error-0: 255 255 255;
  --color-error-50: 254 242 242;
  --color-error-100: 254 226 226;
  --color-error-200: 252 165 165;
  --color-error-300: 248 113 113;
  --color-error-400: 240 82 82;
  --color-error-500: 230 53 53;
  --color-error-600: 204 37 37;
  --color-error-700: 178 24 24;
  --color-error-800: 150 16 16;
  --color-error-900: 122 10 10;
  --color-error-950: 80 5 5;

  --color-success-0: 255 255 255;
  --color-success-50: 237 252 241;
  --color-success-100: 210 245 221;
  --color-success-200: 147 226 172;
  --color-success-300: 96 207 128;
  --color-success-400: 56 189 92;
  --color-success-500: 34 168 66;
  --color-success-600: 24 140 52;
  --color-success-700: 18 112 40;
  --color-success-800: 14 88 32;
  --color-success-900: 10 64 22;
  --color-success-950: 5 40 12;

  --color-warning-0: 255 255 255;
  --color-warning-50: 255 249 235;
  --color-warning-100: 255 240 198;
  --color-warning-200: 252 217 119;
  --color-warning-300: 247 195 56;
  --color-warning-400: 240 176 14;
  --color-warning-500: 220 155 6;
  --color-warning-600: 182 123 4;
  --color-warning-700: 145 96 4;
  --color-warning-800: 112 72 5;
  --color-warning-900: 82 52 6;
  --color-warning-950: 48 30 4;

  --color-info-0: 255 255 255;
  --color-info-50: 240 248 255;
  --color-info-100: 224 240 253;
  --color-info-200: 168 213 248;
  --color-info-300: 110 184 240;
  --color-info-400: 66 158 232;
  --color-info-500: 34 134 220;
  --color-info-600: 22 110 190;
  --color-info-700: 14 88 158;
  --color-info-800: 10 68 126;
  --color-info-900: 6 50 96;
  --color-info-950: 2 32 64;

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
  --color-outline-300: 196 196 196;
  --color-outline-400: 163 163 163;
  --color-outline-500: 140 140 140;
  --color-outline-600: 115 115 115;
  --color-outline-700: 82 82 82;
  --color-outline-800: 51 51 51;
  --color-outline-900: 33 33 33;
  --color-outline-950: 18 18 18;

  --color-background-0: 255 255 255;
  --color-background-50: 249 249 249;
  --color-background-100: 242 242 242;
  --color-background-200: 228 228 228;
  --color-background-300: 212 212 212;
  --color-background-400: 189 189 189;
  --color-background-500: 163 163 163;
  --color-background-600: 115 115 115;
  --color-background-700: 82 82 82;
  --color-background-800: 51 51 51;
  --color-background-900: 33 33 33;
  --color-background-950: 18 18 18;
  --color-background-error: 254 226 226;
  --color-background-warning: 255 243 224;
  --color-background-muted: 245 245 245;
  --color-background-success: 228 247 235;
  --color-background-info: 224 240 253;

  --color-indicator-primary: 80 70 230;
  --color-indicator-info: 34 134 220;
  --color-indicator-error: 230 53 53;
}
`;

writeIfMissing("global.css", globalCss);

// ── 5. Create nativewind-env.d.ts ──────────────────────────────────────────
writeIfMissing(
  "nativewind-env.d.ts",
  '/// <reference types="nativewind/types" />\n',
);

// ── 6. Create/update metro.config.js ───────────────────────────────────────
const metroConfig = `/* eslint-env node */
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enableSymlinks = true;
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

try {
  const wsuiPackagePath = path.dirname(
    require.resolve("@wireservers-ui/react-natives/package.json"),
  );
  config.watchFolders = [...new Set([...(config.watchFolders || []), wsuiPackagePath])];
} catch {
  // No-op if package is not resolvable yet.
}

module.exports = withNativeWind(config, { input: "./global.css" });
`;

writeFile("metro.config.js", metroConfig);

// ── 7. Create/update babel.config.js ───────────────────────────────────────
const babelConfig = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
`;

writeFile("babel.config.js", babelConfig);

// ── 8. Create the demo App.tsx ─────────────────────────────────────────────
const appTsx = `import "./global.css";
import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@wireservers-ui/react-natives";

export default function App() {
  const [volume, setVolume] = useState(50);

  return (
    <View className="flex-1 items-center justify-center bg-background-0 px-8">
      <Text className="text-2xl font-bold text-typography-900 mb-2">
        Volume Control
      </Text>
      <Text className="text-lg text-typography-500 mb-8">
        {volume}%
      </Text>
      <View className="w-full max-w-xs">
        <Slider
          value={volume}
          onValueChange={setVolume}
          min={0}
          max={100}
          size="lg"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </View>
      <Text className="text-sm text-typography-400 mt-6">
        Drag the slider to adjust volume
      </Text>
    </View>
  );
}
`;

writeStarterFile("App.tsx", appTsx);

// ── Done ───────────────────────────────────────────────────────────────────
console.log("\n✅ Setup complete!\n");
console.log("   Created if missing (existing files were preserved):");
console.log("     • tailwind.config.js");
console.log("     • global.css (with theme variables)");
console.log("     • nativewind-env.d.ts");
console.log("     • metro.config.js");
console.log("     • babel.config.js");
console.log("     • App.tsx (volume slider demo)");
console.log("\n   Run your app:\n");
console.log("     npx expo start --clear\n");

// ── Helpers ────────────────────────────────────────────────────────────────
function writeFile(name, content) {
  const filePath = path.join(cwd, name);
  if (fs.existsSync(filePath) && !force) {
    console.log(
      `   ⏭️  ${name} already exists, skipping (use --force to overwrite)`,
    );
    return;
  }

  const action = fs.existsSync(filePath) ? "Updated" : "Created";
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`   ✏️  ${action} ${name}`);
}

function writeIfMissing(name, content) {
  const filePath = path.join(cwd, name);
  if (fs.existsSync(filePath)) {
    console.log(`   ⏭️  ${name} already exists, skipping`);
    return;
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`   ✏️  Created ${name}`);
}

function writeStarterFile(name, content) {
  const filePath = path.join(cwd, name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`   ✏️  Created ${name}`);
    return;
  }

  const existing = fs.readFileSync(filePath, "utf8");
  if (looksLikeDefaultExpoScreen(existing)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`   ✏️  Updated ${name} with WireServers slider demo`);
    return;
  }

  console.log(`   ⏭️  ${name} has custom content, keeping existing file`);
}

function looksLikeDefaultExpoScreen(source) {
  return (
    source.includes("Open up App.tsx") ||
    source.includes("Edit App.tsx") ||
    source.includes("StatusBar")
  );
}
