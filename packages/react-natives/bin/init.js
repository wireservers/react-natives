#!/usr/bin/env node
/* eslint-env node */
/* global require, process, console */

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const cwd = process.cwd();
const force = process.argv.includes("--force");
const packageVersion = require(path.join(__dirname, "..", "package.json")).version;

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

function write(filename, content) {
  const filepath = path.join(cwd, filename);
  if (fs.existsSync(filepath) && !force) {
    console.log(
      yellow("  skip  ") +
        filename +
        dim(" (already exists — use --force to overwrite)"),
    );
    return;
  }
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf8");
  console.log(green("  create") + " " + filename);
}

function writeStarter(filename, content) {
  const filepath = path.join(cwd, filename);
  if (!fs.existsSync(filepath) || force) {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, content, "utf8");
    console.log(green("  create") + " " + filename);
    return;
  }

  const existing = fs.readFileSync(filepath, "utf8");
  if (looksLikeDefaultExpoStarter(existing)) {
    fs.writeFileSync(filepath, content, "utf8");
    console.log(green("  update") + " " + filename);
    return;
  }

  console.log(
    yellow("  skip  ") +
      filename +
      dim(" (custom content detected — use --force to overwrite)"),
  );
}

function looksLikeDefaultExpoStarter(source) {
  return (
    source.includes("Open up App.tsx") ||
    source.includes("Edit App.tsx") ||
    source.includes("StatusBar") ||
    source.includes("ParallaxScrollView") ||
    source.includes("HelloWave")
  );
}

// ─── Detect project type ──────────────────────────────────────────────────────

const hasExpoRouter = fs.existsSync(path.join(cwd, "app"));

const tailwindContent = hasExpoRouter
  ? ['    "./app/**/*.{ts,tsx}"', '    "./components/**/*.{ts,tsx}"']
  : ['    "./App.{ts,tsx}"', '    "./components/**/*.{ts,tsx}"'];

// ─── Generated file contents ──────────────────────────────────────────────────

const TAILWIND_CONFIG = `const wirePreset = require("@wireservers-ui/react-natives/tailwind-preset");
module.exports = {
  content: [
${tailwindContent.join(",\n")},
    "./node_modules/@wireservers-ui/react-natives/src/**/*.{ts,tsx}",
  ],
  presets: [wirePreset],
};
`;

const GLOBAL_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary-0: 228 228 255;
  --color-primary-50: 206 204 255;
  --color-primary-100: 183 180 255;
  --color-primary-200: 159 155 255;
  --color-primary-300: 134 128 255;
  --color-primary-400: 108 99 243;
  --color-primary-500: 80 70 230;
  --color-primary-600: 62 53 205;
  --color-primary-700: 46 38 180;
  --color-primary-800: 33 26 155;
  --color-primary-900: 22 17 130;
  --color-primary-950: 15 10 105;

  --color-secondary-0: 253 253 253;
  --color-secondary-50: 243 243 243;
  --color-secondary-100: 233 233 233;
  --color-secondary-200: 213 213 213;
  --color-secondary-300: 193 193 193;
  --color-secondary-400: 163 163 163;
  --color-secondary-500: 115 115 115;
  --color-secondary-600: 82 82 82;
  --color-secondary-700: 64 64 64;
  --color-secondary-800: 38 38 38;
  --color-secondary-900: 23 23 23;
  --color-secondary-950: 10 10 10;

  --color-tertiary-50: 255 244 236;
  --color-tertiary-100: 255 225 204;
  --color-tertiary-200: 255 197 153;
  --color-tertiary-300: 255 168 102;
  --color-tertiary-400: 255 140 51;
  --color-tertiary-500: 255 111 0;
  --color-tertiary-600: 219 93 0;
  --color-tertiary-700: 183 76 0;
  --color-tertiary-800: 146 60 0;
  --color-tertiary-900: 110 44 0;
  --color-tertiary-950: 73 29 0;

  --color-error-0: 255 242 242;
  --color-error-50: 254 226 226;
  --color-error-100: 254 202 202;
  --color-error-200: 252 165 165;
  --color-error-300: 248 113 113;
  --color-error-400: 239 68 68;
  --color-error-500: 220 38 38;
  --color-error-600: 185 28 28;
  --color-error-700: 153 27 27;
  --color-error-800: 127 29 29;
  --color-error-900: 100 20 20;
  --color-error-950: 69 10 10;

  --color-success-0: 240 253 244;
  --color-success-50: 220 252 231;
  --color-success-100: 187 247 208;
  --color-success-200: 134 239 172;
  --color-success-300: 74 222 128;
  --color-success-400: 34 197 94;
  --color-success-500: 22 163 74;
  --color-success-600: 21 128 61;
  --color-success-700: 22 101 52;
  --color-success-800: 20 83 45;
  --color-success-900: 17 68 37;
  --color-success-950: 5 46 22;

  --color-warning-0: 255 252 240;
  --color-warning-50: 254 249 195;
  --color-warning-100: 254 240 138;
  --color-warning-200: 253 224 71;
  --color-warning-300: 250 204 21;
  --color-warning-400: 234 179 8;
  --color-warning-500: 202 138 4;
  --color-warning-600: 161 98 7;
  --color-warning-700: 133 77 14;
  --color-warning-800: 113 63 18;
  --color-warning-900: 90 52 18;
  --color-warning-950: 66 32 6;

  --color-info-0: 240 249 255;
  --color-info-50: 224 242 254;
  --color-info-100: 186 230 253;
  --color-info-200: 125 211 252;
  --color-info-300: 56 189 248;
  --color-info-400: 14 165 233;
  --color-info-500: 2 132 199;
  --color-info-600: 3 105 161;
  --color-info-700: 7 89 133;
  --color-info-800: 12 74 110;
  --color-info-900: 12 64 93;
  --color-info-950: 8 47 73;

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
  --color-outline-300: 163 163 163;
  --color-outline-400: 140 140 140;
  --color-outline-500: 115 115 115;
  --color-outline-600: 82 82 82;
  --color-outline-700: 64 64 64;
  --color-outline-800: 38 38 38;
  --color-outline-900: 23 23 23;
  --color-outline-950: 10 10 10;

  --color-background-0: 255 255 255;
  --color-background-50: 246 246 246;
  --color-background-100: 237 237 237;
  --color-background-200: 219 219 219;
  --color-background-300: 185 185 185;
  --color-background-400: 163 163 163;
  --color-background-500: 140 140 140;
  --color-background-600: 115 115 115;
  --color-background-700: 82 82 82;
  --color-background-800: 64 64 64;
  --color-background-900: 38 38 38;
  --color-background-950: 23 23 23;
  --color-background-error: 254 226 226;
  --color-background-warning: 254 249 195;
  --color-background-muted: 245 245 245;
  --color-background-success: 220 252 231;
  --color-background-info: 224 242 254;

  --color-indicator-primary: 80 70 230;
  --color-indicator-info: 2 132 199;
  --color-indicator-error: 220 38 38;
}
`;

const METRO_CONFIG = `/* eslint-env node */
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

const BABEL_CONFIG = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
`;

const NATIVEWIND_ENV = `/// <reference types="nativewind/types" />\n\ndeclare module "*.css";\n`;

const APP_TSX = `import "./global.css";

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

const ROUTER_INDEX_TSX = `import "../global.css";

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

export default function HomeScreen() {
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

// ─── Metro Windows ESM patch ──────────────────────────────────────────────────
//
// Metro calls `await import(absolutePath)` with a raw Windows path (D:\...).
// Node 22+'s ESM loader requires file:// URLs on Windows, so this throws
// ERR_UNSUPPORTED_ESM_URL_SCHEME. The patch converts the path via pathToFileURL.
// It lives in .metro-patch.js and runs as a postinstall script so it survives
// future `npm install` calls that would overwrite node_modules.

const METRO_PATCH_SCRIPT = `#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const target = path.join(__dirname, 'node_modules/metro-config/src/loadConfig.js');
if (!fs.existsSync(target)) process.exit(0);

const src = fs.readFileSync(target, 'utf8');
if (src.includes('pathToFileURL')) process.exit(0); // already patched

const patched = src.replace(
  /await import\\(absolutePath\\)/g,
  'await import(require("url").pathToFileURL(absolutePath).href)'
);
if (patched === src) process.exit(0); // pattern not found — nothing to do

fs.writeFileSync(target, patched, 'utf8');
console.log('  patched metro-config/src/loadConfig.js (Windows ESM URL fix)');
`;

// ─── babel.config.js ─────────────────────────────────────────────────────────

function handleBabelConfig() {
  const filepath = path.join(cwd, "babel.config.js");

  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, BABEL_CONFIG, "utf8");
    console.log(green("  create") + " babel.config.js");
    return;
  }

  const existing = fs.readFileSync(filepath, "utf8");
  if (
    existing.includes("jsxImportSource") &&
    existing.includes("nativewind/babel")
  ) {
    console.log(green("  ok    ") + " babel.config.js");
    return;
  }

  // create-expo-app ships a single-preset babel.config.js — overwrite it
  if (/presets:\s*\[['"]babel-preset-expo['"]\]/.test(existing)) {
    fs.writeFileSync(filepath, BABEL_CONFIG, "utf8");
    console.log(green("  update") + " babel.config.js");
    return;
  }

  // Complex existing config — show manual instructions
  console.log(
    yellow("  manual") + " babel.config.js — add NativeWind manually:",
  );
  console.log(
    dim(
      '    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"]',
    ),
  );
}

// ─── package.json — add postinstall ──────────────────────────────────────────

function addPostinstall() {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.scripts = pkg.scripts || {};

  const existing = pkg.scripts.postinstall || "";
  if (existing.includes(".metro-patch.js")) {
    console.log(green("  ok    ") + " package.json postinstall");
    return;
  }

  pkg.scripts.postinstall = existing
    ? `${existing} && node .metro-patch.js`
    : "node .metro-patch.js";

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  console.log(green("  update") + " package.json postinstall");
}

// ─── Install nativewind + tailwindcss ────────────────────────────────────────
//
// Runs npm install which also triggers postinstall, applying the Metro patch.

function installDeps() {
  console.log(cyan("\n  Installing required setup dependencies...\n"));
  try {
    execSync(
      `npm install @wireservers-ui/react-natives@${packageVersion} nativewind@4 tailwindcss@3 babel-preset-expo tailwind-variants tailwind-merge`,
      {
        cwd,
        stdio: "inherit",
      },
    );
    execSync(
      "npx expo install react-dom react-native-web react-native-reanimated react-native-worklets react-native-svg",
      {
        cwd,
        stdio: "inherit",
      },
    );
  } catch {
    console.log(
      yellow("\n  warn  ") +
        " dependency install failed — run npm install and npx expo install manually to finish setup",
    );
  }
}

// ─── Run ─────────────────────────────────────────────────────────────────────

console.log(bold("\n@wireservers-ui/react-natives init\n"));

if (hasExpoRouter) {
  console.log(cyan("  Detected Expo Router") + "\n");
}

write("tailwind.config.js", TAILWIND_CONFIG);
write("global.css", GLOBAL_CSS);
write("metro.config.js", METRO_CONFIG);
handleBabelConfig();
write("nativewind-env.d.ts", NATIVEWIND_ENV);
if (hasExpoRouter) {
  writeStarter("app/index.tsx", ROUTER_INDEX_TSX);
} else {
  writeStarter("App.tsx", APP_TSX);
}
write(".metro-patch.js", METRO_PATCH_SCRIPT);
addPostinstall();
installDeps();

console.log(
  "\n" +
    bold("Done.") +
    " Run " +
    cyan("npx expo start --clear") +
    " to get started.\n",
);
