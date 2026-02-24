import React from 'react';
import { View } from 'react-native';
import type { ModalFooterProps } from './types';
import { modalFooterStyle } from './styles';

export const ModalFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  ModalFooterProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={modalFooterStyle({ class: className })}
      {...props}
    />
  );
});

ModalFooter.displayName = 'ModalFooter';
