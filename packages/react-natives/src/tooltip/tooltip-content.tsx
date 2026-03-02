import React from 'react';
import { View } from 'react-native';
import type { TooltipContentProps } from './types';
import { tooltipContentStyle } from './styles';

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof View>,
  TooltipContentProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={tooltipContentStyle({ class: className })}
      {...props}
    />
  );
});

TooltipContent.displayName = 'TooltipContent';
