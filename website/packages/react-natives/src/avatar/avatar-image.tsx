import React from 'react';
import { Image } from 'react-native';
import type { AvatarImageProps } from './types';
import { avatarImageStyle } from './styles';

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  AvatarImageProps
>(({ className, source, alt, ...props }, ref) => {
  return (
    <Image
      ref={ref}
      source={source as any}
      accessibilityLabel={alt}
      className={avatarImageStyle({ class: className })}
      {...props}
    />
  );
});

AvatarImage.displayName = 'AvatarImage';
