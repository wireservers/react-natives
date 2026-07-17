import type React from 'react';
import type { ReactNode } from 'react';
import type { View } from 'react-native';

export type ViewToggleMode<M extends string = string> = {
  mode: M;
  label: string;
  icon?: ReactNode | ((selected: boolean) => ReactNode);
};

export interface ViewToggleProps<M extends string = string>
  extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  className?: string;
  value: M;
  onChange: (mode: M) => void;
  modes: Array<ViewToggleMode<M>>;
}
