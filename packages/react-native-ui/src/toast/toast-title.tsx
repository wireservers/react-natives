import React from 'react';
import { Text } from 'react-native';
import { useToastItemContext } from './toast';
import type { ToastTitleProps } from './types';
import { toastTitleStyle } from './styles';

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  ToastTitleProps
>(({ className, ...props }, ref) => {
  const { status, variant } = useToastItemContext();

  return (
    <Text
      ref={ref}
      className={toastTitleStyle({ status, variant, class: className })}
      {...props}
    />
  );
});

ToastTitle.displayName = 'ToastTitle';
