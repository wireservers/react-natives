import type { View, Text as RNText } from 'react-native';

export type BadgeAction =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'muted';

export type BadgeVariant = 'solid' | 'outline' | 'subtle';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeContextValue {
  action: BadgeAction;
  variant: BadgeVariant;
  size: BadgeSize;
}

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  action?: BadgeAction;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export interface BadgeTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface BadgeIconProps {
  as: React.ElementType;
  className?: string;
}
