import React from 'react';
import { View } from 'react-native';
import { useSliderContext } from './slider';
import type { SliderFilledTrackProps } from './types';
import { sliderFilledTrackStyle } from './styles';

export const SliderFilledTrack = React.forwardRef<
  React.ElementRef<typeof View>,
  SliderFilledTrackProps
>(({ className, style, ...props }, ref) => {
  const { orientation, percentage } = useSliderContext();

  const dynamicStyle =
    orientation === 'horizontal'
      ? { width: `${percentage}%` as const }
      : { height: `${percentage}%` as const };

  return (
    <View
      ref={ref}
      className={sliderFilledTrackStyle({
        orientation,
        class: className,
      })}
      style={[dynamicStyle, style]}
      {...props}
    />
  );
});

SliderFilledTrack.displayName = 'SliderFilledTrack';
