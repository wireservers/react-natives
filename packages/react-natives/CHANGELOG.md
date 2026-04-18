# Changelog

All notable changes to `@wireservers-ui/react-natives` are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Versioning: [Semantic Versioning](https://semver.org/)

---

## [2.0.3] - 2026-04-18

### Fixed
- Repository URL updated from `wireservers/wireservers-ui` to `wireservers/react-natives` following GitHub repo rename — resolves 404 on npmjs Release Notes link

### Changed
- CI workflows migrated from `dev`/`prod`/`sot` branch model to `develop`/`main` gitflow
- `babel-preset-expo` added as explicit dependency to resolve peer dependency resolution failures in certain environments
- Docs site Dockerfile and nginx config added for self-hosted deployment

---

## [2.0.2] - 2026-03-21

### Changed
- Promoted `2.0.2-rc.0` to stable `2.0.2` with no additional code changes

---

## [2.0.2-rc.0] - 2026-03-21

### Added
- `init --force` support in `bin/cli.js` for overwriting generated config files when re-initializing existing starter apps

### Fixed
- Expo starter overwrite behavior now replaces default template screens with WireServers slider demo while preserving custom app content
- `init` now ensures `babel-preset-expo` is installed with peer dependencies to avoid runtime Babel preset resolution failures
- Local file-linked package development now works out of the box via Metro symlink-aware config generation in `init` scripts
- Tailwind preset now resolves `nativewind/preset` reliably when the package is consumed via local file links

### Changed
- CLI init guard messaging and setup behavior were hardened for safer project-folder execution

---

## [2.0.1] - 2026-03-16

### Added
- `bin/init.js` is now included in the published npm package (packaging parity with local source)

### Fixed
- Published `@wireservers-ui/react-natives@2.0.0` artifact missed `bin/init.js`; this patch release includes it so CLI initialization helpers are available in installed package contents

### Changed
- README now includes a release note section and direct changelog navigation guidance for npm/GitHub users

---

## [2.0.0] - 2026-03-15

### Added
- `.gitattributes` enforcing LF line endings for all source, script, and config files — prevents CRLF from breaking `npx` on Unix/macOS/Linux on Windows-developed repos
- `engines` field in `package.json` declaring Node.js `>=18.0.0` requirement
- Full `global.css` theme file in README manual setup (Step C) with complete light (`:root`) and dark (`.dark`) token sets for all color groups: `primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`, `typography`, `outline`, `background`, `indicator`
- Collapsible light/dark theme reference blocks in README

### Fixed
- **[Breaking on Unix/macOS/Linux]** `bin/cli.js` had CRLF line endings causing `env: 'bash\r': No such file or directory` and `node\r: No such file or directory` when consumers ran `npx @wireservers-ui/react-natives init` on non-Windows systems

### Changed
- README restructured: easy setup is now the primary path; manual setup is a detailed step-by-step with full file examples
- README `## Theming` section now points to the full `global.css` in manual Step C instead of repeating an abbreviated snippet
- README version badge updated to `v2.0.0`

---

## [1.0.1] - 2026-03-14

### Added
- `bin/cli.js` — CLI init command runnable via `npx @wireservers-ui/react-natives init`
- Automatic peer-dependency installation by `init` (`nativewind`, `tailwindcss`, `tailwind-variants`, `tailwind-merge`, `react-native-reanimated`, `react-native-worklets`, `react-native-svg`, `react-dom`, `react-native-web`)
- `react-dom` version is matched exactly to the consumer's installed `react` version to prevent React/DOM mismatch on web
- pnpm compatibility: `init` creates/updates `.npmrc` with `node-linker=hoisted` when pnpm is detected and triggers a reinstall pass
- Tailwind content path for library source added to generated `tailwind.config.js` (`node_modules/@wireservers-ui/react-natives/src/**`)
- Non-destructive init: all file creation follows skip-if-exists semantics — no consumer file is ever overwritten

### Fixed
- `nativewind/babel` placed in `presets` (not `plugins`) in generated `babel.config.js` — was causing Babel runtime errors and bundle failures
- Missing `react-native-worklets` dependency causing Metro bundler to fail
- Missing `react-native-svg` causing SVG component resolution failures
- Missing `tailwind-merge` causing variant merge errors at runtime

### Changed
- Tailwind class generation now works correctly for library components (colors, slider, etc.) because consumer Tailwind config scans library source

---

## [1.0.0] - 2026-03-01

### Added
- Initial release of `@wireservers-ui/react-natives`
- 70+ React Native components: Accordion, ActionSheet, Alert, AlertDialog, Avatar, Badge, Button, Calendar, Card, Carousel, Checkbox, CircularProgress, ColorPicker, Collapsible, DatePicker, Drawer, Empty, Fab, FormControl, Heading, Icon, IconButton, Image, Input, Kbd, Link, List, Menu, Modal, NumberInput, Overlay, Pagination, PasswordInput, PinInput, Popover, Portal, Pressable, Progress, Radio, Rating, SearchInput, SegmentedControl, Select, Skeleton, Slider, Snackbar, Spinner, Stack, Stat, Stepper, Switch, Table, Tabs, Tag, TagsInput, Text, Textarea, Timeline, Toast, Toggle, ToggleGroup, Tooltip, VisuallyHidden
- NativeWind v4 + Tailwind CSS 3 styling with `tailwind-variants` for type-safe variant APIs
- CSS variable token system for light/dark theming
- `tailwind-preset.js` Tailwind preset for consumers
- TypeScript source ships directly (no build step)
- MIT license
