import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useDrawerContext } from './drawer';
import type { DrawerContentProps } from './types';
import { drawerContentStyle } from './styles';
import type { DrawerPlacement, DrawerSize } from './types';

const SIZE_MAP: Record<DrawerPlacement, Record<DrawerSize, ViewStyle>> = {
  left: {
    sm: { width: 240 },
    md: { width: 320 },
    lg: { width: 400 },
    full: { width: '100%' },
  },
  right: {
    sm: { width: 240 },
    md: { width: 320 },
    lg: { width: 400 },
    full: { width: '100%' },
  },
  top: {
    sm: { height: 200 },
    md: { height: 300 },
    lg: { height: 400 },
    full: { height: '100%' },
  },
  bottom: {
    sm: { height: 200 },
    md: { height: 300 },
    lg: { height: 400 },
    full: { height: '100%' },
  },
};

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof View>,
  DrawerContentProps
>(({ className, style, ...props }, ref) => {
  const { placement, size } = useDrawerContext();
  const sizeStyle = SIZE_MAP[placement][size];

  return (
    <View
      ref={ref}
      className={drawerContentStyle({ placement, class: className })}
      style={[sizeStyle, style]}
      {...props}
    />
  );
});

DrawerContent.displayName = 'DrawerContent';
