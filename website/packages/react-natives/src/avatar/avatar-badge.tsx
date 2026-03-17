import React from 'react';
import { View } from 'react-native';
import { useAvatarContext } from './avatar';
import type { AvatarBadgeProps } from './types';
import { avatarBadgeStyle } from './styles';

export const AvatarBadge = React.forwardRef<
  React.ElementRef<typeof View>,
  AvatarBadgeProps
>(({ className, ...props }, ref) => {
  const { size } = useAvatarContext();

  return (
    <View
      ref={ref}
      className={avatarBadgeStyle({ size, class: className })}
      {...props}
    />
  );
});

AvatarBadge.displayName = 'AvatarBadge';
