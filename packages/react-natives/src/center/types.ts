import type { View } from 'react-native';

export interface CenterProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
