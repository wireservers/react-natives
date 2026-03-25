import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  Linking,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, usePathname } from "expo-router";
import Svg, { Circle, Path } from "react-native-svg";
import {
  BRAND_COLOR,
  BRAND_COLOR_DARK,
  BRAND_GRADIENT,
} from "@/constants/brand";
import { useTheme } from "@/context/theme-context";
import { useCustomTheme } from "@/context/custom-theme-context";

/** Wrapper that renders an HTML div with a title attribute on web (for native tooltips) */
function WithTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  if (Platform.OS === "web") {
    return React.createElement("div", { title: label }, children);
  }
  return <>{children}</>;
}

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Components", path: "/components" },
];

const RAW_REACT_NATIVES_VERSION = require("../package.json").dependencies?.[
  "@wireservers-ui/react-natives"
] as string | undefined;
const REACT_NATIVES_NPM_VERSION = (
  RAW_REACT_NATIVES_VERSION ?? "unknown"
).replace(/^[~^]/, "");

function SunIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth={1.8} />
      <Path
        d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9L5.3 5.3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function MoonIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.2 14.5a8.5 8.5 0 1 1-10.7-10.7 7 7 0 1 0 10.7 10.7Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function GithubIcon({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.2A9.8 9.8 0 0 0 2.2 12c0 4.1 2.7 7.6 6.4 8.8.5.1.7-.2.7-.5v-1.8c-2.6.6-3.1-1.1-3.1-1.1-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.5.8.1-.6.3-1 .6-1.2-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.8.9-2.5 0-.2-.4-1.2.1-2.5 0 0 .8-.2 2.6.9a9.4 9.4 0 0 1 4.8 0c1.8-1.2 2.6-.9 2.6-.9.5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.3.3.6.8.6 1.7v2.5c0 .3.2.6.7.5A9.8 9.8 0 0 0 21.8 12 9.8 9.8 0 0 0 12 2.2Z"
        fill={color}
      />
    </Svg>
  );
}

function PaletteIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3a9 9 0 1 0 0 18h1.2a2.8 2.8 0 0 0 0-5.6h-1.5a2.2 2.2 0 1 1 0-4.4h2.1A4.2 4.2 0 0 0 18 6.8 3.8 3.8 0 0 0 14.2 3H12Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="7.9" cy="10" r="1" fill={color} />
      <Circle cx="11" cy="7.5" r="1" fill={color} />
      <Circle cx="15" cy="8" r="1" fill={color} />
    </Svg>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const { colorScheme, toggleColorScheme } = useTheme();
  const { toggleSettings, settingsOpen } = useCustomTheme();
  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "#1a1a1a" : "#fff";
  const borderColor = isDark ? "#333" : "#E5E7EB";
  const textColor = isDark ? "#D1D5DB" : "#4B5563";
  const controlBg = isDark ? "#252525" : "#F8FAFC";
  const controlBorder = isDark ? "#3A3A3A" : "#E2E8F0";
  const activeBg = isDark ? "rgba(67,195,230,0.22)" : "#E0F7FF";
  const activeBorder = BRAND_COLOR;

  return (
    <View>
      {/* Main header bar */}
      <View
        style={{
          backgroundColor: bgColor,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 1680,
            alignSelf: "center",
            paddingHorizontal: 20,
            height: 72,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Logo + brand name */}
          <Pressable
            onPress={() => router.push("/" as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 12,
              gap: 10,
            }}
          >
            <Image
              source={require("../assets/images/react-natives-icon-square-1024.png")}
              style={{ width: 44, height: 44 }}
              resizeMode="contain"
            />
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: isDark ? BRAND_COLOR : BRAND_COLOR_DARK,
                  letterSpacing: 1.2,
                  fontStyle: "italic",
                }}
              >
                REACT-NATIVES
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: BRAND_COLOR,
                  letterSpacing: 2,
                  marginTop: 1,
                  fontStyle: "italic",
                }}
              >
                WIRED FOR SPEED
              </Text>
            </View>
          </Pressable>

          {/* Nav links — wide screens only */}
          {isWide && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 24,
                marginLeft: 32,
              }}
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.path);
                return (
                  <Pressable
                    key={link.label}
                    onPress={() => router.navigate(link.path as any)}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: isActive ? BRAND_COLOR : textColor,
                      }}
                    >
                      {link.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Right side — theme toggle + GitHub icon + Get Started button */}
          <View
            style={{
              marginLeft: "auto",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: textColor,
              }}
            >
              react-natives v{REACT_NATIVES_NPM_VERSION}
            </Text>

            {/* Theme settings */}
            <WithTooltip label="Theme settings">
              <Pressable
                onPress={toggleSettings}
                accessibilityLabel="Theme settings"
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 8,
                  borderWidth: 1,
                  backgroundColor: settingsOpen ? activeBg : controlBg,
                  borderColor: settingsOpen ? activeBorder : controlBorder,
                }}
              >
                <PaletteIcon color={settingsOpen ? BRAND_COLOR : textColor} />
                <Text
                  style={{
                    color: settingsOpen ? BRAND_COLOR : textColor,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  Theme
                </Text>
              </Pressable>
            </WithTooltip>

            {/* Light/Dark mode buttons */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: controlBorder,
                overflow: "hidden",
                backgroundColor: controlBg,
              }}
            >
              <WithTooltip label="Switch to light mode">
                <Pressable
                  onPress={() => {
                    if (isDark) toggleColorScheme();
                  }}
                  accessibilityLabel="Switch to light mode"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: !isDark ? activeBg : "transparent",
                  }}
                >
                  <SunIcon
                    color={!isDark ? BRAND_COLOR : textColor}
                    size={16}
                  />
                  <Text
                    style={{
                      color: !isDark ? BRAND_COLOR : textColor,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    Light
                  </Text>
                </Pressable>
              </WithTooltip>
              <WithTooltip label="Switch to dark mode">
                <Pressable
                  onPress={() => {
                    if (!isDark) toggleColorScheme();
                  }}
                  accessibilityLabel="Switch to dark mode"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: isDark ? activeBg : "transparent",
                  }}
                >
                  <MoonIcon
                    color={isDark ? BRAND_COLOR : textColor}
                    size={16}
                  />
                  <Text
                    style={{
                      color: isDark ? BRAND_COLOR : textColor,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    Dark
                  </Text>
                </Pressable>
              </WithTooltip>
            </View>

            {/* GitHub icon */}
            <WithTooltip label="GitHub">
              <Pressable
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/wireservers/wireservers-ui",
                  )
                }
                accessibilityLabel="GitHub repository"
              >
                <GithubIcon color={textColor} />
              </Pressable>
            </WithTooltip>

            {/* Get Started button */}
            <Pressable
              onPress={() =>
                router.navigate("/components/getting-started" as any)
              }
              style={{
                backgroundColor: BRAND_COLOR,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                Get Started
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Gradient accent bar */}
      <LinearGradient
        colors={[...BRAND_GRADIENT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 3 }}
      />
    </View>
  );
}
