import type React from 'react';
import type { ReactNode } from 'react';
import type { View } from 'react-native';

export interface SelectionBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  className?: string;
  count: number;
  label: string;
  summary: string;
  onClear: () => void;
  onCompare: () => void;
  compareDisabled?: boolean;
  compareLabel?: string;
  clearLabel?: string;
  bottomInset?: number;
  leading?: ReactNode;
}
