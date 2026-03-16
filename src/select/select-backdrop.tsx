import React from 'react';
import { Pressable } from 'react-native';
import { useSelectContext } from './select';
import type { SelectBackdropProps } from './types';
import { selectBackdropStyle } from './styles';

export const SelectBackdrop = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SelectBackdropProps
>(({ className, ...props }, ref) => {
  const { onClose } = useSelectContext();

  return (
    <Pressable
      ref={ref}
      onPress={onClose}
      className={selectBackdropStyle({ class: className })}
      accessibilityRole="button"
      accessibilityLabel="Close select"
      {...props}
    />
  );
});

SelectBackdrop.displayName = 'SelectBackdrop';
