import React, { useState } from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { Footer } from "@/components/footer";
import { CodeBlock } from "@/components/docs/code-block";
import { SeoHead } from "@/components/seo/seo-head";
import { usePageColors } from "@/context/custom-theme-context";
import { SITE_URL } from "@/lib/seo";

const BREAKPOINT_SM = 640;
const BREAKPOINT_MD = 768;

const TECH_STACK = [
  { name: "expo / react-native", desc: "Universal app framework" },
  { name: "expo-router", desc: "File-based routing" },
  { name: "nativewind + tailwindcss", desc: "Utility-first styling" },
  {
    name: "@wireservers-ui/react-natives",
    desc: "Design-token driven components",
  },
  { name: "typescript", desc: "Type-safe development" },
];

const SCRIPTS = [
  { cmd: "npm run start", desc: "Start Expo dev server" },
  { cmd: "npm run ios", desc: "Open iOS simulator build" },
  { cmd: "npm run android", desc: "Open Android emulator build" },
  { cmd: "npm run web", desc: "Run in browser" },
  { cmd: "npm run lint", desc: "Run lint checks" },
];

const PREREQUISITES = [
  "Node.js 18+",
  "npm 9+",
  "Xcode (for iOS simulator on macOS)",
  "Android Studio (for Android emulator)",
];

export default function GettingStartedScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isSmall = screenWidth < BREAKPOINT_SM;
  const isMedium = screenWidth < BREAKPOINT_MD;
  const px = isSmall ? 12 : isMedium ? 16 : 24;
  const c = usePageColors();
  const [footerH, setFooterH] = useState(180);

  return (
    <View style={{ flex: 1, backgroundColor: c.docBg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: footerH }}
      >
        <SeoHead
          title="Getting Started | React-Natives"
          description="Get started with React-Natives: install dependencies, run the dev server, and integrate the component library into your Expo or React Native app."
          path="/components/getting-started"
          keywords="react natives getting started, react native ui setup, expo component library install, nativewind setup"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${SITE_URL}/components/getting-started#article`,
            headline: "Getting Started with React-Natives",
            description:
              "Install dependencies, configure NativeWind, and set up providers to use React-Natives in Expo and React Native.",
            url: `${SITE_URL}/components/getting-started`,
            author: {
              "@id": `${SITE_URL}/#organization`,
            },
            publisher: {
              "@id": `${SITE_URL}/#organization`,
            },
            mainEntityOfPage: `${SITE_URL}/components/getting-started`,
          }}
        />

        <View
          style={{
            width: "100%",
            maxWidth: 1504,
            alignSelf: "center",
            paddingHorizontal: px,
            paddingTop: isSmall ? 16 : 24,
            paddingBottom: 60,
          }}
        >
          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontSize: isSmall ? 22 : 28,
                fontWeight: "800",
                color: c.heading,
                marginBottom: 8,
              }}
            >
              Getting Started
            </Text>
            <Text style={{ fontSize: 15, color: c.text, lineHeight: 22 }}>
              A production-ready Expo + React Native setup for building
              cross-platform apps (iOS, Android, and Web) with a modern UI
              foundation.
            </Text>
          </View>

          {/* What's included */}
          <SectionHeader title="What's Included" c={c} />
          <View
            style={{
              backgroundColor: c.cardBg,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 12,
              padding: isSmall ? 16 : 24,
              marginBottom: 32,
            }}
          >
            {[
              "Universal app setup with Expo SDK 54 and React 19",
              "File-based routing with tab navigation and modal support",
              "Light/Dark mode wiring across navigation + UI providers",
              "Shared theme primitives in global.css, tailwind.config.js, and theme provider config",
              "Reusable starter components and hooks for common UI patterns",
              "Linting support with Expo ESLint config",
            ].map((item, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: i < 5 ? 8 : 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: c.heading,
                    marginRight: 10,
                    marginTop: 1,
                  }}
                >
                  •
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: c.text,
                    lineHeight: 22,
                    flex: 1,
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* Tech Stack */}
          <SectionHeader title="Tech Stack" c={c} />
          <View
            style={{
              backgroundColor: c.cardBg,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 32,
            }}
          >
            {TECH_STACK.map((tech, i) => (
              <View
                key={tech.name}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: isSmall ? 16 : 24,
                  paddingVertical: 12,
                  borderBottomWidth: i < TECH_STACK.length - 1 ? 1 : 0,
                  borderBottomColor: c.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: c.heading,
                    fontFamily: "monospace",
                    flex: 1,
                  }}
                >
                  {tech.name}
                </Text>
                <Text style={{ fontSize: 13, color: c.text }}>{tech.desc}</Text>
              </View>
            ))}
          </View>

          {/* Prerequisites */}
          <SectionHeader title="Prerequisites" c={c} />
          <View
            style={{
              backgroundColor: c.cardBg,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 12,
              padding: isSmall ? 16 : 24,
              marginBottom: 32,
            }}
          >
            {PREREQUISITES.map((item, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: i < PREREQUISITES.length - 1 ? 8 : 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: c.heading,
                    marginRight: 10,
                    marginTop: 1,
                  }}
                >
                  •
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: c.text,
                    lineHeight: 22,
                    flex: 1,
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* Installation */}
          <SectionHeader title="Installation" c={c} />
          <View style={{ marginBottom: 32 }}>
            <StepItem
              n={1}
              title="Simple install (recommended)"
              c={c}
              isSmall={isSmall}
            />
            <Text
              style={{
                fontSize: 14,
                color: c.text,
                lineHeight: 22,
                marginBottom: 10,
              }}
            >
              This is the fastest way to get started and matches the package
              README quick-start flow.
            </Text>
            <CodeBlock
              code={`npx create-expo-app@latest wsui-init --template blank-typescript\ncd wsui-init\nnpm install @wireservers-ui/react-natives@2.0.1\nnpx @wireservers-ui/react-natives@2.0.1 init\nnpx expo start --clear --web`}
            />
            <View style={{ height: 10 }} />
            <View style={{ paddingHorizontal: 2, marginBottom: 6 }}>
              <Text style={{ fontSize: 13, color: c.text, lineHeight: 21 }}>
                - Installs required runtime dependencies
              </Text>
              <Text style={{ fontSize: 13, color: c.text, lineHeight: 21 }}>
                - Matches react-dom to your installed react version
              </Text>
              <Text style={{ fontSize: 13, color: c.text, lineHeight: 21 }}>
                - Creates setup files only when missing (no overwrite)
              </Text>
            </View>
            <View style={{ height: 16 }} />

            <StepItem n={2} title="Manual install" c={c} isSmall={isSmall} />
            <Text
              style={{
                fontSize: 14,
                color: c.text,
                lineHeight: 22,
                marginBottom: 10,
              }}
            >
              Use manual setup when you want full control over each file.
            </Text>
            <CodeBlock
              code={`# Step A: install package + dependencies\nnpm install @wireservers-ui/react-natives@2.0.1\nnpm install nativewind tailwindcss tailwind-variants tailwind-merge react-native-reanimated react-native-worklets react-native-svg react-native-web react-dom\n\n# Note: react-dom should match your installed react version exactly.`}
            />
            <View style={{ height: 16 }} />

            <Text
              style={{
                fontSize: 14,
                color: c.text,
                lineHeight: 22,
                marginBottom: 10,
              }}
            >
              Step B: create or update tailwind.config.js
            </Text>
            <CodeBlock
              code={`/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    "./App.{js,jsx,ts,tsx}",\n    "./app/**/*.{js,jsx,ts,tsx}",\n    "./components/**/*.{js,jsx,ts,tsx}",\n    "./node_modules/@wireservers-ui/react-natives/src/**/*.{js,jsx,ts,tsx}",\n  ],\n  presets: [require("@wireservers-ui/react-natives/tailwind-preset")],\n};`}
            />
            <View style={{ height: 16 }} />

            <Text
              style={{
                fontSize: 14,
                color: c.text,
                lineHeight: 22,
                marginBottom: 10,
              }}
            >
              Step C: add global.css with Tailwind directives and React-Natives
              theme tokens.
            </Text>
            <CodeBlock
              code={`@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n/* Add the full :root and .dark token set from the package README Manual Setup section. */`}
            />
            <View style={{ height: 16 }} />

            <StepItem
              n={3}
              title="Wrap your app providers"
              c={c}
              isSmall={isSmall}
            />
            <Text
              style={{
                fontSize: 14,
                color: c.text,
                lineHeight: 22,
                marginBottom: 10,
              }}
            >
              Wrap your app root with ThemeProvider and ToastProvider.
            </Text>
            <CodeBlock
              code={`// app/_layout.tsx\nimport { ThemeProvider } from '@/components/ui/theme-provider';\nimport { ToastProvider } from '@wireservers-ui/react-natives';\n\nexport default function RootLayout() {\n  return (\n    <ThemeProvider mode="light">\n      <ToastProvider>\n        {/* your app */}\n      </ToastProvider>\n    </ThemeProvider>\n  );\n}`}
            />
            <View style={{ height: 16 }} />

            <StepItem
              n={4}
              title="Start the development server"
              c={c}
              isSmall={isSmall}
            />
            <CodeBlock
              code={`npm run start\n\n# Or run on a specific platform\nnpm run web\nnpm run ios\nnpm run android`}
            />
          </View>

          {/* Peer Dependencies */}
          <SectionHeader title="Peer Dependencies" c={c} />
          <View
            style={{
              backgroundColor: c.cardBg,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 32,
            }}
          >
            {[
              {
                name: "react",
                ver: ">=18",
                required: true,
                desc: "Core React library",
              },
              {
                name: "react-native",
                ver: ">=0.74",
                required: true,
                desc: "Core React Native framework",
              },
              {
                name: "nativewind",
                ver: ">=4",
                required: false,
                desc: "Tailwind CSS for React Native",
              },
              {
                name: "tailwind-variants",
                ver: ">=0.1",
                required: false,
                desc: "Variant-based component styling",
              },
              {
                name: "react-native-reanimated",
                ver: ">=3",
                required: false,
                desc: "Animations (Drawer, ActionSheet, etc.)",
              },
              {
                name: "react-native-gesture-handler",
                ver: ">=2",
                required: false,
                desc: "Gestures (Slider, Swipeable, etc.)",
              },
              {
                name: "react-native-svg",
                ver: ">=13",
                required: false,
                desc: "SVG rendering (CircularProgress, etc.)",
              },
            ].map((dep, i, arr) => (
              <View
                key={dep.name}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: isSmall ? 16 : 24,
                  paddingVertical: 12,
                  borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                  borderBottomColor: c.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: c.heading,
                      fontFamily: "monospace",
                    }}
                  >
                    {dep.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: c.text, marginTop: 2 }}>
                    {dep.desc}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: c.text,
                    fontFamily: "monospace",
                    marginRight: 12,
                  }}
                >
                  {dep.ver}
                </Text>
                <View
                  style={{
                    backgroundColor: dep.required ? "#DCFCE7" : "#F3F4F6",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "600",
                      color: dep.required ? "#166534" : "#6B7280",
                    }}
                  >
                    {dep.required ? "required" : "optional"}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Available Scripts */}
          <SectionHeader title="Available Scripts" c={c} />
          <View
            style={{
              backgroundColor: c.cardBg,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 32,
            }}
          >
            {SCRIPTS.map((s, i) => (
              <View
                key={s.cmd}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: isSmall ? 16 : 24,
                  paddingVertical: 12,
                  borderBottomWidth: i < SCRIPTS.length - 1 ? 1 : 0,
                  borderBottomColor: c.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: c.heading,
                    fontFamily: "monospace",
                    minWidth: isSmall ? 140 : 200,
                  }}
                >
                  {s.cmd}
                </Text>
                <Text style={{ fontSize: 13, color: c.text, flex: 1 }}>
                  {s.desc}
                </Text>
              </View>
            ))}
          </View>

          {/* Project Structure */}
          <SectionHeader title="Project Structure" c={c} />
          <View style={{ marginBottom: 32 }}>
            <CodeBlock
              code={`app/
  _layout.tsx              # Root providers + stack navigation
  modal.tsx                # Example modal screen
  (tabs)/
    _layout.tsx            # Bottom tabs configuration
    index.tsx              # Home tab screen

components/
  ui/                      # UI primitives and provider wrappers

hooks/
  use-color-scheme*.ts     # Platform color scheme helpers
  use-theme-color.ts       # Theme value resolver

global.css                 # Global NativeWind/Tailwind styles
tailwind.config.js         # Tailwind + design token mapping
app.json                   # Expo app configuration`}
            />
          </View>

          {/* Architecture Notes */}
          <SectionHeader title="Architecture" c={c} />
          <View
            style={{
              backgroundColor: c.cardBg,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 12,
              padding: isSmall ? 16 : 24,
              marginBottom: 32,
            }}
          >
            <ArchSection title="Navigation" c={c}>
              <BulletItem c={c}>
                Root layout in app/_layout.tsx composes providers and stack
                screens.
              </BulletItem>
              <BulletItem c={c}>
                Tabs are configured in app/(tabs)/_layout.tsx.
              </BulletItem>
              <BulletItem c={c}>
                modal.tsx demonstrates modal presentation from the root stack.
              </BulletItem>
            </ArchSection>

            <ArchSection title="Theming" c={c}>
              <BulletItem c={c}>
                ThemeProvider receives light / dark mode at the root.
              </BulletItem>
              <BulletItem c={c}>
                Tailwind token mapping is defined in tailwind.config.js.
              </BulletItem>
              <BulletItem c={c}>
                CSS variable token values are defined in
                components/ui/theme-provider/config.ts.
              </BulletItem>
            </ArchSection>

            <ArchSection title="UI Libraries" c={c} last>
              <BulletItem c={c}>
                React-Natives handles design-token driven primitives.
              </BulletItem>
              <BulletItem c={c}>
                NativeWind enables utility class styling in React Native and
                Web.
              </BulletItem>
            </ArchSection>
          </View>

          {/* Customization */}
          <SectionHeader title="Customization" c={c} />
          <View
            style={{
              backgroundColor: c.cardBg,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 12,
              padding: isSmall ? 16 : 24,
              marginBottom: 32,
            }}
          >
            <ArchSection title="App Metadata" c={c}>
              <BulletItem c={c}>
                Update app.json for app name/slug, bundle identifiers, icons,
                and URL scheme.
              </BulletItem>
            </ArchSection>

            <ArchSection title="Theme and Branding" c={c}>
              <BulletItem c={c}>
                components/ui/theme-provider/config.ts for token values
              </BulletItem>
              <BulletItem c={c}>
                tailwind.config.js for token-to-class mapping
              </BulletItem>
            </ArchSection>

            <ArchSection title="Navigation and Screens" c={c} last>
              <BulletItem c={c}>
                Add screens by creating files under app/.
              </BulletItem>
              <BulletItem c={c}>
                Add/remove tabs in app/(tabs)/_layout.tsx.
              </BulletItem>
              <BulletItem c={c}>
                Add stack routes in app/_layout.tsx.
              </BulletItem>
            </ArchSection>
          </View>
        </View>
      </ScrollView>

      <View
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        onLayout={(e) => setFooterH(e.nativeEvent.layout.height)}
      >
        <Footer />
      </View>
    </View>
  );
}

function SectionHeader({ title, c }: { title: string; c: any }) {
  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: "700",
        color: c.heading,
        marginBottom: 16,
      }}
    >
      {title}
    </Text>
  );
}

function StepItem({
  n,
  title,
  c,
  isSmall,
}: {
  n: number;
  title: string;
  c: any;
  isSmall: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: c.heading,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "700", color: c.cardBg }}>
          {n}
        </Text>
      </View>
      <Text style={{ fontSize: 15, fontWeight: "600", color: c.heading }}>
        {title}
      </Text>
    </View>
  );
}

function ArchSection({
  title,
  c,
  last,
  children,
}: {
  title: string;
  c: any;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: last ? 0 : 20 }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: c.heading,
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function BulletItem({ c, children }: { c: any; children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: c.heading,
          marginRight: 10,
          marginTop: 1,
        }}
      >
        •
      </Text>
      <Text style={{ fontSize: 14, color: c.text, lineHeight: 22, flex: 1 }}>
        {children}
      </Text>
    </View>
  );
}
