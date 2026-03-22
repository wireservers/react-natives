import React from 'react';
import { Text } from 'react-native';
import type { TooltipTextProps } from './types';
import { tooltipTextStyle } from './styles';

export const TooltipText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TooltipTextProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={tooltipTextStyle({ class: className })}
      {...props}
    />
  );
});

TooltipText.displayName = 'TooltipText';
