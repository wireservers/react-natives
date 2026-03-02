import type { Pressable as RNPressable } from 'react-native';

export interface PressableProps
  extends React.ComponentPropsWithoutRef<typeof RNPressable> {
  className?: string;
}
