import type { View, Text as RNText } from 'react-native';

export type CodeVariant = 'subtle' | 'outline' | 'solid';

export interface CodeProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
  variant?: CodeVariant;
}

export interface CodeBlockProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children: React.ReactNode;
}
