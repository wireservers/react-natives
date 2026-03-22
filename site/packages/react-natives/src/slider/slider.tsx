import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Platform } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import { useFormControlContext } from '../form-control/form-control';
import type { SliderProps, SliderContextValue, SliderSize } from './types';
import { sliderStyle } from './styles';

const isWeb = Platform.OS === 'web';

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

    // --- Web pointer event handlers (bypass RN Responder system) ---
    const lastValueRef = useRef(clampedValue);
    lastValueRef.current = clampedValue;

    const calcValue = useCallback(
      (el: any, clientX: number, clientY: number) => {
        const rect = el?.getBoundingClientRect?.();
        if (!rect) return clampedValue;
        const dimension =
          orientation === 'horizontal' ? rect.width : rect.height;
        if (dimension === 0) return clampedValue;
        const relativePos =
          orientation === 'horizontal'
            ? clientX - rect.left
            : rect.height - (clientY - rect.top);
        const ratio = Math.min(Math.max(relativePos / dimension, 0), 1);
        const rawValue = min + ratio * (max - min);
        const stepped =
          Math.round((rawValue - min) / step) * step + min;
        return Math.min(Math.max(stepped, min), max);
      },
      [orientation, min, max, step, clampedValue],
    );

    const onPointerDown = useCallback(
      (e: any) => {
        if (isDisabled) return;
        e.preventDefault();
        const el = e.currentTarget;
        el?.setPointerCapture?.(e.pointerId);
        if (el?.style) el.style.cursor = 'grabbing';
        const val = calcValue(el, e.clientX, e.clientY);
        lastValueRef.current = val;
        handleValueChange(val);
      },
      [isDisabled, calcValue, handleValueChange],
    );

    const onPointerMove = useCallback(
      (e: any) => {
        const el = e.currentTarget;
        if (!el?.hasPointerCapture?.(e.pointerId)) return;
        const val = calcValue(el, e.clientX, e.clientY);
        lastValueRef.current = val;
        handleValueChange(val);
      },
      [calcValue, handleValueChange],
    );

    const onPointerUp = useCallback(
      (e: any) => {
        const el = e.currentTarget;
        if (el?.releasePointerCapture) {
          try {
            el.releasePointerCapture(e.pointerId);
          } catch (_) {
            /* already released */
          }
        }
        if (el?.style) el.style.cursor = 'pointer';
        onSlidingComplete?.(lastValueRef.current);
      },
      [onSlidingComplete],
    );

    const webHandlers = isWeb
      ? { onPointerDown, onPointerMove, onPointerUp }
      : {};
    const webStyle = isWeb
      ? ({ touchAction: 'none', userSelect: 'none', cursor: 'pointer' } as any)
      : undefined;

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
          style={webStyle}
          {...webHandlers}
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
