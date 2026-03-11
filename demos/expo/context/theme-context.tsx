import React, { createContext, useContext, useState, useCallback } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ColorScheme = 'light' | 'dark';

interface ThemeContextValue {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colorScheme: 'light',
  toggleColorScheme: () => {},
});

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<ColorScheme | null>(null);

  const colorScheme: ColorScheme = override ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const toggleColorScheme = useCallback(() => {
    setOverride((prev) => {
      const current = prev ?? (systemScheme === 'dark' ? 'dark' : 'light');
      return current === 'dark' ? 'light' : 'dark';
    });
  }, [systemScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
