import type { View } from 'react-native';

export interface DividerProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}
