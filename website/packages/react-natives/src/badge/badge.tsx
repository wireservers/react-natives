import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { BadgeProps, BadgeContextValue } from './types';
import { badgeStyle } from './styles';

export const [BadgeProvider, useBadgeContext] =
  createComponentContext<BadgeContextValue>('Badge');

export const Badge = React.forwardRef<
  React.ElementRef<typeof View>,
  BadgeProps
>(
  (
    {
      action = 'info',
      variant = 'subtle',
      size = 'md',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <BadgeProvider value={{ action, variant, size }}>
        <View
          ref={ref}
          className={badgeStyle({ action, variant, size, class: className })}
          {...props}
        >
          {children}
        </View>
      </BadgeProvider>
    );
  },
);

Badge.displayName = 'Badge';
