import type { View, Pressable } from 'react-native';

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupVariant = 'outline' | 'solid';
export type ToggleGroupSize = 'sm' | 'md' | 'lg';

export interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string[];
  onValueChange: (value: string) => void;
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
}

export interface ToggleGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  type?: ToggleGroupType;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
}

export interface ToggleGroupItemProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> {
  className?: string;
  value: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}
