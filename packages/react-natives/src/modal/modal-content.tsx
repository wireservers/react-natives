import React from 'react';
import { View } from 'react-native';
import { useModalContext } from './modal';
import type { ModalContentProps } from './types';
import { modalContentStyle } from './styles';

export const ModalContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ModalContentProps
>(({ className, ...props }, ref) => {
  const { size } = useModalContext();

  return (
    <View
      ref={ref}
      className={modalContentStyle({ size, class: className })}
      {...props}
    />
  );
});

ModalContent.displayName = 'ModalContent';
