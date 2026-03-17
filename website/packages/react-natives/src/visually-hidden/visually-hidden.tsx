import React from 'react';
import { View } from 'react-native';
import type { VisuallyHiddenProps } from './types';
import { visuallyHiddenStyle } from './styles';

export const VisuallyHidden = React.forwardRef<
  React.ElementRef<typeof View>,
  VisuallyHiddenProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      accessibilityElementsHidden={false}
      importantForAccessibility="yes"
      className={visuallyHiddenStyle({ class: className })}
      style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}
      {...props}
    />
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';
