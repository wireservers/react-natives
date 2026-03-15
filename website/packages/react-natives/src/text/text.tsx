import React from 'react';
import { Text as RNText } from 'react-native';
import type { TextProps } from './types';
import { textStyle } from './styles';

export const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  TextProps
>(
  (
    {
      className,
      size,
      weight,
      isTruncated,
      bold,
      italic,
      underline,
      strikeThrough,
      highlight,
      sub,
      sup,
      numberOfLines,
      ...props
    },
    ref,
  ) => {
    return (
      <RNText
        ref={ref}
        numberOfLines={isTruncated ? 1 : numberOfLines}
        className={textStyle({
          size,
          weight,
          isTruncated,
          bold,
          italic,
          underline,
          strikeThrough,
          highlight,
          sub,
          sup,
          class: className,
        })}
        {...props}
      />
    );
  },
);

Text.displayName = 'Text';
