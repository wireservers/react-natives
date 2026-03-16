import type { View } from 'react-native';

export interface VisuallyHiddenProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}
