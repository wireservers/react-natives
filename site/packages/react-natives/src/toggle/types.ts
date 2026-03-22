import type { Pressable } from 'react-native';

export type ToggleVariant = 'outline' | 'solid';
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> {
  className?: string;
  variant?: ToggleVariant;
  size?: ToggleSize;
  isPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  isDisabled?: boolean;
  children: React.ReactNode;
}
