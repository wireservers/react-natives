import type { View } from 'react-native';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: SpinnerSize;
  color?: string;
}
