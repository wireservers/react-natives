import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { vars } from 'nativewind';
import { PageColors } from '@/constants/theme';
import { useTheme } from '@/context/theme-context';

/** User-customizable theme tokens applied to component previews */
export interface CustomTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  success: string;
  error: string;
}

const defaultTheme: CustomTheme = {
  primary: '#43C3E6',
  secondary: '#D9D9DB',
  background: '#FFFFFF',
  text: '#111827',
  border: '#E5E7EB',
  success: '#348352',
  error: '#E63535',
};

interface CustomThemeContextValue {
  theme: CustomTheme;
  setToken: (key: keyof CustomTheme, value: string) => void;
  reset: () => void;
  settingsOpen: boolean;
  toggleSettings: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextValue>({
  theme: defaultTheme,
  setToken: () => {},
  reset: () => {},
  settingsOpen: false,
  toggleSettings: () => {},
});

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<CustomTheme>(defaultTheme);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const setToken = useCallback((key: keyof CustomTheme, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setTheme(defaultTheme);
  }, []);

  const toggleSettings = useCallback(() => {
    setSettingsOpen((prev) => !prev);
  }, []);

  return (
    <CustomThemeContext.Provider value={{ theme, setToken, reset, settingsOpen, toggleSettings }}>
      {children}
    </CustomThemeContext.Provider>
  );
}

export function useCustomTheme() {
  return useContext(CustomThemeContext);
}

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) {
    h = `${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  const num = parseInt(h, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/** Shift a hex color's lightness by an amount (-1 to 1) */
function adjustBrightness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const adjust = (v: number) => Math.max(0, Math.min(255, Math.round(v + amount * 255)));
  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
}

/** Convert hex to "R G B" string for CSS variable format */
function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '0 0 0';
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

/** Linearly interpolate between two RGB values */
function lerpColor(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  t: number,
): string {
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return `${r} ${g} ${b}`;
}

/**
 * Generate a 12-stop palette (0, 50, 100..950) from a base hex color.
 * The base color maps to the 500 stop. Lighter shades go toward white,
 * darker shades go toward black.
 */
function generatePalette(baseHex: string): Record<string, string> {
  const base = hexToRgb(baseHex);
  if (!base) return {};

  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };

  // Steps from lightest (0) to darkest (950)
  // 0=very light, 500=base, 950=very dark
  const steps: [string, number][] = [
    ['0', 0.95],   // near white
    ['50', 0.85],
    ['100', 0.7],
    ['200', 0.5],
    ['300', 0.3],
    ['400', 0.15],
    ['500', 0],     // base color
    ['600', 0.1],
    ['700', 0.25],
    ['800', 0.4],
    ['900', 0.55],
    ['950', 0.7],
  ];

  const palette: Record<string, string> = {};
  for (const [stop, t] of steps) {
    const stopNum = parseInt(stop);
    if (stopNum < 500) {
      // Lighter: lerp from base toward white
      palette[stop] = lerpColor(base, white, t);
    } else if (stopNum === 500) {
      palette[stop] = `${base.r} ${base.g} ${base.b}`;
    } else {
      // Darker: lerp from base toward black
      palette[stop] = lerpColor(base, black, t);
    }
  }
  return palette;
}

/**
 * Generate a palette but reversed (for dark mode where 0=darkest, 950=lightest).
 */
function generatePaletteDark(baseHex: string): Record<string, string> {
  const light = generatePalette(baseHex);
  const keys = Object.keys(light);
  const values = Object.values(light);
  values.reverse();
  const result: Record<string, string> = {};
  keys.forEach((k, i) => { result[k] = values[i]; });
  return result;
}

// ---------------------------------------------------------------------------
// Hook: CSS variable overrides for NativeWind components
// ---------------------------------------------------------------------------

/**
 * Returns a NativeWind `vars()` style object that overrides component colors
 * based on the user's custom theme. Returns `null` when using default theme.
 */
export function useThemeVarsOverride() {
  const { theme } = useCustomTheme();
  const { colorScheme } = useTheme();

  return useMemo(() => {
    const isDefault = Object.keys(defaultTheme).every(
      (k) => theme[k as keyof CustomTheme] === defaultTheme[k as keyof CustomTheme],
    );
    if (isDefault) return null;

    const isDark = colorScheme === 'dark';
    const gen = isDark ? generatePaletteDark : generatePalette;

    const primaryPalette = gen(theme.primary);
    const secondaryPalette = gen(theme.secondary);
    const successPalette = gen(theme.success);
    const errorPalette = gen(theme.error);

    const bgRgb = hexToRgbString(theme.background);
    const textRgb = hexToRgbString(theme.text);
    const borderRgb = hexToRgbString(theme.border);

    const overrides: Record<string, string> = {};

    // Primary palette
    for (const [stop, value] of Object.entries(primaryPalette)) {
      overrides[`--color-primary-${stop}`] = value;
    }

    // Secondary palette
    for (const [stop, value] of Object.entries(secondaryPalette)) {
      overrides[`--color-secondary-${stop}`] = value;
    }

    // Success palette
    for (const [stop, value] of Object.entries(successPalette)) {
      overrides[`--color-success-${stop}`] = value;
    }

    // Error palette
    for (const [stop, value] of Object.entries(errorPalette)) {
      overrides[`--color-error-${stop}`] = value;
    }

    // Background — map the user's background to background-0 (base surface)
    overrides['--color-background-0'] = bgRgb;

    // Typography — map the user's text color to key typography stops
    overrides['--color-typography-900'] = textRgb;
    overrides['--color-typography-950'] = textRgb;

    // Outline — map border color
    overrides['--color-outline-200'] = borderRgb;
    overrides['--color-outline-300'] = borderRgb;

    return vars(overrides);
  }, [theme, colorScheme]);
}

// ---------------------------------------------------------------------------
// Hook: page-level colors (for page backgrounds, headings, etc.)
// ---------------------------------------------------------------------------

export function usePageColors() {
  const { theme } = useCustomTheme();
  const { colorScheme } = useTheme();
  const base = PageColors[colorScheme];

  return useMemo(() => {
    const isDefault = Object.keys(defaultTheme).every(
      (k) => theme[k as keyof CustomTheme] === defaultTheme[k as keyof CustomTheme],
    );
    if (isDefault) return base;

    const isDark = colorScheme === 'dark';

    return {
      pageBg: theme.background,
      docBg: isDark ? adjustBrightness(theme.background, -0.02) : adjustBrightness(theme.background, -0.02),
      cardBg: isDark ? adjustBrightness(theme.background, 0.05) : theme.background,
      heading: theme.text,
      text: isDark ? adjustBrightness(theme.text, -0.15) : adjustBrightness(theme.text, 0.15),
      textSecondary: isDark ? adjustBrightness(theme.text, 0.1) : adjustBrightness(theme.text, -0.05),
      border: theme.border,
      inputBg: isDark ? adjustBrightness(theme.background, 0.05) : theme.background,
      separator: theme.border,
      iconSubtle: isDark ? adjustBrightness(theme.background, 0.08) : adjustBrightness(theme.background, -0.04),
      iconText: isDark ? adjustBrightness(theme.text, -0.15) : adjustBrightness(theme.text, 0.15),
    };
  }, [theme, colorScheme, base]);
}

export { defaultTheme };
