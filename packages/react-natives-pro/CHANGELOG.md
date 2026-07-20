# Changelog

All notable changes to `@wireservers-ui/react-natives-pro` are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Versioning: [Semantic Versioning](https://semver.org/)

---

## [0.1.0] - 2026-07-19

Initial release.

### Added

- **Licensing** — `setLicenseKey`, `getLicenseStatus`, `isLicensed`, `verifyLicenseKey`. Keys are Ed25519-signed and verified **fully offline** against a public key embedded in the package, so an app carrying a license has no runtime dependency on WireServers infrastructure. An absent or invalid key never disables anything: components stay functional and render an "unlicensed" watermark, and one warning is logged.
- **`DataGridPro`** — the base `DataGrid` plus a CSV export toolbar, column pinning, and server-side data pass-through. Owns sort/filter state so an export always matches what the user is looking at.
- **Excel export** — `buildXlsx` writes a real `.xlsx` workbook with numeric cells, so totals and formulas work in Excel rather than arriving as text. The writer is dependency-free: an `.xlsx` is a ZIP of XML parts, built directly rather than adding a ~1 MB spreadsheet library to a mobile bundle. Verified against the system `unzip` and an independent XML parser.
- **CSV export** — `buildCsv` / `escapeCsvField`, RFC 4180 quoting with a CSV-injection guard on fields starting `=`, `+`, `-`, or `@`. Web downloads carry a UTF-8 BOM so Excel renders non-ASCII correctly; native callers supply `onExportCsv`.
- **`Scheduler`** — week/day time grid with drag-to-create, drag-to-move, and edge resize, with 15-minute snapping, window clamping, and side-by-side layout for overlapping events. Verified with real mouse drags in a headless browser.
- **`DateRangePicker`** — dual-month range calendar with preset shortcuts, min/max bounds, and configurable week start. Selecting backwards swaps the ends rather than rejecting the tap.
- **Date utilities** — `addMonths`, `buildMonthGrid`, `daysBetween`, `selectDate`, and friends, exported for reuse. Month-end clamping, leap years, and DST boundaries are covered by tests.
- **Charts** — `LineChart`, `AreaChart`, `BarChart` (grouped and stacked), `DonutChart`, `Sparkline`, and `StatTile`, drawn with `react-native-svg` as an **optional** peer dependency, so consumers who don't chart never install it. The geometry (`plotArea`, `scaleX`/`scaleY`, `linePath`, `yTicks`, `donutArcs`, `nearestIndex`) is exported for building chart types we don't ship. Axis ticks follow a nice-number ladder, so a 0–100 axis yields 0/25/50/75/100 instead of fractional ticks.
- **`Combobox`** — autocomplete with async `loadOptions`, multi-select chips, and create-on-the-fly. Async searches are debounced and guarded by request id, so a slow early response can't overwrite a later keystroke's results.
- **`CommandPalette`** — ⌘K/Ctrl-K fuzzy command search with grouping and arrow-key navigation. Groups appear where their best match ranked, keeping the closest result at the top rather than burying it under a fixed section order.
- **Fuzzy search** — `fuzzyMatch`, `rankItems`, `highlightSegments`, `moveActiveIndex`, scoring consecutive runs and word-boundary hits above scattered matches.
- **`FormBuilder`** — schema-driven forms with per-field rules, conditional `showIf` visibility, and a multi-step wizard. A hidden field never blocks submission, step validation is scoped to the current step, fully-hidden steps are skipped, and `onSubmit` receives values with hidden-branch data pruned.
- **`FileUpload`** — drag-and-drop dropzone with per-file progress, image previews, retry, and accept/size/count/dedupe rules. Real HTML5 drag-and-drop on web, `onPickFiles` on native, both feeding one queue so the rules behave identically. One oversized file in a multi-file drop is reported and skipped rather than failing the whole drop. Overall progress is byte-weighted.
- **`Kanban`** — drag-and-drop board with WIP limits. Moves are immutable so an optimistic drag can be rolled back; a column at its limit refuses incoming cards but still allows reordering within itself.
- **`ProductTour`** — spotlight onboarding coachmarks with `useTourAnchor`. Targets are re-measured each step so a tour survives layout shifts and rotation; the tooltip flips away from an edge that can't fit it, then clamps into the viewport, and the arrow keeps pointing at the target after the clamp. Disabled steps are skipped and excluded from the "3 of 7" counter.
- **`RichTextEditor`** — Markdown-backed editor with a formatting toolbar and live preview. React Native has no `contentEditable`, so this edits Markdown source in a `TextInput` rather than emulating a document model — identical behaviour on all three platforms, and portable content for the user. Formatting ships as pure `(text, selection) → { text, selection }` transforms (`toggleInline`, `toggleBlock`, `insertLink`, `continueList`, `parseMarkdown`), so cursor placement is tested rather than assumed.

### Notes

- The unlicensed watermark sits **bottom-left**. Both right-hand corners are occupied across the library — toolbars top-right, form and wizard actions bottom-right — and a badge in either lands on top of a control. The nag is meant to be seen, not to make a component look broken to someone evaluating it. It is `pointerEvents: none` throughout, so it never intercepts a touch.

### Requires

- `@wireservers-ui/react-natives` >= 2.1.0, which adds the `computeViewRows` helper this package's export builds on, plus column pinning and server-side support in the base grid.
