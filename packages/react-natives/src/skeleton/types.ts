import type { DimensionValue, View } from 'react-native';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  variant?: SkeletonVariant;
  width?: DimensionValue;
  height?: DimensionValue;
  isLoaded?: boolean;
}
