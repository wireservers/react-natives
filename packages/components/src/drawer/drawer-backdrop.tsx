import React from 'react';
import { Pressable } from 'react-native';
import { useDrawerContext } from './drawer';
import type { DrawerBackdropProps } from './types';
import { drawerBackdropStyle } from './styles';

export const DrawerBackdrop = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DrawerBackdropProps
>(({ className, ...props }, ref) => {
  const { onClose } = useDrawerContext();

  return (
    <Pressable
      ref={ref}
      onPress={onClose}
      className={drawerBackdropStyle({ class: className })}
      {...props}
    />
  );
});

DrawerBackdrop.displayName = 'DrawerBackdrop';
