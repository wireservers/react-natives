import type { Pressable, Text as RNText } from 'react-native';

export interface LinkProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  href?: string;
  isExternal?: boolean;
}

export interface LinkTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}
