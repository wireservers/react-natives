import React from 'react';
import { View } from 'react-native';
import type { AlertBodyProps } from './types';
import { alertBodyStyle } from './styles';

export const AlertBody = React.forwardRef<
  React.ElementRef<typeof View>,
  AlertBodyProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={alertBodyStyle({ class: className })}
      {...props}
    />
  );
});

AlertBody.displayName = 'AlertBody';
