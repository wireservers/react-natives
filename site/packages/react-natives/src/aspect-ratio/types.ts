import type { View } from 'react-native';

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  ratio?: number;
}
