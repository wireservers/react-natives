import type { View } from 'react-native';

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderContextValue {
  value: number;
  min: number;
  max: number;
  step: number;
  size: SliderSize;
  isDisabled: boolean;
  orientation: 'horizontal' | 'vertical';
  percentage: number;
  onValueChange: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  trackLayout: { width: number; height: number };
  setTrackLayout: (layout: { width: number; height: number }) => void;
}

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  size?: SliderSize;
  isDisabled?: boolean;
  onValueChange?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
}

export interface SliderTrackProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface SliderFilledTrackProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface SliderThumbProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
