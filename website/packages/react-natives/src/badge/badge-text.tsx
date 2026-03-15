import React from 'react';
import { Text } from 'react-native';
import { useBadgeContext } from './badge';
import type { BadgeTextProps } from './types';
import { badgeTextStyle } from './styles';

export const BadgeText = React.forwardRef<
  React.ElementRef<typeof Text>,
  BadgeTextProps
>(({ className, children, ...props }, ref) => {
  const { action, variant, size } = useBadgeContext();

  return (
    <Text
      ref={ref}
      className={badgeTextStyle({ action, variant, size, class: className })}
      {...props}
    >
      {children}
    </Text>
  );
});

BadgeText.displayName = 'BadgeText';
