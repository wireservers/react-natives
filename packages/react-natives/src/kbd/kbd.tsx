import React from 'react';
import { View, Text } from 'react-native';
import type { KbdProps } from './types';
import { kbdStyle, kbdTextStyle } from './styles';

export const Kbd = React.forwardRef<
  React.ElementRef<typeof View>,
  KbdProps
>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={kbdStyle({ class: className })} {...props}>
      {typeof children === 'string' ? (
        <Text className={kbdTextStyle({})}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});

Kbd.displayName = 'Kbd';
