import React from 'react';
import { Text } from 'react-native';
import { useAlertContext } from './alert';
import type { AlertTextProps } from './types';
import { alertTextStyle } from './styles';

export const AlertText = React.forwardRef<
  React.ElementRef<typeof Text>,
  AlertTextProps
>(({ className, ...props }, ref) => {
  const { status, variant } = useAlertContext();

  return (
    <Text
      ref={ref}
      className={alertTextStyle({ status, variant, class: className })}
      {...props}
    />
  );
});

AlertText.displayName = 'AlertText';
