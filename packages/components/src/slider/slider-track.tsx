import React, { useCallback, useRef } from 'react';
import { View, type LayoutChangeEvent, type GestureResponderEvent } from 'react-native';
import { useSliderContext } from './slider';
import type { SliderTrackProps } from './types';
import { sliderTrackStyle } from './styles';

export const SliderTrack = React.forwardRef<
  React.ElementRef<typeof View>,
  SliderTrackProps
>(({ className, children, ...props }, ref) => {
  const {
    size,
    orientation,
    isDisabled,
    min,
    max,
    step,
    trackLayout,
    setTrackLayout,
    onValueChange,
    onSlidingComplete,
    value,
  } = useSliderContext();

  const trackRef = useRef<View>(null);
  const trackPageOffset = useRef({ x: 0, y: 0 });

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      setTrackLayout({ width, height });
    },
    [setTrackLayout],
  );

  const valueFromPosition = useCallback(
    (positionX: number, positionY: number) => {
      const dimension =
        orientation === 'horizontal' ? trackLayout.width : trackLayout.height;

      if (dimension === 0) return value;

      const relativePos =
        orientation === 'horizontal'
          ? positionX - trackPageOffset.current.x
          : trackLayout.height - (positionY - trackPageOffset.current.y);

      const ratio = Math.min(Math.max(relativePos / dimension, 0), 1);
      const rawValue = min + ratio * (max - min);

      // Snap to step
      const stepped = Math.round((rawValue - min) / step) * step + min;
      return Math.min(Math.max(stepped, min), max);
    },
    [orientation, trackLayout, min, max, step, value],
  );

  const handleStartShouldSetResponder = useCallback(() => {
    return !isDisabled;
  }, [isDisabled]);

  const handleMoveShouldSetResponder = useCallback(() => {
    return !isDisabled;
  }, [isDisabled]);

  const handleResponderGrant = useCallback(
    (e: GestureResponderEvent) => {
      // Measure the track's position on screen for accurate calculations
      if (trackRef.current) {
        trackRef.current.measureInWindow((x, y) => {
          trackPageOffset.current = { x: x ?? 0, y: y ?? 0 };
        });
      }

      // For the initial grant, use locationX/locationY which are relative
      // to the track view itself (no need for page offset calculation)
      const { locationX, locationY } = e.nativeEvent;
      const dimension =
        orientation === 'horizontal' ? trackLayout.width : trackLayout.height;

      if (dimension === 0) return;

      const relativePos =
        orientation === 'horizontal'
          ? locationX
          : trackLayout.height - locationY;

      const ratio = Math.min(Math.max(relativePos / dimension, 0), 1);
      const rawValue = min + ratio * (max - min);
      const stepped = Math.round((rawValue - min) / step) * step + min;
      const clamped = Math.min(Math.max(stepped, min), max);

      onValueChange(clamped);
    },
    [orientation, trackLayout, min, max, step, onValueChange],
  );

  const handleResponderMove = useCallback(
    (e: GestureResponderEvent) => {
      const { pageX, pageY } = e.nativeEvent;
      const newValue = valueFromPosition(pageX, pageY);
      onValueChange(newValue);
    },
    [valueFromPosition, onValueChange],
  );

  const handleResponderRelease = useCallback(
    (e: GestureResponderEvent) => {
      const { pageX, pageY } = e.nativeEvent;
      const newValue = valueFromPosition(pageX, pageY);
      onSlidingComplete?.(newValue);
    },
    [valueFromPosition, onSlidingComplete],
  );

  return (
    <View
      ref={(node) => {
        // Handle both the internal ref and the forwarded ref
        (trackRef as React.MutableRefObject<View | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<View | null>).current = node;
        }
      }}
      onLayout={handleLayout}
      onStartShouldSetResponder={handleStartShouldSetResponder}
      onMoveShouldSetResponder={handleMoveShouldSetResponder}
      onResponderGrant={handleResponderGrant}
      onResponderMove={handleResponderMove}
      onResponderRelease={handleResponderRelease}
      className={sliderTrackStyle({
        orientation,
        size,
        class: className,
      })}
      {...props}
    >
      {children}
    </View>
  );
});

SliderTrack.displayName = 'SliderTrack';
