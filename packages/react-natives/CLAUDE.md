# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Standalone React Native component library published to npm as `@wireservers-ui/react-natives`. Ships TypeScript source directly — there is no build step and `package.json` has no scripts. 70+ components styled with NativeWind v4 and Tailwind Variants.

Repo layout context (the library lives two levels deep):

- `packages/react-natives/` (this repo root) — monorepo-ish workspace
  - `packages/react-natives/` — **this package** (the published library)
  - `demos/react-natives/wsui/` — Expo demo consuming the library
  - `site/` — Expo Router docs site that also consumes the library

## What ships to npm

`package.json` → `files`: `src`, `tailwind-preset.js`, `bin`, `CHANGELOG.md`. `main` and `types` both point at `src/index.ts`. Any changes outside those paths won't reach consumers.

## The `init` CLI

`bin/cli.js` is exposed as the `react-natives` bin and is the library's primary onboarding path (`npx react-natives init` inside an Expo app). It:

- Refuses to run unless the cwd's `package.json` has `expo`, `expo-router`, or `react-native` as a dep (guards against running at repo root).
- Detects pm from lockfile (`pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lockb` → bun, else npm).
- For pnpm, writes `.npmrc` with `node-linker=hoisted` (Metro requires hoisted modules) and re-installs.
- Pins `react-dom` to the exact installed `react` version — version skew here breaks web builds.
- Scaffolds `tailwind.config.js`, `global.css` (with full light-theme token set), `nativewind-env.d.ts`, `metro.config.js`, `babel.config.js`, and `App.tsx` demo. `--force` overwrites generated configs.
- `App.tsx` is only overwritten if it still looks like a default Expo template (heuristic in `looksLikeDefaultExpoScreen`).

When editing the CLI, note that the `global.css` template is **duplicated** in the README's manual-setup section — keep both in sync, or they'll drift.

## Styling System

- **NativeWind v4** + **Tailwind CSS 3** (not v4 — the preset and `@tailwind` directives target v3).
- **Tailwind Variants (`tv`)** from `tailwind-variants` for variant styling; variants live in each component's `styles.ts`.
- Theming is CSS variables (`--color-{group}-{shade}`) with groups `primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`, `typography`, `outline`, `background`, `indicator`. Shades 0–950. `.dark` class inverts.
- `tailwind-preset.js` extends `nativewind/preset` and wires the CSS-variable → Tailwind color mapping. Consumers must list it under `presets` and include `./node_modules/@wireservers-ui/react-natives/src/**/*` in `content` so Tailwind scans library source.

## Component Patterns

Most complex components follow this shape (see `src/button/` for the canonical example):

- `component-name/` folder with `index.ts`, `types.ts`, `styles.ts`, plus one `.tsx` per subcomponent.
- Root component creates context via `createComponentContext('Name')` from `src/utils/create-context.ts` — returns `[Provider, useContext]` where the hook throws if used outside the provider.
- Compound children (e.g. `ButtonText`, `ButtonIcon`) consume parent state via the hook so styling stays in sync with the root's `variant`/`size`/`action`.
- All components use `React.forwardRef` and set `displayName`.
- Props merge classes via `tv()`'s `class:` slot: `buttonStyle({ variant, size, action, class: className })`.

Consumer apps need `nativewind-env.d.ts` with `/// <reference types="nativewind/types" />` for `className` prop typing on RN primitives.

## Peer Dependencies

Required: `react` ≥18, `react-native` ≥0.72, `nativewind` ≥4, `tailwind-variants` ≥0.1. Optional: `react-native-svg` (only `color-picker` uses it — declared optional in `peerDependenciesMeta`).

## Git Branches (as of v2.0.3)

`develop` and `main` (gitflow). The old `sot`/`dev`/`prod` model was retired in 2.0.3 — CI workflows were migrated. Target `develop` for PRs.

## Versioning

- `package.json` `version`, `CHANGELOG.md`, and the README's "Release Notes" block all reference the version — update all three together.
- `.tgz` artifacts in the package root (e.g. `wireservers-ui-react-natives-2.0.1.tgz`) are historical publish outputs; don't commit new ones.
