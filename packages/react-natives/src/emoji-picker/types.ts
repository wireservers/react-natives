import type React from 'react';
import type { View } from 'react-native';

export interface EmojiPickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  className?: string;
  label?: string;
  value: string;
  options: readonly string[];
  onChange: (emoji: string) => void;
  clearOnReselect?: boolean;
}
