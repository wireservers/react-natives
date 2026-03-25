import type { View } from 'react-native';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: ContainerSize;
  centered?: boolean;
}
