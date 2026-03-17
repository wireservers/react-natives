import React from 'react';
import { View } from 'react-native';
import type { DrawerHeaderProps } from './types';
import { drawerHeaderStyle } from './styles';

export const DrawerHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  DrawerHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={drawerHeaderStyle({ class: className })}
      {...props}
    />
  );
});

DrawerHeader.displayName = 'DrawerHeader';
