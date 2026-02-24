import React from 'react';
import { View } from 'react-native';
import { useProgressContext } from './progress';
import type { ProgressFilledTrackProps } from './types';
import { progressFilledTrackStyle } from './styles';

export const ProgressFilledTrack = React.forwardRef<
  React.ElementRef<typeof View>,
  ProgressFilledTrackProps
>(({ className, ...props }, ref) => {
  const { colorScheme, percentage } = useProgressContext();

  return (
    <View
      ref={ref}
      className={progressFilledTrackStyle({
        colorScheme,
        class: className,
      })}
      style={{ width: `${percentage}%` }}
      {...props}
    />
  );
});

ProgressFilledTrack.displayName = 'ProgressFilledTrack';
