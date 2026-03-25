import type { Pressable } from 'react-native';

export type IconButtonAction = 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  as: React.ElementType;
  className?: string;
  action?: IconButtonAction;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isDisabled?: boolean;
}
