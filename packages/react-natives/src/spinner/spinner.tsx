import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { SpinnerProps } from './types';
import { spinnerStyle } from './styles';

const sizeMap = {
  sm: 'small' as const,
  md: 'small' as const,
  lg: 'large' as const,
};

export const Spinner = React.forwardRef<
  React.ElementRef<typeof View>,
  SpinnerProps
>(({ className, size = 'md', color, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={spinnerStyle({ size, class: className })}
      aria-label="loading"
      role="progressbar"
      {...props}
    >
      <ActivityIndicator size={sizeMap[size]} color={color} />
    </View>
  );
});

Spinner.displayName = 'Spinner';
