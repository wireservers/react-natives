import React, { useCallback } from 'react';
import { Linking, Pressable } from 'react-native';
import type { LinkProps } from './types';
import { linkStyle } from './styles';

export const Link = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  LinkProps
>(({ className, href, isExternal, onPress, ...props }, ref) => {
  const handlePress = useCallback(
    (e: any) => {
      onPress?.(e);
      if (href && isExternal) {
        Linking.openURL(href);
      }
    },
    [href, isExternal, onPress],
  );

  return (
    <Pressable
      ref={ref}
      role="link"
      onPress={handlePress}
      className={linkStyle({ class: className })}
      {...props}
    />
  );
});

Link.displayName = 'Link';
