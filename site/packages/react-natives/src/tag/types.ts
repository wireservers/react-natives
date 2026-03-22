import type { View, Text as RNText } from 'react-native';

export type TagAction = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info' | 'muted';
export type TagVariant = 'solid' | 'outline' | 'subtle';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagContextValue {
  action: TagAction;
  variant: TagVariant;
  size: TagSize;
}

export interface TagProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  action?: TagAction;
  variant?: TagVariant;
  size?: TagSize;
  isDisabled?: boolean;
}

export interface TagTextProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface TagIconProps {
  as: React.ElementType;
  className?: string;
}

export interface TagCloseButtonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  onPress?: () => void;
}
