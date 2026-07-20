# @wireservers-ui/react-natives-pro

Premium components for [`@wireservers-ui/react-natives`](https://www.npmjs.com/package/@wireservers-ui/react-natives) — a real data grid and a proper date-range picker, working natively on iOS and Android as well as the web, from one codebase.

The core library stays free and MIT licensed. This package is commercial — see [LICENSE](LICENSE).

## Try it without buying

Install it and evaluate it with no key at all. Everything is **fully functional**; components simply render an "unlicensed" watermark until you activate a license. Nothing is time-limited, crippled, or disabled.

[Buy a license →](https://reactnatives.com/pro)

## Install

```bash
npm i @wireservers-ui/react-natives @wireservers-ui/react-natives-pro
```

Fresh Expo app? Scaffold the base config first:

```bash
npx react-natives init
```

### Tailwind — don't skip this

Add the Pro package to your Tailwind `content` globs. **If you miss this, Pro components render unstyled with no error message** — it is by far the most common setup problem.

```js
// tailwind.config.js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './node_modules/@wireservers-ui/react-natives/src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@wireservers-ui/react-natives-pro/src/**/*.{js,jsx,ts,tsx}', // <- add this
  ],
  presets: [require('@wireservers-ui/react-natives/tailwind-preset')],
};
```

## Activate your license

Call `setLicenseKey` **once at startup**, before rendering any Pro component:

```tsx
import { setLicenseKey } from '@wireservers-ui/react-natives-pro';

setLicenseKey('WSUI1.…');
```

A missing or invalid key **never breaks your app**. Components stay fully functional and render a watermark, and a single warning is logged. We would rather nag you than take down your production app over a key-delivery problem.

Verification is fully **offline** — no network call, ever. Your app has no runtime dependency on our servers.

```ts
import { getLicenseStatus, isLicensed } from '@wireservers-ui/react-natives-pro';

isLicensed();        // boolean
getLicenseStatus();  // { valid: true, license } | { valid: false, reason }
```

`reason` is one of `missing`, `malformed`, `bad-signature`, `wrong-product`, `expired`.

## DataGridPro

Everything `DataGrid` does, plus CSV export, column pinning, and server-side data.

```tsx
import { DataGridPro } from '@wireservers-ui/react-natives-pro';

<DataGridPro
  columns={[
    { id: 'id', title: 'ID', kind: 'number', width: 70, pinned: 'left' },
    { id: 'name', title: 'Name', width: 200 },
    { id: 'total', title: 'Total', kind: 'number', width: 120 },
    { id: 'ok', title: 'OK', kind: 'boolean', width: 90, pinned: 'right' },
  ]}
  rowCount={rows.length}
  getCellContent={(row, column) => rows[row][column.id]}
  sortable
  filterable
  exportFileName="orders"
/>
```

| Prop | Purpose |
|---|---|
| `showToolbar` | Show the export toolbar. Default `true` |
| `exportFileName` | Base name for the export, without extension |
| `onExportCsv` | `(csv, fileName) => void`. Required on native — see below |
| `exportDelimiter` | Field separator. `'\t'` for TSV |

Plus every `DataGrid` prop.

### Export

On **web**, omitting `onExportCsv` downloads the file (with a UTF-8 BOM, so Excel renders accented characters correctly).

On **iOS/Android** there is no universal "save file" primitive, and we won't force a file-system dependency on every consumer — so supply `onExportCsv` and hand the text to your own sharing layer:

```tsx
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

<DataGridPro
  onExportCsv={async (csv, fileName) => {
    const uri = FileSystem.cacheDirectory + fileName;
    await FileSystem.writeAsStringAsync(uri, csv);
    await Sharing.shareAsync(uri);
  }}
  {...rest}
/>
```

The export always reflects **what the user is currently looking at** — active sort and filters included.

Fields beginning `=`, `+`, `-`, or `@` are prefixed with `'` to defuse [CSV injection](https://owasp.org/www-community/attacks/CSV_Injection); without that, a hostile cell value can execute when the file is opened in Excel.

### Column pinning

Set `pinned: 'left' | 'right'` on a column to freeze it while the rest scroll horizontally. Grids with no pinned column use the original single-scroller layout, so nothing changes for existing code.

### Server-side data

Hand sorting/filtering to your backend with `manualSort` / `manualFilter`; the grid stops reordering rows itself and just reports intent:

```tsx
<DataGridPro
  manualSort
  manualFilter
  sort={sort}
  onSortChange={setSort}          // refetch on change
  onFiltersChange={setFilters}
  loading={isFetching}
  onEndReached={loadNextPage}     // re-arms once rowCount grows
  {...rest}
/>
```

## DateRangePicker

Two-month range calendar with presets. The base library's `date-picker` handles a single date; this covers ranges, including the in-progress state where a start is chosen but no end yet.

```tsx
import { DateRangePicker, type DateRange } from '@wireservers-ui/react-natives-pro';

const [range, setRange] = useState<DateRange>({ start: null, end: null });

<DateRangePicker
  value={range}
  onChange={setRange}
  onRangeComplete={(r) => refetch(r)}
  numberOfMonths={2}
  minDate={new Date(2020, 0, 1)}
/>
```

| Prop | Purpose |
|---|---|
| `value` / `defaultValue` | Controlled or uncontrolled range |
| `onChange` | Every tap, including the half-selected state |
| `onRangeComplete` | Only once both ends are set — usually what you want |
| `minDate` / `maxDate` | Selectable bounds |
| `numberOfMonths` | Months side by side. Default `2` |
| `weekStartsOn` | `0` Sunday (default) … `6` Saturday |
| `presets` | Preset rail. Pass `[]` to hide |

Tapping backwards swaps the ends rather than rejecting the input. The date helpers (`addMonths`, `buildMonthGrid`, `daysBetween`, …) are exported too — they handle month-end clamping (`Jan 31 + 1 month`), leap years, and DST boundaries.

## Support

todd@wireservers.com — including if you need a license key resent.
