/**
 * Reads the published package's README.md and writes lib/readme-content.ts as a typed string
 * export. Run before build or dev to keep in sync.
 *
 * Points at the canonical package (`<repo>/packages/react-natives`) rather than the copy that
 * used to sit under `site/packages/`. That copy was a snapshot and silently went stale, so the
 * docs site described an older release than the one on npm.
 */
const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../../packages/react-natives/README.md");
const dest = path.resolve(__dirname, "../lib/readme-content.ts");

const content = fs.readFileSync(src, "utf8");

fs.writeFileSync(
  dest,
  `// AUTO-GENERATED — do not edit directly. Run: node scripts/sync-readme.js\nconst readmeContent = ${JSON.stringify(content)};\nexport default readmeContent;\n`
);

console.log("synced README →", path.relative(process.cwd(), dest));
