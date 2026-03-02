import type { View, Text as RNText } from 'react-native';

export type CircularProgressSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CircularProgressContextValue {
  value: number;
  size: CircularProgressSize;
}

export interface CircularProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: number;
  size?: CircularProgressSize;
}

export interface CircularProgressLabelProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}
