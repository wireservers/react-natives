import React from 'react';
import { Text } from 'react-native';
import type { LinkTextProps } from './types';
import { linkTextStyle } from './styles';

export const LinkText = React.forwardRef<
  React.ElementRef<typeof Text>,
  LinkTextProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={linkTextStyle({ class: className })}
      {...props}
    />
  );
});

LinkText.displayName = 'LinkText';
