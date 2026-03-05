# React-Natives

**A comprehensive React Native component library built with NativeWind and Tailwind Variants.**

> **Note:** This project is in early development (v0.1.0). We're actively building out components, documentation, and tooling. Expect breaking changes as we iterate toward a stable release. Contributions and feedback are welcome!

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@wireservers-ui/react-natives.svg)](https://www.npmjs.com/package/@wireservers-ui/react-natives)

---

## What is React-Natives?

React-Natives is a collection of 70+ production-ready, accessible React Native components. Every component is TypeScript-first, themeable via CSS variables, and styled with NativeWind (Tailwind CSS for React Native).

**Live Demo:** [reactnatives.azurewebsites.net](https://reactnatives.azurewebsites.net)

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
| Components | React Native 0.81, React 19 |
| Styling | NativeWind v4, Tailwind CSS 3, Tailwind Variants |
| Types | TypeScript 5.9 |
| Dev Platform | Expo SDK 54 |
| Monorepo | pnpm workspaces |

---

## Quick Start

### Install

```bash
npm install @wireservers-ui/react-natives
```

### Peer Dependencies

```bash
npm install nativewind tailwind-variants react-native-reanimated react-native-gesture-handler react-native-svg
```

`react-native-reanimated`, `react-native-gesture-handler`, and `react-native-svg` are optional — only required by components that use them.

### Configure Tailwind

Add the preset to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    // ...your content paths
  ],
  presets: [require("@wireservers-ui/react-natives/tailwind-preset")],
};
```

The preset includes the NativeWind preset, the full color/theme system, content scanning of the library, and safelist rules — no additional configuration needed.

### Use Components

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

Components use CSS variables for theming. Define them in your global CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary-500: 80 70 230;
  --color-background-0: 255 255 255;
  --color-typography-900: 23 23 23;
  /* ... */
}

.dark {
  --color-primary-500: 120 110 255;
  --color-background-0: 24 23 25;
  --color-typography-900: 245 245 245;
  /* ... */
}
```

The color system includes semantic scales (`primary`, `secondary`, `error`, `success`, `warning`, `info`) each with shades from 0–950, plus `typography`, `outline`, `background`, and `indicator` tokens.

---

## Repository Structure

```text
wireservers-ui/
├── packages/
│   └── react-natives/       # Component library (@wireservers-ui/react-natives)
│       ├── src/              # TypeScript source — ships as-is (no build step)
│       ├── tailwind-preset.js
│       └── package.json
├── demos/
│   └── expo/                 # Demo & documentation site (Expo SDK 54)
│       ├── app/              # Expo Router file-based routes
│       ├── components/       # Demo-specific UI
│       ├── lib/              # Component registry & utilities
│       ├── tailwind.config.js
│       └── metro.config.js
├── server.js                 # Static file server for deployment
└── package.json              # pnpm workspace root
```

## Development

### Prerequisites

- Node.js 24+
- pnpm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/wireservers/wireservers-ui.git
cd wireservers-ui

# Install dependencies
pnpm install

# Start the demo app
cd demos/expo
npx expo start
```

### Scripts

| Command | Description |
| --- | --- |
| `pnpm build` | Build the demo/docs site for production |
| `pnpm start` | Start the production server |
| `cd demos/expo && npx expo start` | Start the Expo dev server |
| `cd demos/expo && npx expo start --web` | Start the web dev server |

### Branches

| Branch | Purpose |
| --- | --- |
| `sot` | Source of truth (main) |
| `dev` | Development — deploys to [dev-reactnatives.azurewebsites.net](https://dev-reactnatives.azurewebsites.net) |
| `prod` | Production — deploys to [reactnatives.azurewebsites.net](https://reactnatives.azurewebsites.net) |

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
