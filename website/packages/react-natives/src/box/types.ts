import type { View } from 'react-native';

export interface BoxProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
