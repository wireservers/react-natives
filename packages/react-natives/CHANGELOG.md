# Changelog

All notable changes to `@wireservers-ui/react-natives` are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Versioning: [Semantic Versioning](https://semver.org/)

---

## [2.1.0] - 2026-07-19

### Added

- `DataGrid` column pinning: set `pinned: 'left' | 'right'` on a column to freeze it to that edge while the remaining columns scroll horizontally. Grids without any pinned column keep the original single-scroller render path unchanged.
- `DataGrid` server-side data mode: `manualSort` and `manualFilter` stop the grid from reordering/hiding rows itself so a remote data source can own sorting and filtering, while `onSortChange`/`onFiltersChange` keep reporting intent.
- `DataGrid` infinite scroll: `onEndReached` (with `onEndReachedThreshold`) fires as the viewport nears the last row and re-arms once `rowCount` grows, so a single page isn't requested repeatedly.
- `DataGrid` `loading` prop renders a footer activity indicator while more rows are being fetched.
- Exported `computeViewRows`, `toCell`, `formatValue`, `toComparable`, and `compareComparable` so downstream packages can reproduce exactly the rows and cell text the grid is displaying without re-implementing its sort/filter rules.

### Fixed

- `DataGrid` `stickyHeader` now actually does something. The header, group band, and filter row were previously always pinned regardless of the prop; `stickyHeader` (default `true`) now controls it, and `false` lets the header scroll away with the rows.

### Deprecated

- `DataGrid` `windowSize` never had any effect and is now marked deprecated. It is still accepted so existing call sites keep compiling, and will be removed in the next major. Use `overscanRows`, `initialNumToRender`, and `maxToRenderPerBatch` to tune the render window.

---

## [2.0.23] - 2026-07-19

### Fixed

- Reworked `Switch` to render an explicit rounded pill track and thumb so the off-state track remains visible on React Native Web.

---

## [2.0.22] - 2026-07-19

### Fixed

- Updated the README release notes and active-development version references from v2.0.15 to the current starter and `DataGrid` release information.

---

## [2.0.21] - 2026-07-19

### Changed

- Expanded the generated starter `DataGrid` demo to showcase typed columns, grouped headers, sorting, filtering, row selection, column resizing, column reordering, merged cells, editable cells, variable row heights, URI cells, markdown cells, boolean cells, bubble cells, drilldown cells, and custom-rendered theme swatches.

---

## [2.0.20] - 2026-07-19

### Fixed

- Fixed a React development warning from `MenuTrigger` by giving its `forwardRef` render function the required `(props, ref)` signature.

---

## [2.0.19] - 2026-07-19

### Changed

- Removed the logo icon from the generated starter landing page header.
- Updated the starter `DataGrid` example to support multiple row selection with an initially selected row.

---

## [2.0.18] - 2026-07-19

### Fixed

- Updated the generated starter landing page to render actual `@wireservers-ui/react-natives` components, including buttons, badges, cards, form controls, stats, a slider, and a sortable `DataGrid`.
- Updated `init` to install `@wireservers-ui/react-natives` into the target project at the running CLI version so `npx`-based fresh installs have the component package saved locally.

---

## [2.0.17] - 2026-07-19

### Added

- Replaced the generated blank/demo starter screen with a clean branded landing page that includes logo branding, links to docs/npm/GitHub, and example cards for key component areas.

---

## [2.0.16] - 2026-07-19

### Fixed

- Updated `init` dependency installation so Expo-managed web/runtime packages are installed through `expo install`, including `react-dom` and `react-native-web`, keeping generated projects aligned with the active Expo SDK.

---

## [2.0.15] - 2026-07-18

### Added

- `DataGrid` now supports built-in **sorting** (click-to-sort column headers via `sortable` / `column.sortable`, with `sort` / `defaultSort` / `onSortChange` and a `getSortValue` override) and **filtering** (a per-column filter row via `filterable` / `column.filterable`, with `filters` / `defaultFilters` / `onFiltersChange`). The grid orders and filters its own rows; numeric cells sort numerically. Exposed `DataGridSort` and `DataGridSortDirection` types.

---

## [2.0.14] - 2026-07-18

### Fixed

- Replaced `DataGrid`'s internal `VirtualizedList` renderer with explicit viewport row windowing so embedded grids do not render the full dataset inside nested scroll containers.
- Constrained `DataGrid` internal scroll regions to prevent virtual content height from expanding the surrounding page.

---

## [2.0.13] - 2026-07-18

### Fixed

- Improved `DataGrid` default virtualization settings to reduce render pressure during scrolling.
- Updated the docs DataGrid demo to avoid thousands of per-row remote image requests.

---

## [2.0.12] - 2026-07-18

### Added

- Added `DataGrid`, a virtualized spreadsheet-style grid with lazy cell resolution, typed cells, editing, selection, resizing, reordering, variable row heights, merged cells, and custom render hooks.

---

## [2.0.11] - 2026-07-17

### Fixed

- Fixed dark-theme contrast for solid colored action and status controls by using explicit white text on colored fills.

---

## [2.0.10] - 2026-07-17

### Fixed

- Improved Carousel previous/next default chevron contrast in dark themes.

## [2.0.9] - 2026-07-17

### Fixed

- Improved contrast for newly extracted helper components in dark themes by replacing hardcoded light surfaces with theme-aware backgrounds.

## [2.0.8] - 2026-07-17

### Fixed

- Improved ConfirmDialog contrast in dark themes by removing hardcoded light dialog surfaces.

## [2.0.7] - 2026-07-17

### Fixed

- Improved SearchablePicker contrast in dark themes by using theme-aware option row backgrounds and a high-contrast selected row.

## [2.0.6] - 2026-07-17

### Added
- Added reusable app helper components extracted from Bring The Budget: `SearchablePicker`, `EmojiPicker`, `SelectionBar`, `DrawerShell`, `FormDrawer`, `DrawerCard`, `DrawerSectionLabel`, `FormWizard`, `useFormWizardState`, `ConfirmDialog`, `useConfirm`, `FieldReconciler`, and `ViewToggle`.
- Helper components compose existing react-natives primitives for common app workflows including searchable picking, bulk selection actions, form drawers, multi-step forms, confirmations, and candidate-value reconciliation.

---

## [2.0.4] - 2026-07-02

### Added
- `Select` now supports multi-select state with `isMulti`, `selectedValues`, `defaultValues`, `onValuesChange`, and configurable close-on-select behavior.
- `SelectSearchInput` filters dropdown items using built-in text matching or a custom `filterOption` callback.
- `SelectSelectedBadges` renders selected values as removable badges with class overrides, `maxVisible`, overflow labels, and custom badge rendering.

### Changed
- `SelectItem` toggles selected values in multi-select mode and preserves single-select behavior by default.
- `SelectInput` now uses the root `Select` placeholder when no local placeholder override is provided.

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
