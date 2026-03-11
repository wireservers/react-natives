import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import {
  ColorPicker,
  ColorPickerTrigger,
  ColorPickerContent,
  ColorPickerBox,
  ColorPickerSlider,
  ColorPickerSwatch,
  ColorPickerInput,
} from '@wireservers-ui/react-natives';
import { useCustomTheme, type CustomTheme } from '@/context/custom-theme-context';
import { useTheme } from '@/context/theme-context';
import { PageColors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PANEL_WIDTH = 280;

const TOKEN_LABELS: { key: keyof CustomTheme; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'background', label: 'Background' },
  { key: 'text', label: 'Text' },
  { key: 'border', label: 'Border' },
  { key: 'success', label: 'Success' },
  { key: 'error', label: 'Error' },
];

const PRESET_THEMES: { name: string; colors: CustomTheme }[] = [
  {
    name: 'Default',
    colors: {
      primary: '#43C3E6',
      secondary: '#D9D9DB',
      background: '#FFFFFF',
      text: '#111827',
      border: '#E5E7EB',
      success: '#348352',
      error: '#E63535',
    },
  },
  {
    name: 'Ocean',
    colors: {
      primary: '#0EA5E9',
      secondary: '#BAE6FD',
      background: '#F0F9FF',
      text: '#0C4A6E',
      border: '#7DD3FC',
      success: '#059669',
      error: '#DC2626',
    },
  },
  {
    name: 'Forest',
    colors: {
      primary: '#16A34A',
      secondary: '#BBF7D0',
      background: '#F0FDF4',
      text: '#14532D',
      border: '#86EFAC',
      success: '#15803D',
      error: '#DC2626',
    },
  },
  {
    name: 'Sunset',
    colors: {
      primary: '#F97316',
      secondary: '#FED7AA',
      background: '#FFF7ED',
      text: '#7C2D12',
      border: '#FDBA74',
      success: '#16A34A',
      error: '#DC2626',
    },
  },
  {
    name: 'Purple',
    colors: {
      primary: '#8B5CF6',
      secondary: '#DDD6FE',
      background: '#FAF5FF',
      text: '#3B0764',
      border: '#C4B5FD',
      success: '#059669',
      error: '#E11D48',
    },
  },
];

export function ThemeSettingsPanel() {
  const { theme, setToken, reset, settingsOpen, toggleSettings } = useCustomTheme();
  const { colorScheme } = useTheme();
  const c = PageColors[colorScheme];

  if (!settingsOpen) return null;

  return (
    <View
      style={{
        width: PANEL_WIDTH,
        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
        borderLeftWidth: 1,
        borderLeftColor: c.border,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 40,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: c.border,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '700', color: c.heading }}>
          Theme Settings
        </Text>
        <Pressable onPress={toggleSettings} style={{ padding: 4 }}>
          <MaterialCommunityIcons name="close" size={18} color={c.text} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Preset Themes */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '700', color: c.text, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Presets
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {PRESET_THEMES.map((preset) => (
              <Pressable
                key={preset.name}
                onPress={() => {
                  Object.entries(preset.colors).forEach(([key, value]) => {
                    setToken(key as keyof CustomTheme, value);
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: c.border,
                  backgroundColor: colorScheme === 'dark' ? '#252525' : '#F9FAFB',
                }}
              >
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: preset.colors.primary,
                  }}
                />
                <Text style={{ fontSize: 12, fontWeight: '500', color: c.textSecondary }}>
                  {preset.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Color Tokens */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '700', color: c.text, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Colors
          </Text>
          <View style={{ gap: 12 }}>
            {TOKEN_LABELS.map(({ key, label }) => (
              <TokenPicker
                key={key}
                label={label}
                value={theme[key]}
                onChange={(color) => setToken(key, color)}
                colors={c}
                colorScheme={colorScheme}
              />
            ))}
          </View>
        </View>

        {/* Preview */}
        <View>
          <Text style={{ fontSize: 11, fontWeight: '700', color: c.text, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Preview
          </Text>
          <View
            style={{
              backgroundColor: theme.background,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 10,
              padding: 14,
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: theme.text }}>
              Card Title
            </Text>
            <Text style={{ fontSize: 12, color: theme.text, opacity: 0.7 }}>
              Preview of your custom theme colors applied to a card component.
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View
                style={{
                  backgroundColor: theme.primary,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Primary</Text>
              </View>
              <View
                style={{
                  backgroundColor: theme.secondary,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: theme.text, fontSize: 12, fontWeight: '600' }}>Secondary</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: theme.success }} />
              <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: theme.error }} />
            </View>
          </View>
        </View>

        {/* Reset */}
        <Pressable
          onPress={reset}
          style={{
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: c.border,
            backgroundColor: colorScheme === 'dark' ? '#252525' : '#F9FAFB',
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '600', color: c.text }}>
            Reset to Default
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function TokenPicker({
  label,
  value,
  onChange,
  colors: c,
  colorScheme,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
  colors: typeof PageColors.light;
  colorScheme: 'light' | 'dark';
}) {
  const presetColors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280', '#000000'];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: c.textSecondary }}>
        {label}
      </Text>
      <ColorPicker value={value} onChange={onChange}>
        <ColorPickerTrigger />
        <ColorPickerContent>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <ColorPickerBox size={160} />
            <ColorPickerSlider height={160} />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {presetColors.map((color) => (
              <ColorPickerSwatch key={color} color={color} />
            ))}
          </View>
          <ColorPickerInput />
        </ColorPickerContent>
      </ColorPicker>
    </View>
  );
}

export { PANEL_WIDTH };
