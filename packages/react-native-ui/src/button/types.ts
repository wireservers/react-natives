import type { Pressable, Text, View, ActivityIndicator } from 'react-native';

export type ButtonAction =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
  | 'default';
export type ButtonVariant = 'link' | 'outline' | 'solid';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonContextValue {
  action: ButtonAction;
  variant: ButtonVariant;
  size: ButtonSize;
}

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  action?: ButtonAction;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
}

export interface ButtonTextProps
  extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  action?: ButtonAction;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface ButtonSpinnerProps
  extends React.ComponentPropsWithoutRef<typeof ActivityIndicator> {}

export interface ButtonIconProps {
  className?: string;
  as?: React.ElementType;
  size?: ButtonSize | number;
  height?: number;
  width?: number;
}

export type ButtonGroupSpace =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';
export type ButtonGroupDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse';

export interface ButtonGroupProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  space?: ButtonGroupSpace;
  isAttached?: boolean;
  flexDirection?: ButtonGroupDirection;
}
