import React from 'react';
import { View } from 'react-native';
import type { DrawerBodyProps } from './types';
import { drawerBodyStyle } from './styles';

export const DrawerBody = React.forwardRef<
  React.ElementRef<typeof View>,
  DrawerBodyProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={drawerBodyStyle({ class: className })}
      {...props}
    />
  );
});

DrawerBody.displayName = 'DrawerBody';
