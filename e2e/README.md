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
| `verify-pricing.js` | `/pro` tiers + prices (incl. guards against stale prices), `/thanks` incl. its failure path |

## Bugs this caught that nothing else did

Worth stating plainly, because each one passed every unit test:

1. **Every Scheduler drag silently died.** `onPanResponderTerminationRequest` defaults to `true`,
   so the scrolling ancestor claimed the gesture on the first move. The responder granted and
   never released.
2. **Recreating a PanResponder mid-gesture dropped it.** Granting triggers a state update; the
   re-render swapped in fresh handlers and React Native Web lost the active responder. Responder
   instances are now cached per target.
3. **Misaligned pricing cards** — the three Buy buttons sat at three different heights because
   blurb lengths differed and the "MOST POPULAR" badge pushed one card down. Every text
   assertion passed; only the screenshot showed it.
4. **A dead gap beside pinned columns**, from `flex: 1` stretching the middle pane past its
   content — and **the unlicensed watermark sat on top of the export buttons**. Both were only
   visible in a screenshot; the DOM assertions were perfectly happy.

5. **The unlicensed watermark covered the wizard's Submit button.** Same bug as #4, one corner
   over: moving the badge off the top-right (toolbars) simply landed it on the bottom-right,
   where form and wizard actions live. It is now bottom-left, and `verify-panel-two.js` asserts
   the badge overlaps no control so this cannot regress a third time.
6. **`ProductTour` never spotlighted anything.** `useTourAnchor` called in the component that
   *renders* the tour sits above its own provider, so it silently registered nothing and every
   step degraded to a plain centred card — which looks intentional. Anchors now fall back to a
   module-level registry, and a step naming an unmounted anchor warns once.
7. **The Markdown preview ate two asterisks while typing.** Pressing Bold with no selection
   produces `****`; the single-`*` italic branch matched `***` inside it. Only visible in a
   screenshot of the preview pane beside the source.

## Notes

- The demo must be linked to local source (`file:` deps in
  `demos/react-natives/wsui/package.json`), or these suites verify a *published* build instead
  of your working tree.
- `verify-routes.js` runs the real `site/server.js` against the real export. It exists because
  `/components` and `/theming` answered **500 (`EISDIR`) in production**: Expo exports them as
  `components/index.html`, and the old `pm2 serve` startup command cannot serve a directory
  route. `--spa` did not help — that fallback only fires for *missing* paths, and the directory
  exists. The fix is `site/server.js` plus the `startup-command` in
  `.github/workflows/{dev,prod}_reactnatives.yml`; this suite is the guard.
- `verify-pro-docs.js` covers `/pro-docs`, the page the order email sends buyers to after paying.
  It asserts all ten components are documented and that no link points at the wrong domain.
- The site's `/pro` route exports as `dist/pro.html`, **not** `dist/pro/index.html`. Adding
  `app/pro/docs.tsx` silently converted it to a directory index, changing what the host must do
  to serve the revenue-critical `/pro` URL — the docs page lives at `app/pro-docs.tsx` instead.
- `verify-panel-two.js` runs against a **live Expo dev server** (`npx expo start --web --port
  8099`) rather than a static export, so it reflects the working tree with no build step. The
  other three suites use `npm run build:demo` output. Run it with `npm run test:panel2`.
- Beware ambiguous `aria-label` lookups: the wizard and the tour both render a "Next", and a bare
  `page.$('[aria-label="Next"]')` silently clicks whichever comes first in the document. Scope
  the query to the component's own subtree.
- Element locators should target the **smallest** matching node. A plain `find()` on text content
  matches ancestors — two harness failures here looked like product bugs but were the locator
  grabbing the page root, then a day column.
