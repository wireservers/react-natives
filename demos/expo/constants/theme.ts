/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#61DBFB';
const tintColorDark = '#A0ECFF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const DOC_BG = '#F9FAFB';
export const DOC_BG_DARK = '#121212';

/** Shape of a page color set */
export interface PageColorSet {
  pageBg: string;
  docBg: string;
  cardBg: string;
  heading: string;
  text: string;
  textSecondary: string;
  border: string;
  inputBg: string;
  separator: string;
  iconSubtle: string;
  iconText: string;
}

/** Semantic page colors keyed by color scheme */
export const PageColors: Record<'light' | 'dark', PageColorSet> = {
  light: {
    pageBg: '#fff',
    docBg: '#F9FAFB',
    cardBg: '#fff',
    heading: '#111827',
    text: '#6B7280',
    textSecondary: '#4B5563',
    border: '#E5E7EB',
    inputBg: '#fff',
    separator: '#E5E7EB',
    iconSubtle: '#F3F4F6',
    iconText: '#6B7280',
  },
  dark: {
    pageBg: '#121212',
    docBg: '#121212',
    cardBg: '#1E1E1E',
    heading: '#F3F4F6',
    text: '#9CA3AF',
    textSecondary: '#D1D5DB',
    border: '#333',
    inputBg: '#1E1E1E',
    separator: '#333',
    iconSubtle: '#2A2A2A',
    iconText: '#9CA3AF',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
