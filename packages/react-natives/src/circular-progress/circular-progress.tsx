import React from 'react';
import { View, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { CircularProgressProps, CircularProgressLabelProps, CircularProgressContextValue } from './types';
import { circularProgressStyle, circularProgressLabelStyle } from './styles';
import { BRAND_COLOR } from '../utils/brand';

export const [CircularProgressProvider, useCircularProgressContext] =
  createComponentContext<CircularProgressContextValue>('CircularProgress');

const sizeMap = { sm: 32, md: 48, lg: 64, xl: 96 };
const strokeMap = { sm: 3, md: 4, lg: 5, xl: 6 };

export const CircularProgress = React.forwardRef<
  React.ElementRef<typeof View>,
  CircularProgressProps
>(({ className, value = 0, size = 'md', children, ...props }, ref) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const dim = sizeMap[size];
  const stroke = strokeMap[size];


  return (
    <CircularProgressProvider value={{ value: clampedValue, size }}>
      <View
        ref={ref}
        className={circularProgressStyle({ size, class: className })}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
        {...props}
      >
        <View style={{ width: dim, height: dim, transform: [{ rotate: '-90deg' }] }}>
          <View
            style={{
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              borderWidth: stroke,
              borderColor: '#E5E7EB',
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              borderWidth: stroke,
              borderColor: 'transparent',
              borderTopColor: BRAND_COLOR,
              borderRightColor: clampedValue > 25 ? BRAND_COLOR : 'transparent',
              borderBottomColor: clampedValue > 50 ? BRAND_COLOR : 'transparent',
              borderLeftColor: clampedValue > 75 ? BRAND_COLOR : 'transparent',
            }}
          />
        </View>
        {children}
      </View>
    </CircularProgressProvider>
  );
});

CircularProgress.displayName = 'CircularProgress';

export const CircularProgressLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  CircularProgressLabelProps
>(({ className, children, ...props }, ref) => {
  const { value, size } = useCircularProgressContext();

  return (
    <Text
      ref={ref}
      className={circularProgressLabelStyle({ size, class: className })}
      {...props}
    >
      {children ?? `${value}%`}
    </Text>
  );
});

CircularProgressLabel.displayName = 'CircularProgressLabel';
