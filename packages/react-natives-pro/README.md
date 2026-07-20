# @wireservers-ui/react-natives-pro

The ten components teams actually end up buying — data grid, charts, scheduler, command palette, form builder, kanban, upload, rich text, and more — working natively on iOS and Android as well as the web, from one codebase.

The core library stays free and MIT licensed. This package is commercial — see [LICENSE](LICENSE).

| # | Component | What it adds |
| --- | --- | --- |
| 1 | [`DataGridPro`](#datagridpro) | CSV/Excel export, column pinning, server-side data |
| 2 | [`LineChart` · `AreaChart` · `BarChart` · `DonutChart` · `Sparkline` · `StatTile`](#charts) | Dependency-light SVG charts |
| 3 | [`Scheduler`](#scheduler) · [`DateRangePicker`](#daterangepicker) | Drag-to-create calendar, two-month range picker |
| 4 | [`RichTextEditor`](#richtexteditor) | Markdown editor with toolbar and live preview |
| 5 | [`FormBuilder`](#formbuilder) | Schema-driven forms, conditional fields, wizards |
| 6 | [`Combobox`](#combobox) | Async autocomplete, multi-select, create-on-the-fly |
| 7 | [`CommandPalette`](#commandpalette) | ⌘K fuzzy command search |
| 8 | [`FileUpload`](#fileupload) | Drag-and-drop dropzone with per-file progress |
| 9 | [`Kanban`](#kanban) | Drag-and-drop board with WIP limits |
| 10 | [`ProductTour`](#producttour) | Spotlight onboarding coachmarks |

## Try it without buying

Install it and evaluate it with no key at all. Everything is **fully functional**; components simply render an "unlicensed" watermark until you activate a license. Nothing is time-limited, crippled, or disabled.

[Buy a license →](https://www.reactnatives.dev/pro)

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
| `onExportXlsx` | `(bytes, fileName) => void`. Required on native |
| `exportDelimiter` | CSV field separator. `'\t'` for TSV |
| `showXlsxExport` | Show the Excel button. Default `true` |
| `exportSheetName` | Worksheet name, sanitised to Excel's rules |

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

### Excel (.xlsx)

`Export Excel` writes a real `.xlsx` workbook. Numbers are written as numeric cells, so totals
and formulas work in Excel rather than arriving as text.

The writer is **dependency-free** — an `.xlsx` is a ZIP of XML parts, and we build the container
directly rather than adding a spreadsheet library (roughly a megabyte) to your mobile bundle.

```ts
import { buildXlsx } from '@wireservers-ui/react-natives-pro';

const bytes = buildXlsx({ columns, rowCount, getCellContent });  // Uint8Array
```

Both exports always reflect **what the user is currently looking at** — active sort and filters
included.

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

## Scheduler

Week/day time grid with **drag-to-create, drag-to-move, and edge resize**. The free `Calendar`
already covers month/week/day *display*; this adds direct manipulation, which is the hard part.

```tsx
import { Scheduler, type SchedulerEvent } from '@wireservers-ui/react-natives-pro';

<Scheduler
  events={events}
  onEventCreate={(draft) => addEvent({ id: uid(), title: 'New', ...draft })}
  onEventChange={(next) => updateEvent(next)}
  onEventPress={(e) => openDetails(e)}
/>
```

| Prop | Purpose |
|---|---|
| `events` | `{ id, title, start, end }[]` |
| `date` | Anchor date; the week containing it is shown |
| `view` | `'week'` (default) or `'day'` |
| `geometry` | `{ startHour, endHour, hourHeight, snapMinutes }` |
| `onEventCreate` | Drag on empty space. Omit to disable creation |
| `onEventChange` | Fires after a move or resize |
| `onEventPress` | Tap (distinguished from a drag by distance) |
| `minDurationMinutes` | Floor for resize/create. Default `15` |

Drags snap to `snapMinutes` (15 by default), events stay inside the visible window, and
overlapping events are laid out side by side. Gestures preview live and only commit on release,
so a cancelled drag leaves your data untouched.

## Charts

Line, area, bar (grouped and stacked), donut, sparkline, and stat tile — all rendered with
`react-native-svg`, which is an **optional** peer dependency. Install it only if you use the charts:

```bash
npx expo install react-native-svg
```

```tsx
import { LineChart, BarChart, DonutChart, StatTile } from '@wireservers-ui/react-natives-pro';

<LineChart
  series={[{ id: 'rev', name: 'Revenue', data: [{ x: 0, y: 12 }, { x: 1, y: 19 }] }]}
  height={220}
  showDots
  onPointPress={(series, point) => inspect(series, point)}
/>
```

The scale/path maths lives in `chart-utils` and is exported (`plotArea`, `scaleX`, `linePath`,
`yTicks`, `donutArcs`, `nearestIndex`, …) so you can build a chart type we don't ship without
re-deriving any of it.

Axis ticks use a "nice number" ladder (1, 2, 2.5, 5, 10), so a 0–100 axis gives you 0/25/50/75/100
rather than the ugly fractional ticks a naive `range / count` produces.

## RichTextEditor

Markdown-backed editor with a formatting toolbar and live preview.

```tsx
import { RichTextEditor } from '@wireservers-ui/react-natives-pro';

<RichTextEditor
  defaultValue="# Hello\n\nSome **bold** text."
  onChange={setMarkdown}
  preview
  onRequestLink={async () => promptForUrl()}
/>
```

| Prop | Purpose |
| --- | --- |
| `value` / `defaultValue` | Markdown source, controlled or not |
| `tools` | Toolbar buttons, in order. See `ToolId` |
| `preview` | Render a styled preview below the input |
| `counter` | Word and character count. Default `true` |
| `onRequestLink` / `onRequestImage` | Return a URL, or `null` to cancel |

React Native has no `contentEditable`, so this edits **Markdown source** in a `TextInput` rather
than emulating a WYSIWYG document model. That is the only approach that behaves identically on
iOS, Android, and web — and it leaves your users with portable content rather than a proprietary
blob.

Formatting is exported as pure `(text, selection) → { text, selection }` transforms
(`toggleInline`, `toggleBlock`, `insertLink`, `continueList`, `parseMarkdown`), so cursor
behaviour is testable — and tested. Pressing Enter continues a list; pressing it on an empty item
ends the list.

## FormBuilder

Schema-driven forms with validation, conditional fields, and an optional multi-step wizard.

```tsx
import { FormBuilder } from '@wireservers-ui/react-natives-pro';

<FormBuilder
  wizard
  schema={[
    { name: 'email', label: 'Email', type: 'email', step: 0, rules: { required: true } },
    { name: 'plan', label: 'Plan', type: 'select', step: 1,
      options: [{ label: 'Pro', value: 'pro' }, { label: 'Team', value: 'team' }] },
    { name: 'seats', label: 'Seats', type: 'number', step: 1,
      showIf: { field: 'plan', value: 'team' }, rules: { required: true, min: 2 } },
  ]}
  onSubmit={submit}
/>
```

A **hidden field never blocks submission**, and `onSubmit` receives values with hidden-branch
data stripped — so a user who backs out of a conditional path doesn't silently submit answers
from it. Steps whose fields are all hidden are skipped rather than shown blank.

## Combobox

Autocomplete with async loading, multi-select chips, and create-on-the-fly.

```tsx
<Combobox
  loadOptions={async (query) => searchUsers(query)}
  multiple
  onCreate={(label) => inviteByEmail(label)}
  onChange={setSelected}
/>
```

Async searches are debounced and race-guarded by request id, so a slow early response can never
overwrite the results of a later keystroke.

## CommandPalette

⌘K / Ctrl-K fuzzy command search with grouping and keyboard navigation.

```tsx
<CommandPalette
  commands={[
    { id: 'new', label: 'New order', group: 'Create', shortcut: ['⌘', 'N'], run: newOrder },
    { id: 'settings', label: 'Open settings', group: 'Navigate', run: openSettings },
  ]}
/>
```

Groups appear where their best match ranked, so the closest result stays at the top rather than
being buried under a fixed section order. The hotkey binds on web only; on native, drive it with
the `open` prop.

## FileUpload

Drag-and-drop dropzone with per-file progress, previews, retry, and acceptance rules.

```tsx
<FileUpload
  accept={['image/*', '.pdf']}
  maxSize={10 * 1024 * 1024}
  maxFiles={5}
  dedupe
  onUpload={async (file, raw, onProgress) => {
    await putToStorage(raw, onProgress);
  }}
/>
```

| Prop | Purpose |
| --- | --- |
| `accept` | Extensions (`.pdf`), MIME types, or wildcards (`image/*`) |
| `maxSize` / `maxFiles` / `dedupe` | Acceptance rules |
| `onUpload` | Do the transfer; report via `onProgress`, throw to fail |
| `onPickFiles` | **Required on native** — wire to `expo-document-picker` |
| `onRejected` | Rejection messages, one per refused file |

Web gets real HTML5 drag-and-drop plus a file dialog; native uses your picker. Both go through
the same queue, so acceptance rules behave identically everywhere. One oversized file in a
multi-file drop is reported and skipped — the rest still upload.

Overall progress is **byte-weighted**, so a 2 KB thumbnail finishing doesn't jump the bar to 50%
while a 200 MB video is still going.

## Kanban

Drag-and-drop board with WIP limits.

```tsx
<Kanban
  columns={[
    { id: 'todo', title: 'To do', cards: [{ id: '1', title: 'Ship Pro' }] },
    { id: 'doing', title: 'In progress', cards: [], limit: 3 },
    { id: 'done', title: 'Done', cards: [] },
  ]}
  onChange={setColumns}
/>
```

Moves are immutable, so an optimistic drag can be rolled back on a failed save. A column at its
WIP limit refuses incoming cards but still allows reordering within itself — otherwise a full
column freezes permanently.

## ProductTour

Spotlight onboarding coachmarks. Wrap the screen, tag the targets:

```tsx
import { ProductTour, useTourAnchor } from '@wireservers-ui/react-natives-pro';

function Toolbar() {
  const exportAnchor = useTourAnchor('export');
  return <Pressable {...exportAnchor}><Text>Export</Text></Pressable>;
}

<ProductTour
  open={showTour}
  onOpenChange={setShowTour}
  steps={[
    { target: 'export', title: 'Export anything', body: 'CSV or Excel, one tap.', placement: 'bottom' },
    { title: 'That’s it', body: 'Have a look around.' },
  ]}
>
  <Screen />
</ProductTour>
```

`useTourAnchor` only reaches anchors rendered **inside** the provider, so wrap the screen rather
than mounting the tour as a sibling of what it points at.

Targets are re-measured on every step, so a tour still lands correctly after a layout shift or
rotation. The tooltip flips to the opposite side when the preferred placement doesn't fit, then
clamps into the viewport — a centered card that hangs off the edge of a phone is the failure
people actually report. Steps with `enabled: false` are skipped, and the "3 of 7" counter counts
only the steps that will actually be shown.

## Support

todd@wireservers.com — including if you need a license key resent.
