import React from 'react';
import { Pressable } from 'react-native';
import type { ToggleProps } from './types';
import { toggleStyle } from './styles';

export const Toggle = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ToggleProps
>(({ className, variant, size, isPressed = false, onPressedChange, isDisabled, children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      onPress={() => onPressedChange?.(!isPressed)}
      className={toggleStyle({ variant, size, isPressed, isDisabled, class: className })}
      accessibilityRole="button"
      accessibilityState={{ selected: isPressed }}
      {...props}
    >
      {children}
    </Pressable>
  );
});

Toggle.displayName = 'Toggle';
