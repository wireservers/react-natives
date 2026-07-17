import type React from 'react';
import type { ReactNode } from 'react';
import type { View } from 'react-native';

export type SearchablePickerOption = {
  value: string;
  label: string;
  group?: string;
  depth?: number;
  icon?: ReactNode;
};

export interface SearchablePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  className?: string;
  label?: string;
  value: string;
  options: Array<string | SearchablePickerOption>;
  onChange: (value: string) => void;
  placeholder?: string;
  freeText?: boolean;
  emptyText?: string;
  createActionLabel?: string;
  onCreateOption?: (value: string) => void | Promise<void>;
  maxVisibleOptions?: number;
}
