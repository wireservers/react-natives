import React from 'react';
import { Text } from 'react-native';
import { useAvatarContext } from './avatar';
import type { AvatarFallbackTextProps } from './types';
import { avatarFallbackTextStyle } from './styles';

export const AvatarFallbackText = React.forwardRef<
  React.ElementRef<typeof Text>,
  AvatarFallbackTextProps
>(({ className, children, ...props }, ref) => {
  const { size } = useAvatarContext();

  const initials =
    typeof children === 'string'
      ? children
          .split(' ')
          .map((w) => w[0])
          .join('')
          .slice(0, 2)
      : children;

  return (
    <Text
      ref={ref}
      className={avatarFallbackTextStyle({ size, class: className })}
      {...props}
    >
      {initials}
    </Text>
  );
});

AvatarFallbackText.displayName = 'AvatarFallbackText';
