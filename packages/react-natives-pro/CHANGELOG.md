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
- **`DateRangePicker`** — dual-month range calendar with preset shortcuts, min/max bounds, and configurable week start. Selecting backwards swaps the ends rather than rejecting the tap.
- **Date utilities** — `addMonths`, `buildMonthGrid`, `daysBetween`, `selectDate`, and friends, exported for reuse. Month-end clamping, leap years, and DST boundaries are covered by tests.

### Requires

- `@wireservers-ui/react-natives` >= 2.1.0, which adds the `computeViewRows` helper this package's export builds on, plus column pinning and server-side support in the base grid.
