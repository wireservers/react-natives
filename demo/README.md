# RNP Web App Boilerplate

A production-ready Expo + React Native boilerplate for building cross-platform apps (iOS, Android, and Web) with a modern UI foundation.

This template combines:

- **Expo Router** for file-based navigation
- **React Native Paper** and **Gluestack UI** for component ecosystems
- **NativeWind + Tailwind CSS tokens** for utility-first styling and theming
- **TypeScript** for safer app development

## What this boilerplate includes

- Universal app setup with Expo SDK 54 and React 19
- File-based routing with tab navigation and modal support
- Light/Dark mode wiring across navigation + UI providers
- Shared theme primitives in `global.css`, `tailwind.config.js`, and Gluestack config
- Reusable starter components and hooks for common UI patterns
- Linting support with Expo ESLint config

## Tech stack

- `expo` / `react-native`
- `expo-router`
- `nativewind` + `tailwindcss`
- `@gluestack-ui/core`
- `react-native-paper`
- `typescript`

## Project structure

```text
app/
  _layout.tsx              # Root providers + stack navigation
  modal.tsx                # Example modal screen
  (tabs)/
    _layout.tsx            # Bottom tabs configuration
    index.tsx              # Home tab screen
    explore.tsx            # Explore tab screen

components/
  ui/                      # UI primitives and provider wrappers
  themed-*.tsx             # Theme-aware text/view components
  parallax-scroll-view.tsx # Example feature component

constants/
  theme.ts                 # Shared color constants

hooks/
  use-color-scheme*.ts     # Platform color scheme helpers
  use-theme-color.ts       # Theme value resolver

assets/images/             # App icons, splash, and static imagery

global.css                 # Global NativeWind/Tailwind styles
tailwind.config.js         # Tailwind + design token mapping
app.json                   # Expo app configuration
```

## Prerequisites

- Node.js 18+
- npm 9+
- Xcode (for iOS simulator on macOS)
- Android Studio (for Android emulator)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run start
   ```

3. Run on a target platform:

   ```bash
   npm run ios
   npm run android
   npm run web
   ```

## Available scripts

- `npm run start` – start Expo dev server
- `npm run ios` – open iOS simulator build
- `npm run android` – open Android emulator build
- `npm run web` – run in browser
- `npm run lint` – run lint checks
- `npm run reset-project` – reset starter app scaffold

## Architecture notes

### Navigation

- Root layout in `app/_layout.tsx` composes providers and stack screens.
- Tabs are configured in `app/(tabs)/_layout.tsx`.
- `modal.tsx` demonstrates modal presentation from the root stack.

### Theming

- Color scheme is read via `hooks/use-color-scheme.ts`.
- `GluestackUIProvider` receives `light` / `dark` mode at the root.
- Tailwind token mapping is defined in `tailwind.config.js`.
- CSS variable token values are defined in `components/ui/gluestack-ui-provider/config.ts`.

### UI libraries

- **Gluestack UI** handles design-token driven primitives.
- **React Native Paper** is enabled globally for additional component usage.
- **NativeWind** enables utility class styling in React Native and Web.

## Customization guide

### 1) App metadata

Update `app.json` for:

- App name/slug
- Bundle identifiers/package names
- Icons and splash assets
- URL scheme

### 2) Theme and branding

Update:

- `components/ui/gluestack-ui-provider/config.ts` for token values
- `tailwind.config.js` for token-to-class mapping
- `constants/theme.ts` for app-level color constants

### 3) Navigation and screens

- Add screens by creating files under `app/`.
- Add/remove tabs in `app/(tabs)/_layout.tsx`.
- Add stack routes in `app/_layout.tsx`.

### 4) Shared components

- Put reusable UI pieces in `components/`.
- Keep app-specific business features close to route screens or feature folders.

## Build and deployment notes

- Web output is configured as `static` in `app.json`.
- For production app delivery, use EAS Build/Submit and set up environment-specific configs.
- Keep secrets out of source; use secure runtime config patterns.

## Linting and quality

Run:

```bash
npm run lint
```

## Useful references

- [Expo docs](https://docs.expo.dev/)
- [Expo Router docs](https://docs.expo.dev/router/introduction/)
- [React Native docs](https://reactnative.dev/)
- [NativeWind docs](https://www.nativewind.dev/)
- [Gluestack UI docs](https://gluestack.io/ui/docs/home/overview/introduction)

---

If you are using this as a starter template, clone it and start by customizing `app.json`, theme tokens, and your first route in `app/(tabs)/index.tsx`.
