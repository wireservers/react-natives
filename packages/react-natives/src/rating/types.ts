import type { View, Pressable } from 'react-native';

export type RatingSize = 'sm' | 'md' | 'lg' | 'xl';

export interface RatingContextValue {
  value: number;
  max: number;
  size: RatingSize;
  isReadOnly: boolean;
  onRate: (value: number) => void;
}

export interface RatingProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: RatingSize;
  isReadOnly?: boolean;
  onChange?: (value: number) => void;
}
export interface RatingIconProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  index: number;
  filledIcon?: React.ElementType;
  emptyIcon?: React.ElementType;
}
