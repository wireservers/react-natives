import React from 'react';
import { View } from 'react-native';
import type { StackProps, VStackProps, HStackProps } from './types';
import { stackStyle } from './styles';

export const Stack = React.forwardRef<
  React.ElementRef<typeof View>,
  StackProps
>(({ className, direction, space, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={stackStyle({ direction, space, class: className })}
      {...props}
    />
  );
});

Stack.displayName = 'Stack';

export const VStack = React.forwardRef<
  React.ElementRef<typeof View>,
  VStackProps
>(({ className, space, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={stackStyle({ direction: 'column', space, class: className })}
      {...props}
    />
  );
});

VStack.displayName = 'VStack';

export const HStack = React.forwardRef<
  React.ElementRef<typeof View>,
  HStackProps
>(({ className, space, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={stackStyle({ direction: 'row', space, class: className })}
      {...props}
    />
  );
});

HStack.displayName = 'HStack';
