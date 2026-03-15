import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { AvatarProps, AvatarContextValue } from './types';
import { avatarStyle } from './styles';

export const [AvatarProvider, useAvatarContext] =
  createComponentContext<AvatarContextValue>('Avatar');

export const Avatar = React.forwardRef<
  React.ElementRef<typeof View>,
  AvatarProps
>(({ className, size = 'md', children, ...props }, ref) => {
  return (
    <AvatarProvider value={{ size }}>
      <View
        ref={ref}
        className={avatarStyle({ size, class: className })}
        {...props}
      >
        {children}
      </View>
    </AvatarProvider>
  );
});

Avatar.displayName = 'Avatar';
