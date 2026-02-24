import type { View } from 'react-native';
import type { SemanticColor } from '../utils/types';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressContextValue {
  value: number;
  min: number;
  max: number;
  size: ProgressSize;
  colorScheme: SemanticColor;
  percentage: number;
}

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  size?: ProgressSize;
  colorScheme?: SemanticColor;
}

export interface ProgressFilledTrackProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
