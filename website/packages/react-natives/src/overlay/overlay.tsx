import React from 'react';
import { View } from 'react-native';
import type { OverlayProps } from './types';
import { overlayStyle } from './styles';

export const Overlay = React.forwardRef<
  React.ElementRef<typeof View>,
  OverlayProps
>(({ className, isVisible = true, ...props }, ref) => {
  if (!isVisible) return null;

  return (
    <View
      ref={ref}
      className={overlayStyle({ class: className })}
      {...props}
    />
  );
});

Overlay.displayName = 'Overlay';
