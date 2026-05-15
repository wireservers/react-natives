import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Header } from '@/components/header';
import { useCustomTheme } from '@/context/custom-theme-context';

const LazyThemeSettingsPanel = React.lazy(async () => {
  const mod = await import('@/components/theme-settings-panel');
  return { default: mod.ThemeSettingsPanel };
});

export default function TabLayout() {
  const { settingsOpen } = useCustomTheme();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="components" />
          <Stack.Screen name="features" />
          <Stack.Screen name="theming/index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="account" />
        </Stack>
        {settingsOpen ? (
          <React.Suspense fallback={null}>
            <LazyThemeSettingsPanel />
          </React.Suspense>
        ) : null}
      </View>
    </View>
  );
}
