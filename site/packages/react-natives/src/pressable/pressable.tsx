import React from 'react';
import { Pressable as RNPressable } from 'react-native';
import type { PressableProps } from './types';
import { pressableStyle } from './styles';

export const Pressable = React.forwardRef<
  React.ElementRef<typeof RNPressable>,
  PressableProps
>(({ className, disabled, ...props }, ref) => {
  return (
    <RNPressable
      ref={ref}
      disabled={disabled}
      className={pressableStyle({ isDisabled: !!disabled, class: className })}
      {...props}
    />
  );
});

Pressable.displayName = 'Pressable';
