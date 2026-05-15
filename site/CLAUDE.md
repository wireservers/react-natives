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

## Auth (Microsoft Entra ID via MSAL)

**Web-only.** Native builds compile and run but auth is a no-op (returns unauthenticated). All auth state flows through `useAuth()` from [lib/auth-context.tsx](lib/auth-context.tsx).

- **Config** — [lib/msal-config.ts](lib/msal-config.ts) reads `EXPO_PUBLIC_MSAL_*` vars. Type-only imports from `@azure/msal-browser` so this file is safe on native.
- **Platform split** — [lib/auth-context.tsx](lib/auth-context.tsx) is the native stub (no-op `signIn`/`signOut`, `user: null`); [lib/auth-context.web.tsx](lib/auth-context.web.tsx) is the real MSAL impl. Metro picks `.web.tsx` on web automatically. **Same convention as `hooks/use-color-scheme.{ts,web.ts}`.**
- **Provider tree** — `AuthProvider` is the outermost wrapper in [app/_layout.tsx](app/_layout.tsx) (above theme providers).
- **Header UI** — [components/user-avatar.tsx](components/user-avatar.tsx) shows a "Sign in" pill when logged out and an initials avatar with a dropdown (name/email/Account/Sign out) when logged in. Mounted in [components/header.tsx](components/header.tsx).
- **Login page** — [app/(tabs)/login.tsx](app/(tabs)/login.tsx). Accepts `?redirect=/path` query param to bounce back after auth. Falls back to home.
- **Protected route example** — [app/(tabs)/account.tsx](app/(tabs)/account.tsx) uses an inline guard: `if (!isLoading && !isAuthenticated) router.replace('/login?redirect=/account')`. Replicate this pattern for any new protected screen — there's no central guard.

### Env vars

Copy `.env.example` to `.env` and fill in the Wireservers Entra app registration values. Vars **must** be prefixed `EXPO_PUBLIC_` to reach the browser bundle. The redirect URI must be registered as a **SPA** redirect URI in the app registration (not Web).

If `EXPO_PUBLIC_MSAL_CLIENT_ID` is empty, `useAuth().isConfigured` is `false` — the login button shows a warning instead of attempting a redirect.
