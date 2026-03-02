import React from 'react';
import { View } from 'react-native';
import type { AspectRatioProps } from './types';
import { aspectRatioStyle } from './styles';

export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof View>,
  AspectRatioProps
>(({ className, ratio = 1, style, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={aspectRatioStyle({ class: className })}
      style={[{ aspectRatio: ratio }, style]}
      {...props}
    />
  );
});

AspectRatio.displayName = 'AspectRatio';
