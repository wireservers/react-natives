import React from 'react';
import { View } from 'react-native';
import type { ContainerProps } from './types';
import { containerStyle } from './styles';

export const Container = React.forwardRef<
  React.ElementRef<typeof View>,
  ContainerProps
>(({ className, size, centered, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={containerStyle({ size, centered, class: className })}
      {...props}
    />
  );
});

Container.displayName = 'Container';
