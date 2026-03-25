import React from 'react';
import { Text } from 'react-native';
import { useToastItemContext } from './toast';
import type { ToastDescriptionProps } from './types';
import { toastDescriptionStyle } from './styles';

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => {
  const { status, variant } = useToastItemContext();

  return (
    <Text
      ref={ref}
      className={toastDescriptionStyle({ status, variant, class: className })}
      {...props}
    />
  );
});

ToastDescription.displayName = 'ToastDescription';
