import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { RatingProps, RatingIconProps, RatingContextValue } from './types';
import { ratingStyle, ratingIconStyle } from './styles';

export const [RatingProvider, useRatingContext] =
  createComponentContext<RatingContextValue>('Rating');

const sizeToFontSize = { sm: 16, md: 20, lg: 24, xl: 32 };

export const Rating = React.forwardRef<
  React.ElementRef<typeof View>,
  RatingProps
>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      size = 'md',
      isReadOnly = false,
      onChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const onRate = (v: number) => {
      if (!isReadOnly) {
        setInternalValue(v);
        onChange?.(v);
      }
    };
    return (
      <RatingProvider value={{ value, max, size, isReadOnly, onRate }}>
        <View
          ref={ref}
          className={ratingStyle({ class: className })}
          accessibilityRole="adjustable"
          accessibilityValue={{ min: 0, max, now: value }}
          {...props}
        >
          {children ??
            Array.from({ length: max }, (_, i) => (
              <RatingIcon key={i} index={i} />
            ))}
        </View>
      </RatingProvider>
    );
  },
);
Rating.displayName = 'Rating';

export const RatingIcon = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  RatingIconProps
>(
  (
    { className, index, filledIcon: FilledIcon, emptyIcon: EmptyIcon, ...props },
    ref,
  ) => {
    const { value, size, isReadOnly, onRate } = useRatingContext();
    const isFilled = index < value;
    const fontSize = sizeToFontSize[size];
    return (
      <Pressable
        ref={ref}
        onPress={() => onRate(index + 1)}
        disabled={isReadOnly}
        className={className}
        {...props}
      >
        {FilledIcon && isFilled ? (
          <FilledIcon className={ratingIconStyle({ size })} />
        ) : EmptyIcon && !isFilled ? (
          <EmptyIcon className={ratingIconStyle({ size })} />
        ) : (
          <Text
            style={{ fontSize, color: isFilled ? '#F59E0B' : '#D1D5DB' }}
          >
            {'\u2605'}
          </Text>
        )}
      </Pressable>
    );
  },
);
RatingIcon.displayName = 'RatingIcon';
