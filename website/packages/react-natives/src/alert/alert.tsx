import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { AlertProps, AlertContextValue } from './types';
import { alertStyle } from './styles';

export const [AlertProvider, useAlertContext] =
  createComponentContext<AlertContextValue>('Alert');

export const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  AlertProps
>(
  (
    { className, status = 'info', variant = 'subtle', children, ...props },
    ref,
  ) => {
    return (
      <AlertProvider value={{ status, variant }}>
        <View
          ref={ref}
          role="alert"
          className={alertStyle({ status, variant, class: className })}
          {...props}
        >
          {children}
        </View>
      </AlertProvider>
    );
  },
);

Alert.displayName = 'Alert';
