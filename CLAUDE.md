# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native component library (`@wireservers-ui/react-natives`) with an Expo demo/docs site. Monorepo using **npm workspaces**.

- `packages/react-natives/` — Shared component library (70+ components), ships TypeScript source directly (no build step)
- `demos/expo/` — Expo SDK 54 app (React 19, RN 0.81.5) with Expo Router 6 for file-based routing

## Commands

```bash
# Install dependencies (from root)
npm ci

# Run Expo dev server (web)
npm run web --workspace=demos/expo

# Run on platforms
npm start --workspace=demos/expo     # Expo dev server
npm run android --workspace=demos/expo
npm run ios --workspace=demos/expo

# Build for production (web export)
npm run build                        # Runs expo export --platform web + sitemap generation

# Lint
npm run lint --workspace=demos/expo  # Uses eslint-config-expo (flat config)
```

No test framework is currently configured.

## Architecture

### Monorepo Wiring

- Root `package.json` defines workspaces: `["demos/expo", "packages/*"]`
- Metro config (`demos/expo/metro.config.js`) sets `watchFolders` to monorepo root and `nodeModulesPaths` to resolve from both workspace and root `node_modules`
- Tailwind config (`demos/expo/tailwind.config.js`) scans both app files and `../../packages/react-natives/src/**/*.{ts,tsx}` for class discovery
- Path alias `@/*` maps to `./` in the Expo app (configured in both `tsconfig.json` and `babel.config.js`)

### Styling System

- **NativeWind v4** + **Tailwind CSS 3** for utility classes
- **Tailwind Variants (`tv`)** from `tailwind-variants` for component variant styling
- CSS variables for theming: light/dark color palettes defined in `demos/expo/components/ui/theme-provider/config.ts` as RGB values
- The library provides a Tailwind preset (`packages/react-natives/tailwind-preset.js`) extending `nativewind/preset` with semantic color tokens (primary, secondary, tertiary, error, success, warning, info, etc.) in shades 0–950
- `ThemeProvider` applies CSS variables as inline styles on a root `View`; supports custom theme overrides via `CustomThemeContext`

### Component Patterns

- **Compound components**: root provides context, children consume via hooks (e.g., `ButtonProvider` → `useButtonContext()`)
- All components use `React.forwardRef`
- Both workspaces that use NativeWind need `nativewind-env.d.ts` with `/// <reference types="nativewind/types" />` for `className` prop support

### App Layout

Root layout (`app/_layout.tsx`) nests providers: `ThemeContextProvider` → `CustomThemeProvider` → `AppThemeProvider` → `ThemeProvider` → `ToastProvider` → `Stack`

Tabs layout (`app/(tabs)/_layout.tsx`) defines screens: `index`, `components`, `features`, `theming`

### CI/CD

GitHub Actions deploy to Azure Web Apps. Build uses Node 24.x, `npm ci`, `npm run build`. Artifacts include `server.js`, `package.json`, and `demos/expo/dist/`. Dev branch deploys to `dev-reactnatives`, prod to `reactnatives`.

## Git Branches

- `sot` — main/base branch (source of truth)
- `dev` — development branch
- `prod` — production branch
