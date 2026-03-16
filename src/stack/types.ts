import type { View } from 'react-native';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackSpace = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface StackProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  direction?: StackDirection;
  space?: StackSpace;
  reversed?: boolean;
}

export interface VStackProps extends Omit<StackProps, 'direction'> {}
export interface HStackProps extends Omit<StackProps, 'direction'> {}
