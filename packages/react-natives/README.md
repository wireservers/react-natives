# React-Natives

**A comprehensive React Native component library built with NativeWind and Tailwind Variants.**

> **Note:** This project is in active development (v2.0.1). We're building out components, documentation, and tooling. Contributions and feedback are welcome!

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@wireservers-ui/react-natives.svg)](https://www.npmjs.com/package/@wireservers-ui/react-natives)

---

## Release Notes (v2.0.1)

### What was updated

- Published package contents now include `bin/init.js` (packaging parity fix)
- This ensures the installed npm artifact contains the same CLI helper file expected by local package contents

### Changelog

- Full changelog is included in the package at `CHANGELOG.md`
- GitHub: https://github.com/wireservers/wireservers-ui/blob/dev/packages/react-natives/CHANGELOG.md
- npm package page: open the `CHANGELOG.md` file from the package contents/files list

---

## What is React-Natives?

React-Natives is a collection of 70+ production-ready, accessible React Native components. Every component is TypeScript-first, themeable via CSS variables, and styled with NativeWind (Tailwind CSS for React Native).

**Live Demo:** [www.reactnatives.dev](https://www.reactnatives.dev)

### Key Features

- **70+ Components** — Buttons, forms, modals, tables, calendars, color pickers, and more
- **TypeScript First** — Fully typed with excellent IDE autocomplete
- **NativeWind + Tailwind Variants** — Utility-first styling with type-safe variant APIs
- **Themeable** — CSS variable-based color system with light/dark mode support
- **Accessible** — Built with accessibility in mind
- **Cross Platform** — iOS, Android, and Web via React Native

### Tech Stack

| Layer | Technology |
| --- | --- |
| Components | React Native |
| Styling | NativeWind v4, Tailwind CSS 3, Tailwind Variants |
| Types | TypeScript |

---

## Setup

### 1. Easy Setup (Recommended)

Use this for the fastest first-time setup in a new Expo app.

```bash
mkdir -p demos/react-natives
npx create-expo-app@latest demos/react-natives/project --template blank-typescript
cd demos/react-natives/project
npm install @wireservers-ui/react-natives@2.0.1
npx @wireservers-ui/react-natives@2.0.1 init
npm exec expo -- start --clear --web
```

This sequence keeps all generated files inside `demos/react-natives/project`.
No setup files are written outside the generated project folder when run exactly as above.

If `npm exec` prompts to install `expo`, answer `y`.

If you hit npm cache errors like `ENOTEMPTY` or `EACCES` while running the command above, run:

```bash
sudo chown -R "$(id -u):$(id -g)" ~/.npm
```

Then retry:

```bash
npm exec expo -- start --clear --web
```

### Folder Safety Rule

Always run the init command from inside your generated project folder:

```bash
cd demos/react-natives/project
npx @wireservers-ui/react-natives@2.0.1 init
```

Do not run `init` from the repository root.

What `init` does for you:

- Installs required runtime dependencies
- Matches `react-dom` exactly to your installed `react` version
- Creates setup files only if missing
- Never overwrites existing files in your project

### 2. Manual Setup (Detailed)

Use this path if you want full control over every file.

#### Step A: Install packages

```bash
npm install @wireservers-ui/react-natives@2.0.1
npm install nativewind babel-preset-expo tailwindcss tailwind-variants tailwind-merge react-native-reanimated react-native-worklets react-native-svg react-native-web react-dom
```

Important:

- Ensure `react-dom` matches your `react` version exactly.
- Example: if `react` is `19.2.0`, use `react-dom@19.2.0`.

#### Step B: Create or update `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@wireservers-ui/react-natives/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("@wireservers-ui/react-natives/tailwind-preset")],
};
```

#### Step C: Create `global.css`

GitHub README does not support real tabs, so the sections below use collapsible blocks (tab-like) for Light and Dark theme tokens.

Use this full file content in `global.css`:

```css
@tailwind base;
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

.dark {
  --color-primary-0: 13 11 64;
  --color-primary-50: 22 20 96;
  --color-primary-100: 33 29 128;
  --color-primary-200: 47 41 163;
  --color-primary-300: 63 55 198;
  --color-primary-400: 80 70 230;
  --color-primary-500: 105 95 233;
  --color-primary-600: 132 122 235;
  --color-primary-700: 172 166 242;
  --color-primary-800: 214 211 249;
  --color-primary-900: 238 237 253;
  --color-primary-950: 255 255 255;

  --color-secondary-0: 14 14 24;
  --color-secondary-50: 24 24 38;
  --color-secondary-100: 38 38 54;
  --color-secondary-200: 54 54 72;
  --color-secondary-300: 72 72 92;
  --color-secondary-400: 92 92 112;
  --color-secondary-500: 121 121 137;
  --color-secondary-600: 152 152 163;
  --color-secondary-700: 186 186 194;
  --color-secondary-800: 220 220 224;
  --color-secondary-900: 241 241 243;
  --color-secondary-950: 255 255 255;

  --color-tertiary-50: 30 8 72;
  --color-tertiary-100: 48 18 106;
  --color-tertiary-200: 68 28 138;
  --color-tertiary-300: 90 40 170;
  --color-tertiary-400: 114 58 200;
  --color-tertiary-500: 140 80 228;
  --color-tertiary-600: 168 120 238;
  --color-tertiary-700: 196 160 246;
  --color-tertiary-800: 222 200 252;
  --color-tertiary-900: 243 232 255;
  --color-tertiary-950: 250 245 255;

  --color-error-0: 80 5 5;
  --color-error-50: 122 10 10;
  --color-error-100: 150 16 16;
  --color-error-200: 178 24 24;
  --color-error-300: 204 37 37;
  --color-error-400: 230 53 53;
  --color-error-500: 240 82 82;
  --color-error-600: 248 113 113;
  --color-error-700: 252 165 165;
  --color-error-800: 254 226 226;
  --color-error-900: 254 242 242;
  --color-error-950: 255 255 255;

  --color-success-0: 5 40 12;
  --color-success-50: 10 64 22;
  --color-success-100: 14 88 32;
  --color-success-200: 18 112 40;
  --color-success-300: 24 140 52;
  --color-success-400: 34 168 66;
  --color-success-500: 56 189 92;
  --color-success-600: 96 207 128;
  --color-success-700: 147 226 172;
  --color-success-800: 210 245 221;
  --color-success-900: 237 252 241;
  --color-success-950: 255 255 255;

  --color-warning-0: 48 30 4;
  --color-warning-50: 82 52 6;
  --color-warning-100: 112 72 5;
  --color-warning-200: 145 96 4;
  --color-warning-300: 182 123 4;
  --color-warning-400: 220 155 6;
  --color-warning-500: 240 176 14;
  --color-warning-600: 247 195 56;
  --color-warning-700: 252 217 119;
  --color-warning-800: 255 240 198;
  --color-warning-900: 255 249 235;
  --color-warning-950: 255 255 255;

  --color-info-0: 2 32 64;
  --color-info-50: 6 50 96;
  --color-info-100: 10 68 126;
  --color-info-200: 14 88 158;
  --color-info-300: 22 110 190;
  --color-info-400: 34 134 220;
  --color-info-500: 66 158 232;
  --color-info-600: 110 184 240;
  --color-info-700: 168 213 248;
  --color-info-800: 224 240 253;
  --color-info-900: 240 248 255;
  --color-info-950: 255 255 255;

  --color-typography-0: 10 10 10;
  --color-typography-50: 23 23 23;
  --color-typography-100: 38 38 38;
  --color-typography-200: 64 64 64;
  --color-typography-300: 82 82 82;
  --color-typography-400: 115 115 115;
  --color-typography-500: 140 140 140;
  --color-typography-600: 163 163 163;
  --color-typography-700: 212 212 212;
  --color-typography-800: 229 229 229;
  --color-typography-900: 245 245 245;
  --color-typography-950: 255 255 255;

  --color-outline-0: 18 18 18;
  --color-outline-50: 33 33 33;
  --color-outline-100: 51 51 51;
  --color-outline-200: 82 82 82;
  --color-outline-300: 115 115 115;
  --color-outline-400: 140 140 140;
  --color-outline-500: 163 163 163;
  --color-outline-600: 196 196 196;
  --color-outline-700: 212 212 212;
  --color-outline-800: 229 229 229;
  --color-outline-900: 245 245 245;
  --color-outline-950: 255 255 255;

  --color-background-0: 24 23 25;
  --color-background-50: 38 38 40;
  --color-background-100: 51 51 53;
  --color-background-200: 66 66 68;
  --color-background-300: 82 82 85;
  --color-background-400: 104 104 108;
  --color-background-500: 130 130 135;
  --color-background-600: 163 163 169;
  --color-background-700: 196 196 201;
  --color-background-800: 221 221 226;
  --color-background-900: 240 240 245;
  --color-background-950: 255 255 255;
  --color-background-error: 80 5 5;
  --color-background-warning: 48 30 4;
  --color-background-muted: 38 38 40;
  --color-background-success: 5 40 12;
  --color-background-info: 2 32 64;

  --color-indicator-primary: 132 122 235;
  --color-indicator-info: 66 158 232;
  --color-indicator-error: 240 82 82;
}
```

Optional tab-like reference blocks (same values split by mode):

<details>
<summary>Light Theme Tokens (:root)</summary>

```css
/* Use the :root block from the full file above */
```

</details>

<details>
<summary>Dark Theme Tokens (.dark)</summary>

```css
/* Use the .dark block from the full file above */
```

</details>

#### Step D: Create or update `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

#### Step E: Create or update `metro.config.js`

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

#### Step F: Add NativeWind types file `nativewind-env.d.ts`

```ts
/// <reference types="nativewind/types" />
```

#### Step G: Import `global.css` in your app entry

Example `App.tsx`:

```tsx
import "./global.css";
import React from "react";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background-0">
      <Text className="text-typography-900">React-Natives ready</Text>
    </View>
  );
}
```

#### Step H: Optional pnpm compatibility (`.npmrc`)

If you use pnpm with Expo/Metro, add:

```ini
node-linker=hoisted
```

Then run:

```bash
pnpm install
```

#### Step I: Start the app

```bash
npx expo start --clear --web
```

---

## Example Usage

```tsx
import { Button, ButtonText, Card, CardHeader, CardBody } from "@wireservers-ui/react-natives";

export default function App() {
  return (
    <Card>
      <CardHeader>
        <Text variant="h2">Welcome</Text>
      </CardHeader>
      <CardBody>
        <Button action="primary" variant="solid" size="md">
          <ButtonText>Get Started</ButtonText>
        </Button>
      </CardBody>
    </Card>
  );
}
```

---

## Components

### Core Primitives

Text, Heading, Icon, Divider, Badge, Spinner, Image, Avatar, Card, Button, Kbd, Code, Blockquote

### Form Controls

Input, Textarea, Switch, Checkbox, Radio, Slider, Select, FormControl, NumberInput, PasswordInput, SearchInput, Rating, TagsInput, DatePicker, PinInput, ColorPicker

### Feedback & Overlay

Alert, Progress, CircularProgress, Modal, Toast, Tooltip, Drawer, ActionSheet, AlertDialog, Popover, Snackbar, Overlay

### Navigation & Disclosure

Tabs, Accordion, Breadcrumb, Menu, Pagination, Stepper, SegmentedControl, Fab, Link

### Data Display

Tag, Skeleton, Empty, Stat, Table, List, Timeline, Carousel

### Layout

Box, Stack (VStack, HStack), Center, AspectRatio, Container, Pressable, Portal, VisuallyHidden

### Interactive

Toggle, ToggleGroup, Collapsible, Calendar

---

## Theming

Components use CSS variables for theming.

For the complete theming file (full `:root` + `.dark` token sets), use the manual setup instructions in **Step C: Create `global.css`** above.

Token groups include `primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`, `typography`, `outline`, `background`, and `indicator`.

---

## Repository Structure

```text
react-natives/
├── src/                     # TypeScript source — ships as-is (no build step)
├── tailwind-preset.js       # Tailwind CSS preset for consumers
├── tsconfig.json
└── package.json             # npm package definition
```

## Development

### Prerequisites

- Node.js 18+

### Setup

```bash
# Clone the repository
git clone https://github.com/wireservers/wireservers-ui.git
cd wireservers-ui/packages/react-natives

# Install dependencies
npm install
```

No build step — the library ships TypeScript source directly.

### Branches

| Branch | Purpose |
| --- | --- |
| `sot` | Source of truth (main) |
| `dev` | Development |
| `prod` | Production |

---

## Roadmap

This project just started — here's what's ahead:

- [ ] Comprehensive documentation for every component
- [ ] Prop tables and interactive examples
- [ ] CLI scaffolding tool (`npx create-react-natives`)
- [ ] More theme presets (Material, iOS native, etc.)
- [ ] Component testing suite
- [ ] Storybook integration
- [ ] Animation presets with Reanimated

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

We're in the early stages and welcome contributions of all kinds — bug reports, component requests, documentation improvements, and code contributions.

## License

[MIT](LICENSE) — Copyright (c) 2026 Wireservers
