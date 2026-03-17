import React, { useMemo } from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ProgressProps, ProgressContextValue } from './types';
import { progressStyle } from './styles';

export const [ProgressProvider, useProgressContext] =
  createComponentContext<ProgressContextValue>('Progress');

export const Progress = React.forwardRef<
  React.ElementRef<typeof View>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      min = 0,
      max = 100,
      size = 'md',
      colorScheme = 'primary',
      children,
      ...props
    },
    ref,
  ) => {
    const percentage = useMemo(() => {
      const clamped = Math.min(Math.max(value, min), max);
      return ((clamped - min) / (max - min)) * 100;
    }, [value, min, max]);

    return (
      <ProgressProvider
        value={{ value, min, max, size, colorScheme, percentage }}
      >
        <View
          ref={ref}
          role="progressbar"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className={progressStyle({ size, class: className })}
          {...props}
        >
          {children}
        </View>
      </ProgressProvider>
    );
  },
);

Progress.displayName = 'Progress';
