import React from 'react';
import { Pressable } from 'react-native';
import { useModalContext } from './modal';
import type { ModalBackdropProps } from './types';
import { modalBackdropStyle } from './styles';

export const ModalBackdrop = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ModalBackdropProps
>(({ className, ...props }, ref) => {
  const { onClose, closeOnOverlayClick } = useModalContext();

  return (
    <Pressable
      ref={ref}
      onPress={closeOnOverlayClick ? onClose : undefined}
      className={modalBackdropStyle({ class: className })}
      {...props}
    />
  );
});

ModalBackdrop.displayName = 'ModalBackdrop';
