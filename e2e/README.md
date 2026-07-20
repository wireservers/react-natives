# e2e — headless browser verification

Drives the demo app in real headless Chromium and asserts what actually renders and responds to
input. **This exists because unit tests cannot see any of it.**

## Run

```bash
npm install
npm run verify      # builds the demo, then runs both suites
```

Or, if the demo is already exported:

```bash
npm test
```

Screenshots land in `shots/` (gitignored) — look at them. Assertions check *that* things render;
only the images show *how*.

## Suites

| File | Covers |
|---|---|
| `verify.js` | Grid render, license watermark on/off, CSV + XLSX export, column pinning, sticky header, DateRangePicker, console errors |
| `verify-scheduler.js` | Real mouse drags: drag-to-create, drag-to-move, edge resize |

## Bugs this caught that nothing else did

Worth stating plainly, because each one passed every unit test:

1. **Every Scheduler drag silently died.** `onPanResponderTerminationRequest` defaults to `true`,
   so the scrolling ancestor claimed the gesture on the first move. The responder granted and
   never released.
2. **Recreating a PanResponder mid-gesture dropped it.** Granting triggers a state update; the
   re-render swapped in fresh handlers and React Native Web lost the active responder. Responder
   instances are now cached per target.
3. **A dead gap beside pinned columns**, from `flex: 1` stretching the middle pane past its
   content — and **the unlicensed watermark sat on top of the export buttons**. Both were only
   visible in a screenshot; the DOM assertions were perfectly happy.

## Notes

- The demo must be linked to local source (`file:` deps in
  `demos/react-natives/wsui/package.json`), or these suites verify a *published* build instead
  of your working tree.
- Element locators should target the **smallest** matching node. A plain `find()` on text content
  matches ancestors — two harness failures here looked like product bugs but were the locator
  grabbing the page root, then a day column.
