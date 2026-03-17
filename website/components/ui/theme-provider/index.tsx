import React, { useEffect } from 'react';
import { config } from './config';
import { View, ViewProps } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useThemeVarsOverride } from '@/context/custom-theme-context';

export type ModeType = 'light' | 'dark' | 'system';

export function ThemeProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const customVars = useThemeVarsOverride();

  useEffect(() => {
    setColorScheme(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <View
      style={[
        config[colorScheme!],
        customVars,
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}
