import React from 'react';
import { View } from 'react-native';
import type { ModalHeaderProps } from './types';
import { modalHeaderStyle } from './styles';

export const ModalHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  ModalHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={modalHeaderStyle({ class: className })}
      {...props}
    />
  );
});

ModalHeader.displayName = 'ModalHeader';
