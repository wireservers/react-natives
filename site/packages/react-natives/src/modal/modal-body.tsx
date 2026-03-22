import React from 'react';
import { View } from 'react-native';
import type { ModalBodyProps } from './types';
import { modalBodyStyle } from './styles';

export const ModalBody = React.forwardRef<
  React.ElementRef<typeof View>,
  ModalBodyProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={modalBodyStyle({ class: className })}
      {...props}
    />
  );
});

ModalBody.displayName = 'ModalBody';
