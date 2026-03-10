import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider as AppThemeProvider } from '@/components/ui/theme-provider';
import { ThemeContextProvider, useTheme } from '@/context/theme-context';
import { CustomThemeProvider } from '@/context/custom-theme-context';
import { PaperProvider } from 'react-native-paper';
import { ToastProvider } from '@wireservers-ui/react-natives';
import '@/global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppLayout() {
  const { colorScheme } = useTheme();

  return (
    <AppThemeProvider mode={colorScheme}>
      <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ToastProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </ToastProvider>
        </ThemeProvider>
      </PaperProvider>
    </AppThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeContextProvider>
      <CustomThemeProvider>
        <AppLayout />
      </CustomThemeProvider>
    </ThemeContextProvider>
  );
}
