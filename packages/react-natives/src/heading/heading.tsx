import React from 'react';
import { Text } from 'react-native';
import type { HeadingProps } from './types';
import { headingStyle } from './styles';

export const Heading = React.forwardRef<
  React.ElementRef<typeof Text>,
  HeadingProps
>(({ className, size, isTruncated, numberOfLines, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      role="heading"
      numberOfLines={isTruncated ? 1 : numberOfLines}
      className={headingStyle({ size, isTruncated, class: className })}
      {...props}
    />
  );
});

Heading.displayName = 'Heading';
