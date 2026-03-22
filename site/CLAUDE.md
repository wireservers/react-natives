# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expo Router + React Native demo app that showcases `@wireservers-ui/react-natives` components. Also serves as a boilerplate for new apps using the component library.

## Commands

```bash
npm start              # Expo dev server
npm run ios            # iOS simulator
npm run android        # Android emulator
npm run web            # Browser (web export)
npm run build          # Web export build
npm run build:clean    # Clean then build
npm run lint           # ESLint with expo config
npm run reset-project  # Reset to blank template (destructive)
```

## Architecture

- **Routing:** Expo Router with file-based routes. Tabs live under `app/(tabs)/`. Root layout is `app/_layout.tsx`.
- **Theming:** Custom `ThemeProvider` in `context/` wraps the app; `useTheme()` hook exposes light/dark mode. Theme provider is set up in `app/_layout.tsx`.
- **Styling:** NativeWind v4 + Tailwind CSS 3. Config extends `wireservers-ui/packages/react-natives/tailwind-preset.js` — this preset must remain referenced to get the full color token system.
- **Components:** UI comes from `@wireservers-ui/react-natives` (local workspace package). See that package's CLAUDE.md for component patterns and styling details.

## Key Files

- `app/_layout.tsx` — root layout; mounts `ThemeProvider` and tab navigator
- `tailwind.config.js` — extends react-natives preset
- `nativewind-env.d.ts` — `/// <reference types="nativewind/types" />` required for `className` prop support on RN elements
