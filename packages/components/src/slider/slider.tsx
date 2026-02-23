import React, { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import { useFormControlContext } from '../form-control/form-control';
import type { SliderProps, SliderContextValue, SliderSize } from './types';
import { sliderStyle } from './styles';

export const [SliderProvider, useSliderContext] =
  createComponentContext<SliderContextValue>('Slider');

export const Slider = React.forwardRef<
  React.ElementRef<typeof View>,
  SliderProps
>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
      size = 'md',
      isDisabled: isDisabledProp,
      onValueChange,
      onSlidingComplete,
      children,
      ...props
    },
    ref,
  ) => {
    const formControl = useFormControlContext();
    const isDisabled = isDisabledProp ?? formControl?.isDisabled ?? false;
    const resolvedSize = size ?? (formControl?.size as SliderSize) ?? 'md';

    const [internalValue, setInternalValue] = useState(defaultValue);
    const [trackLayout, setTrackLayout] = useState({ width: 0, height: 0 });

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // Clamp value to min/max
    const clampedValue = Math.min(Math.max(value, min), max);
    const percentage =
      max === min ? 0 : ((clampedValue - min) / (max - min)) * 100;

    const handleValueChange = useCallback(
      (newValue: number) => {
        // Snap to step
        const stepped = Math.round((newValue - min) / step) * step + min;
        const clamped = Math.min(Math.max(stepped, min), max);

        if (!isControlled) {
          setInternalValue(clamped);
        }
        onValueChange?.(clamped);
      },
      [min, max, step, isControlled, onValueChange],
    );

    const contextValue = useMemo<SliderContextValue>(
      () => ({
        value: clampedValue,
        min,
        max,
        step,
        size: resolvedSize,
        isDisabled,
        orientation,
        percentage,
        onValueChange: handleValueChange,
        onSlidingComplete,
        trackLayout,
        setTrackLayout,
      }),
      [
        clampedValue,
        min,
        max,
        step,
        resolvedSize,
        isDisabled,
        orientation,
        percentage,
        handleValueChange,
        onSlidingComplete,
        trackLayout,
      ],
    );

    return (
      <SliderProvider value={contextValue}>
        <View
          ref={ref}
          className={sliderStyle({
            orientation,
            isDisabled,
            class: className,
          })}
          accessible
          accessibilityRole="adjustable"
          accessibilityValue={{
            min,
            max,
            now: clampedValue,
          }}
          {...props}
        >
          {children}
        </View>
      </SliderProvider>
    );
  },
);

Slider.displayName = 'Slider';
