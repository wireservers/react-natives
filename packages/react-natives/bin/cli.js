#!/usr/bin/env node
/* eslint-env node */
/* global require, process, console */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];
const force = args.includes("--force");

if (command !== "init") {
  console.error(`Unknown command: ${command}`);
  console.error("Usage: npx @wireservers-ui/react-natives init");
  process.exit(1);
}

const cwd = process.cwd();
const packageVersion = require(path.join(__dirname, "..", "package.json")).version;

function isExpoProject(dir) {
  const pkgPath = path.join(dir, "package.json");
  if (!fs.existsSync(pkgPath)) return false;

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const deps = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
    };
    return Boolean(deps.expo || deps["expo-router"] || deps["react-native"]);
  } catch {
    return false;
  }
}

if (!isExpoProject(cwd)) {
  console.error(
    "\n❌ @wireservers-ui/react-natives init must be run inside an Expo project folder.",
  );
  console.error("   Example:");
  console.error("   mkdir -p demos/react-natives");
  console.error(
    "   npx create-expo-app@latest demos/react-natives/project --template blank-typescript",
  );
  console.error("   cd demos/react-natives/project");
  console.error("   npx @wireservers-ui/react-natives@2.0.2 init\n");
  process.exit(1);
}

// ── Detect package manager ─────────────────────────────────────────────────
function detectPackageManager() {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}

const pm = detectPackageManager();
const installCmd = pm === "yarn" ? "yarn add" : `${pm} install`;
const expoInstallCmd =
  pm === "yarn"
    ? "yarn expo install"
    : pm === "pnpm"
      ? "pnpm expo install"
      : pm === "bun"
        ? "bunx expo install"
        : "npx expo install";
let needsReinstall = false;

console.log(`\n🚀 Initializing @wireservers-ui/react-natives...\n`);
console.log(`   Package manager: ${pm}`);

// ── 0. Create .npmrc for pnpm (Metro needs hoisted modules) ────────────────
if (pm === "pnpm") {
  const npmrcPath = path.join(cwd, ".npmrc");
  const npmrcLine = "node-linker=hoisted";
  if (fs.existsSync(npmrcPath)) {
    const existing = fs.readFileSync(npmrcPath, "utf8");
    if (!existing.includes("node-linker")) {
      fs.appendFileSync(npmrcPath, `\n${npmrcLine}\n`, "utf8");
      console.log(
        "   ✏️  Added node-linker=hoisted to .npmrc (required by Metro)",
      );
      needsReinstall = true;
    }
  } else {
    fs.writeFileSync(npmrcPath, `${npmrcLine}\n`, "utf8");
    console.log(
      "   ✏️  Created .npmrc with node-linker=hoisted (required by Metro)",
    );
    needsReinstall = true;
  }
}

// ── 1. Re-install with hoisted layout (pnpm only) ─────────────────────────
if (needsReinstall) {
  console.log("\n📦 Re-installing with hoisted node_modules...\n");
  try {
    execSync(`${pm} install`, { cwd, stdio: "inherit" });
  } catch {
    console.error("Failed to reinstall. Run `pnpm install` manually.");
  }
}

// ── 2. Install peer dependencies ───────────────────────────────────────────
console.log("\n📦 Installing peer dependencies...\n");
const jsPeers = [
  `@wireservers-ui/react-natives@${packageVersion}`,
  "nativewind@^4",
  "babel-preset-expo",
  "tailwindcss@^3",
  "tailwind-variants",
  "tailwind-merge",
];
const expoPeers = [
  "react-native-reanimated",
  "react-native-worklets",
  "react-native-svg",
  "react-dom",
  "react-native-web",
];

try {
  execSync(`${installCmd} ${jsPeers.join(" ")}`, { cwd, stdio: "inherit" });
  execSync(`${expoInstallCmd} ${expoPeers.join(" ")}`, {
    cwd,
    stdio: "inherit",
  });
} catch {
  console.error(
    "Failed to install peer dependencies. You may need to install them manually:",
  );
  console.error(`  ${installCmd} ${jsPeers.join(" ")}`);
  console.error(`  ${expoInstallCmd} ${expoPeers.join(" ")}`);
}

// ── 3. Create tailwind.config.js ───────────────────────────────────────────
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@wireservers-ui/react-natives/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("@wireservers-ui/react-natives/tailwind-preset")],
};
`;

writeIfMissing("tailwind.config.js", tailwindConfig);

// ── 4. Create global.css ───────────────────────────────────────────────────
const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary-0: 255 255 255;
  --color-primary-50: 238 237 253;
  --color-primary-100: 214 211 249;
  --color-primary-200: 172 166 242;
  --color-primary-300: 132 122 235;
  --color-primary-400: 105 95 233;
  --color-primary-500: 80 70 230;
  --color-primary-600: 63 55 198;
  --color-primary-700: 47 41 163;
  --color-primary-800: 33 29 128;
  --color-primary-900: 22 20 96;
  --color-primary-950: 13 11 64;

  --color-secondary-0: 255 255 255;
  --color-secondary-50: 241 241 243;
  --color-secondary-100: 220 220 224;
  --color-secondary-200: 186 186 194;
  --color-secondary-300: 152 152 163;
  --color-secondary-400: 121 121 137;
  --color-secondary-500: 92 92 112;
  --color-secondary-600: 72 72 92;
  --color-secondary-700: 54 54 72;
  --color-secondary-800: 38 38 54;
  --color-secondary-900: 24 24 38;
  --color-secondary-950: 14 14 24;

  --color-tertiary-50: 250 245 255;
  --color-tertiary-100: 243 232 255;
  --color-tertiary-200: 222 200 252;
  --color-tertiary-300: 196 160 246;
  --color-tertiary-400: 168 120 238;
  --color-tertiary-500: 140 80 228;
  --color-tertiary-600: 114 58 200;
  --color-tertiary-700: 90 40 170;
  --color-tertiary-800: 68 28 138;
  --color-tertiary-900: 48 18 106;
  --color-tertiary-950: 30 8 72;

  --color-error-0: 255 255 255;
  --color-error-50: 254 242 242;
  --color-error-100: 254 226 226;
  --color-error-200: 252 165 165;
  --color-error-300: 248 113 113;
  --color-error-400: 240 82 82;
  --color-error-500: 230 53 53;
  --color-error-600: 204 37 37;
  --color-error-700: 178 24 24;
  --color-error-800: 150 16 16;
  --color-error-900: 122 10 10;
  --color-error-950: 80 5 5;

  --color-success-0: 255 255 255;
  --color-success-50: 237 252 241;
  --color-success-100: 210 245 221;
  --color-success-200: 147 226 172;
  --color-success-300: 96 207 128;
  --color-success-400: 56 189 92;
  --color-success-500: 34 168 66;
  --color-success-600: 24 140 52;
  --color-success-700: 18 112 40;
  --color-success-800: 14 88 32;
  --color-success-900: 10 64 22;
  --color-success-950: 5 40 12;

  --color-warning-0: 255 255 255;
  --color-warning-50: 255 249 235;
  --color-warning-100: 255 240 198;
  --color-warning-200: 252 217 119;
  --color-warning-300: 247 195 56;
  --color-warning-400: 240 176 14;
  --color-warning-500: 220 155 6;
  --color-warning-600: 182 123 4;
  --color-warning-700: 145 96 4;
  --color-warning-800: 112 72 5;
  --color-warning-900: 82 52 6;
  --color-warning-950: 48 30 4;

  --color-info-0: 255 255 255;
  --color-info-50: 240 248 255;
  --color-info-100: 224 240 253;
  --color-info-200: 168 213 248;
  --color-info-300: 110 184 240;
  --color-info-400: 66 158 232;
  --color-info-500: 34 134 220;
  --color-info-600: 22 110 190;
  --color-info-700: 14 88 158;
  --color-info-800: 10 68 126;
  --color-info-900: 6 50 96;
  --color-info-950: 2 32 64;

  --color-typography-0: 255 255 255;
  --color-typography-50: 245 245 245;
  --color-typography-100: 229 229 229;
  --color-typography-200: 212 212 212;
  --color-typography-300: 163 163 163;
  --color-typography-400: 140 140 140;
  --color-typography-500: 115 115 115;
  --color-typography-600: 82 82 82;
  --color-typography-700: 64 64 64;
  --color-typography-800: 38 38 38;
  --color-typography-900: 23 23 23;
  --color-typography-950: 10 10 10;

  --color-outline-0: 255 255 255;
  --color-outline-50: 245 245 245;
  --color-outline-100: 229 229 229;
  --color-outline-200: 212 212 212;
  --color-outline-300: 196 196 196;
  --color-outline-400: 163 163 163;
  --color-outline-500: 140 140 140;
  --color-outline-600: 115 115 115;
  --color-outline-700: 82 82 82;
  --color-outline-800: 51 51 51;
  --color-outline-900: 33 33 33;
  --color-outline-950: 18 18 18;

  --color-background-0: 255 255 255;
  --color-background-50: 249 249 249;
  --color-background-100: 242 242 242;
  --color-background-200: 228 228 228;
  --color-background-300: 212 212 212;
  --color-background-400: 189 189 189;
  --color-background-500: 163 163 163;
  --color-background-600: 115 115 115;
  --color-background-700: 82 82 82;
  --color-background-800: 51 51 51;
  --color-background-900: 33 33 33;
  --color-background-950: 18 18 18;
  --color-background-error: 254 226 226;
  --color-background-warning: 255 243 224;
  --color-background-muted: 245 245 245;
  --color-background-success: 228 247 235;
  --color-background-info: 224 240 253;

  --color-indicator-primary: 80 70 230;
  --color-indicator-info: 34 134 220;
  --color-indicator-error: 230 53 53;
}
`;

writeIfMissing("global.css", globalCss);

// ── 5. Create nativewind-env.d.ts ──────────────────────────────────────────
writeIfMissing(
  "nativewind-env.d.ts",
  '/// <reference types="nativewind/types" />\n\ndeclare module "*.css";\n',
);

// ── 6. Create/update metro.config.js ───────────────────────────────────────
const metroConfig = `/* eslint-env node */
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enableSymlinks = true;
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

try {
  const wsuiPackagePath = path.dirname(
    require.resolve("@wireservers-ui/react-natives/package.json"),
  );
  config.watchFolders = [...new Set([...(config.watchFolders || []), wsuiPackagePath])];
} catch {
  // No-op if package is not resolvable yet.
}

module.exports = withNativeWind(config, { input: "./global.css" });
`;

writeFile("metro.config.js", metroConfig);

// ── 7. Create/update babel.config.js ───────────────────────────────────────
const babelConfig = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
`;

writeFile("babel.config.js", babelConfig);

// ── 8. Create the demo App.tsx ─────────────────────────────────────────────
const appTsx = `import "./global.css";

import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DataGrid,
  Input,
  InputField,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Switch,
} from "@wireservers-ui/react-natives";
import type {
  DataGridCell,
  DataGridColumn,
  DataGridRenderCellInfo,
} from "@wireservers-ui/react-natives";

const links = [
  { label: "Open docs", url: "https://www.reactnatives.dev" },
  {
    label: "View package",
    url: "https://www.npmjs.com/package/@wireservers-ui/react-natives",
  },
  {
    label: "GitHub",
    url: "https://github.com/wireservers/wireservers-ui",
  },
];

const gridRows = [
  {
    component: "Button",
    kind: "Action",
    status: "Ready",
    score: 98,
    shipped: true,
    docs: "Buttons",
    link: "https://www.reactnatives.dev/components/docs/button",
    release: "**2.0** stable",
    owner: "Core",
    color: "#0f766e",
  },
  {
    component: "Input",
    kind: "Form",
    status: "Ready",
    score: 94,
    shipped: true,
    docs: "Inputs",
    link: "https://www.reactnatives.dev/components/docs/input",
    release: "**2.0** stable",
    owner: "Forms",
    color: "#2563eb",
  },
  {
    component: "DataGrid",
    kind: "Data",
    status: "New",
    score: 91,
    shipped: true,
    docs: "Grid",
    link: "https://www.reactnatives.dev/components/docs/data-grid",
    release: "**Sorting**, filtering, selection",
    owner: "Data",
    color: "#7c3aed",
  },
  {
    component: "Drawer",
    kind: "Overlay",
    status: "Ready",
    score: 89,
    shipped: true,
    docs: "Drawer",
    link: "https://www.reactnatives.dev/components/docs/drawer",
    release: "Panel workflow",
    owner: "Overlay",
    color: "#ea580c",
  },
  {
    component: "DatePicker",
    kind: "Form",
    status: "Preview",
    score: 84,
    shipped: false,
    docs: "Dates",
    link: "https://www.reactnatives.dev/components/docs/date-picker",
    release: "Calendar input",
    owner: "Forms",
    color: "#0891b2",
  },
  {
    component: "Toast",
    kind: "Feedback",
    status: "Ready",
    score: 87,
    shipped: true,
    docs: "Toast",
    link: "https://www.reactnatives.dev/components/docs/toast",
    release: "Transient alerts",
    owner: "Feedback",
    color: "#16a34a",
  },
];

const columns: DataGridColumn[] = [
  { id: "component", title: "Component", group: "Identity", width: 160 },
  { id: "kind", title: "Type", group: "Identity", kind: "bubble", width: 120 },
  { id: "status", title: "Status", group: "State", kind: "bubble", width: 120 },
  {
    id: "score",
    title: "Score",
    group: "State",
    kind: "number",
    width: 90,
    align: "right",
  },
  { id: "shipped", title: "Shipped", group: "State", kind: "boolean", width: 100 },
  { id: "docs", title: "Docs", group: "Links", kind: "uri", width: 120 },
  { id: "release", title: "Notes", group: "Rich cells", kind: "markdown", width: 210 },
  { id: "owner", title: "Owner", group: "Rich cells", kind: "drilldown", width: 130 },
  { id: "color", title: "Theme", group: "Rich cells", kind: "custom", width: 110 },
];

function openUrl(url: string) {
  void Linking.openURL(url);
}

export default function App() {
  const [density, setDensity] = useState(62);
  const [enabled, setEnabled] = useState(true);
  const [projectName, setProjectName] = useState("Atlas Mobile");
  const [selectedRows, setSelectedRows] = useState<number[]>([0, 2]);
  const [lastEdit, setLastEdit] = useState("Long-press editable cells");

  const gridCells = useMemo(
    () => (row: number, column: DataGridColumn): DataGridCell | string | number | boolean => {
      const item = gridRows[row];
      const value = item[column.id as keyof typeof item];
      if (column.id === "docs") {
        return { kind: "uri", value: item.docs, href: item.link };
      }
      if (column.id === "color") {
        return {
          kind: "custom",
          value: item.color,
          displayValue: item.owner,
          accessibilityLabel: \`\${item.owner} theme color \${item.color}\`,
        };
      }
      return value;
    },
    [],
  );

  const renderGridCell = ({ column, cell }: DataGridRenderCellInfo) => {
    if (column.id !== "color") return undefined;
    const color = String(cell.value ?? "#0f766e");
    return (
      <View style={styles.swatchCell}>
        <View style={[styles.swatch, { backgroundColor: color }]} />
        <Text style={styles.swatchText}>{cell.displayValue}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View>
              <Text style={styles.eyebrow}>WireServers UI</Text>
              <Text style={styles.brand}>React Natives</Text>
            </View>
          </View>

          <View style={styles.heroCopy}>
            <Badge variant="subtle" action="primary" size="lg">
              <BadgeText>Expo starter with real components</BadgeText>
            </Badge>
            <Text style={styles.title}>Build clean Expo apps faster.</Text>
            <Text style={styles.subtitle}>
              This starter renders actual library primitives: actions, form
              controls, stats, cards, and a sortable data grid.
            </Text>
          </View>

          <View style={styles.linkRow}>
            {links.map((link, index) => (
              <Button
                key={link.url}
                action={index === 0 ? "primary" : "default"}
                variant={index === 0 ? "solid" : "outline"}
                size="lg"
                onPress={() => openUrl(link.url)}
              >
                <ButtonText>{link.label}</ButtonText>
              </Button>
            ))}
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat style={styles.statBox}>
            <StatLabel>Components</StatLabel>
            <StatNumber>70+</StatNumber>
            <StatHelpText>App-ready primitives</StatHelpText>
          </Stat>
          <Stat style={styles.statBox}>
            <StatLabel>Platforms</StatLabel>
            <StatNumber>3</StatNumber>
            <StatHelpText>Web, iOS, Android</StatHelpText>
          </Stat>
          <Stat style={styles.statBox}>
            <StatLabel>Setup</StatLabel>
            <StatNumber>1 cmd</StatNumber>
            <StatHelpText>Expo-aware init</StatHelpText>
          </Stat>
        </View>

        <View style={styles.examplesGrid}>
          <Card variant="outline" size="lg" style={styles.exampleCard}>
            <CardHeader>
              <Text style={styles.cardTitle}>Actions</Text>
              <Badge action="success" variant="subtle">
                <BadgeText>Live</BadgeText>
              </Badge>
            </CardHeader>
            <CardBody>
              <Text style={styles.cardText}>
                Button variants are ready for primary, secondary, and neutral
                workflows.
              </Text>
            </CardBody>
            <CardFooter>
              <View style={styles.buttonStack}>
                <Button action="primary" size="md">
                  <ButtonText>Create</ButtonText>
                </Button>
                <Button action="default" variant="outline" size="md">
                  <ButtonText>Review</ButtonText>
                </Button>
              </View>
            </CardFooter>
          </Card>

          <Card variant="outline" size="lg" style={styles.exampleCard}>
            <CardHeader>
              <Text style={styles.cardTitle}>Forms</Text>
              <Switch value={enabled} onToggle={setEnabled} />
            </CardHeader>
            <CardBody>
              <Input size="lg" variant="outline">
                <InputField
                  value={projectName}
                  onChangeText={setProjectName}
                  placeholder="Project name"
                />
              </Input>
              <Text style={styles.helperText}>
                Inputs, switches, pickers, sliders, and validation states share
                one token system.
              </Text>
            </CardBody>
          </Card>

          <Card variant="outline" size="lg" style={styles.exampleCard}>
            <CardHeader>
              <Text style={styles.cardTitle}>Tuning</Text>
              <Badge action="info" variant="subtle">
                <BadgeText>{density}%</BadgeText>
              </Badge>
            </CardHeader>
            <CardBody>
              <Slider
                value={density}
                onValueChange={setDensity}
                min={0}
                max={100}
                size="lg"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text style={styles.helperText}>
                Interactive controls work across touch, mouse, and keyboard
                driven surfaces.
              </Text>
            </CardBody>
          </Card>

          <Card variant="outline" size="lg" style={styles.gridCard}>
            <CardHeader>
              <Text style={styles.cardTitle}>DataGrid</Text>
              <Badge action="warning" variant="subtle">
                <BadgeText>Feature showcase</BadgeText>
              </Badge>
            </CardHeader>
            <CardBody>
              <Text style={styles.helperTextTop}>
                Sort, filter, select rows, resize or reorder columns, and
                long-press editable cells. Selected rows: {selectedRows.length}.
              </Text>
              <DataGrid
                columns={columns}
                rowCount={gridRows.length}
                getCellContent={gridCells}
                renderCell={renderGridCell}
                onCellEdit={(event) =>
                  setLastEdit(\`\${event.column.title}: \${String(event.value)}\`)
                }
                editable
                selectionMode="multiple"
                selectionScope="row"
                selection={{ rows: selectedRows }}
                onSelectionChange={(selection) =>
                  setSelectedRows(selection.rows ?? [])
                }
                sortable
                filterable
                allowColumnResize
                allowColumnReorder
                stickyHeader
                defaultSort={{ columnId: "score", direction: "desc" }}
                mergedCells={[{ row: 0, columnId: "release", colSpan: 2 }]}
                rowHeight={(row) => (row === 2 ? 58 : 44)}
                estimatedRowHeight={48}
                style={styles.dataGrid}
              />
              <View style={styles.gridFooter}>
                <Badge action="info" variant="subtle">
                  <BadgeText>{lastEdit}</BadgeText>
                </Badge>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setSelectedRows([])}
                  style={styles.clearSelectionButton}
                >
                  <Text style={styles.clearSelectionText}>Clear selection</Text>
                </Pressable>
              </View>
            </CardBody>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  page: {
    flexGrow: 1,
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  header: {
    alignSelf: "center",
    maxWidth: 980,
    width: "100%",
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 32,
  },
  eyebrow: {
    color: "#0f766e",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  brand: {
    color: "#101828",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0,
  },
  heroCopy: {
    alignItems: "flex-start",
    gap: 16,
  },
  title: {
    color: "#101828",
    fontSize: 46,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 52,
    maxWidth: 760,
  },
  subtitle: {
    color: "#475467",
    fontSize: 19,
    lineHeight: 29,
    maxWidth: 760,
  },
  linkRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
  },
  statsRow: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    maxWidth: 980,
    width: "100%",
  },
  statBox: {
    backgroundColor: "#ffffff",
    borderColor: "#d9e2ec",
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: 220,
    flexGrow: 1,
    padding: 18,
  },
  examplesGrid: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    maxWidth: 980,
    width: "100%",
  },
  exampleCard: {
    flexBasis: 300,
    flexGrow: 1,
    minHeight: 230,
  },
  gridCard: {
    flexBasis: 620,
    flexGrow: 1,
  },
  cardTitle: {
    color: "#101828",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0,
  },
  cardText: {
    color: "#667085",
    fontSize: 15,
    lineHeight: 22,
  },
  helperText: {
    color: "#667085",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 16,
  },
  helperTextTop: {
    color: "#667085",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  buttonStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  dataGrid: {
    height: 360,
    minWidth: 620,
  },
  swatchCell: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  swatch: {
    borderColor: "#cbd5e1",
    borderRadius: 4,
    borderWidth: 1,
    height: 18,
    width: 18,
  },
  swatchText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
  gridFooter: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  clearSelectionButton: {
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearSelectionText: {
    color: "#0f766e",
    fontSize: 13,
    fontWeight: "800",
  },
});`;

writeStarterFile("App.tsx", appTsx);

// ── Done ───────────────────────────────────────────────────────────────────
console.log("\n✅ Setup complete!\n");
console.log("   Created if missing (existing files were preserved):");
console.log("     • tailwind.config.js");
console.log("     • global.css (with theme variables)");
console.log("     • nativewind-env.d.ts");
console.log("     • metro.config.js");
console.log("     • babel.config.js");
console.log("     • App.tsx (real component starter landing page)");
console.log("\n   Run your app:\n");
console.log("     npx expo start --clear\n");

// ── Helpers ────────────────────────────────────────────────────────────────
function writeFile(name, content) {
  const filePath = path.join(cwd, name);
  if (fs.existsSync(filePath) && !force) {
    console.log(
      `   ⏭️  ${name} already exists, skipping (use --force to overwrite)`,
    );
    return;
  }

  const action = fs.existsSync(filePath) ? "Updated" : "Created";
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`   ✏️  ${action} ${name}`);
}

function writeIfMissing(name, content) {
  const filePath = path.join(cwd, name);
  if (fs.existsSync(filePath)) {
    console.log(`   ⏭️  ${name} already exists, skipping`);
    return;
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`   ✏️  Created ${name}`);
}

function writeStarterFile(name, content) {
  const filePath = path.join(cwd, name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`   ✏️  Created ${name}`);
    return;
  }

  const existing = fs.readFileSync(filePath, "utf8");
  if (looksLikeDefaultExpoScreen(existing)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`   ✏️  Updated ${name} with WireServers slider demo`);
    return;
  }

  console.log(`   ⏭️  ${name} has custom content, keeping existing file`);
}

function looksLikeDefaultExpoScreen(source) {
  return (
    source.includes("Open up App.tsx") ||
    source.includes("Edit App.tsx") ||
    source.includes("StatusBar")
  );
}
