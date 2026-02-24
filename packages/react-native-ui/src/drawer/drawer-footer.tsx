import React from 'react';
import { View } from 'react-native';
import type { DrawerFooterProps } from './types';
import { drawerFooterStyle } from './styles';

export const DrawerFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  DrawerFooterProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={drawerFooterStyle({ class: className })}
      {...props}
    />
  );
});

DrawerFooter.displayName = 'DrawerFooter';
