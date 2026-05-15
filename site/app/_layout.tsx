import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider as AppThemeProvider } from '@/components/ui/theme-provider';
import { ThemeContextProvider, useTheme } from '@/context/theme-context';
import { CustomThemeProvider } from '@/context/custom-theme-context';
import { AuthProvider } from '@/lib/auth-context';
import '@/global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppLayout() {
  const { colorScheme } = useTheme();

  return (
    <AppThemeProvider mode={colorScheme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <CustomThemeProvider>
          <AppLayout />
        </CustomThemeProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
}
