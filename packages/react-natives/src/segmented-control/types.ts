import type { View, Pressable } from 'react-native';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentedControlContextValue {
  value: string;
  onValueChange: (value: string) => void;
  size: SegmentedControlSize;
}

export interface SegmentedControlProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  size?: SegmentedControlSize;
}

export interface SegmentedControlItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  children: React.ReactNode;
}
