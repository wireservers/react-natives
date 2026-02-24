import React from 'react';
import { View } from 'react-native';
import { useSliderContext } from './slider';
import type { SliderThumbProps } from './types';
import { sliderThumbStyle } from './styles';

const THUMB_SIZE: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const SliderThumb = React.forwardRef<
  React.ElementRef<typeof View>,
  SliderThumbProps
>(({ className, style, ...props }, ref) => {
  const { size, percentage, orientation, trackLayout } = useSliderContext();

  const thumbSize = THUMB_SIZE[size] ?? 20;

  const trackDimension =
    orientation === 'horizontal' ? trackLayout.width : trackLayout.height;
  const offset = (percentage / 100) * trackDimension - thumbSize / 2;

  const positionStyle =
    orientation === 'horizontal'
      ? {
          left: offset,
          top: '50%' as const,
          transform: [{ translateY: -thumbSize / 2 }],
        }
      : {
          bottom: offset,
          left: '50%' as const,
          transform: [{ translateX: -thumbSize / 2 }],
        };

  return (
    <View
      ref={ref}
      className={sliderThumbStyle({ size, class: className })}
      style={[positionStyle, style]}
      accessible
      accessibilityRole="adjustable"
      {...props}
    />
  );
});

SliderThumb.displayName = 'SliderThumb';
