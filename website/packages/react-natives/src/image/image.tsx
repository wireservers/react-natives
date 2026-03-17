import React from 'react';
import { Image as RNImage } from 'react-native';
import type { ImageProps } from './types';
import { imageStyle } from './styles';

export const Image = React.forwardRef<
  React.ElementRef<typeof RNImage>,
  ImageProps
>(({ className, size, borderRadius, alt, ...props }, ref) => {
  return (
    <RNImage
      ref={ref}
      accessibilityLabel={alt}
      className={imageStyle({ size, borderRadius, class: className })}
      {...props}
    />
  );
});

Image.displayName = 'Image';
