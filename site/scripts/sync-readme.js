/**
 * Reads each published package's README.md and writes it into lib/ as a typed string export.
 * Run before build or dev to keep the docs in sync.
 *
 * Points at the canonical packages (`<repo>/packages/*`) rather than the copy that used to sit
 * under `site/packages/`. That copy was a snapshot and silently went stale, so the docs site
 * described an older release than the one on npm.
 */
const fs = require("fs");
const path = require("path");

const sources = [
  {
    src: "../../packages/react-natives/README.md",
    dest: "../lib/readme-content.ts",
    name: "readmeContent",
  },
  {
    src: "../../packages/react-natives-pro/README.md",
    dest: "../lib/pro-readme-content.ts",
    name: "proReadmeContent",
  },
];

for (const { src, dest, name } of sources) {
  const from = path.resolve(__dirname, src);
  const to = path.resolve(__dirname, dest);
  const content = fs.readFileSync(from, "utf8");

  fs.writeFileSync(
    to,
    `// AUTO-GENERATED — do not edit directly. Run: node scripts/sync-readme.js\nconst ${name} = ${JSON.stringify(content)};\nexport default ${name};\n`
  );

  console.log("synced README →", path.relative(process.cwd(), to));
}
