import React from 'react';
import { Text } from 'react-native';
import { useButtonContext } from './button';
import type { ButtonTextProps } from './types';
import { buttonTextStyle } from './styles';

export const ButtonText = React.forwardRef<
  React.ElementRef<typeof Text>,
  ButtonTextProps
>(({ className, variant, size, action, ...props }, ref) => {
  const parent = useButtonContext();

  return (
    <Text
      ref={ref}
      {...props}
      className={buttonTextStyle({
        action: action ?? parent.action,
        variant: variant ?? parent.variant,
        size: size ?? parent.size,
        class: className,
      })}
    />
  );
});

ButtonText.displayName = 'ButtonText';
