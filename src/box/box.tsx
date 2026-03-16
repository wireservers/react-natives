import React from 'react';
import { View } from 'react-native';
import type { BoxProps } from './types';
import { boxStyle } from './styles';

export const Box = React.forwardRef<
  React.ElementRef<typeof View>,
  BoxProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={boxStyle({ class: className })}
      {...props}
    />
  );
});

Box.displayName = 'Box';
