import React from 'react';
import { Pressable, Text } from 'react-native';
import type { AlertCloseButtonProps } from './types';
import { alertCloseButtonStyle } from './styles';

export const AlertCloseButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  AlertCloseButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel="Close alert"
      className={alertCloseButtonStyle({ class: className })}
      {...props}
    >
      {children ?? <Text className="text-current text-sm">✕</Text>}
    </Pressable>
  );
});

AlertCloseButton.displayName = 'AlertCloseButton';
