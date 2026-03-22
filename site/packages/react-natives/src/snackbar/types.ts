import type { View, Text as RNText, Pressable } from 'react-native';

export type SnackbarAction = 'info' | 'success' | 'warning' | 'error';

export interface SnackbarContextValue {
  action: SnackbarAction;
}

export interface SnackbarProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  action?: SnackbarAction;
}

export interface SnackbarTextProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface SnackbarActionButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  label: string;
}
