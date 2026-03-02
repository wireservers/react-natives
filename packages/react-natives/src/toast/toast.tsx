import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ToastProps, ToastStatus, ToastVariant } from './types';
import { toastStyle } from './styles';

export interface ToastItemContextValue {
  status: ToastStatus;
  variant: ToastVariant;
}

export const [ToastItemProvider, useToastItemContext] =
  createComponentContext<ToastItemContextValue>('ToastItem');

export const Toast = React.forwardRef<
  React.ElementRef<typeof View>,
  ToastProps
>(
  (
    {
      className,
      status = 'info',
      variant = 'subtle',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <ToastItemProvider value={{ status, variant }}>
        <View
          ref={ref}
          className={toastStyle({ status, variant, class: className })}
          {...props}
        >
          {children}
        </View>
      </ToastItemProvider>
    );
  },
);

Toast.displayName = 'Toast';
