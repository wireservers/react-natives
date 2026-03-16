# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Standalone React Native component library published as `@wireservers-ui/react-natives`. Ships TypeScript source directly (no build step). 70+ components styled with NativeWind and Tailwind Variants.

## Project Structure

- `src/` — TypeScript component source (ships as-is)
- `tailwind-preset.js` — Tailwind CSS preset consumers use to get the full color/theme system
- `package.json` — npm package definition

## Commands

```bash
# Install dependencies
npm install
```

No build step — the library ships TypeScript source. No test framework is currently configured.

## Styling System

- **NativeWind v4** + **Tailwind CSS 3** for utility classes
- **Tailwind Variants (`tv`)** from `tailwind-variants` for component variant styling
- CSS variables for theming with semantic color tokens (primary, secondary, tertiary, error, success, warning, info, etc.) in shades 0–950
- The library provides a Tailwind preset (`tailwind-preset.js`) extending `nativewind/preset`

## Component Patterns

- **Compound components**: root provides context, children consume via hooks (e.g., `ButtonProvider` → `useButtonContext()`)
- All components use `React.forwardRef`
- Consumers need `nativewind-env.d.ts` with `/// <reference types="nativewind/types" />` for `className` prop support

## Peer Dependencies

- `react`, `react-native`, `nativewind`, `tailwind-variants`
- `react-native-svg` (optional — only used by color-picker)

## Git Branches

- `sot` — main/base branch (source of truth)
- `dev` — development branch
- `prod` — production branch
