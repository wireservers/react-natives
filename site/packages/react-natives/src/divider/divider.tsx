import React from 'react';
import { View } from 'react-native';
import type { DividerProps } from './types';
import { dividerStyle } from './styles';

export const Divider = React.forwardRef<
  React.ElementRef<typeof View>,
  DividerProps
>(({ className, orientation, ...props }, ref) => {
  return (
    <View
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={dividerStyle({ orientation, class: className })}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
