import React from 'react';
import { View } from 'react-native';
import type { CenterProps } from './types';
import { centerStyle } from './styles';

export const Center = React.forwardRef<
  React.ElementRef<typeof View>,
  CenterProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={centerStyle({ class: className })}
      {...props}
    />
  );
});

Center.displayName = 'Center';
