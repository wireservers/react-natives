import type { View, Text as RNText, Pressable } from 'react-native';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'solid' | 'subtle' | 'outline';

export interface AlertContextValue {
  status: AlertStatus;
  variant: AlertVariant;
}

export interface AlertProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  status?: AlertStatus;
  variant?: AlertVariant;
}

export interface AlertIconProps {
  as?: React.ElementType;
  className?: string;
}

export interface AlertBodyProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface AlertTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface AlertCloseButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
