import React from 'react';
import { Pressable, Text } from 'react-native';
import { useModalContext } from './modal';
import type { ModalCloseButtonProps } from './types';
import { modalCloseButtonStyle } from './styles';

export const ModalCloseButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ModalCloseButtonProps
>(({ className, children, ...props }, ref) => {
  const { onClose } = useModalContext();

  return (
    <Pressable
      ref={ref}
      onPress={onClose}
      accessibilityRole="button"
      accessibilityLabel="Close"
      className={modalCloseButtonStyle({ class: className })}
      {...props}
    >
      {children ?? (
        <Text className="text-typography-500 text-lg leading-none">✕</Text>
      )}
    </Pressable>
  );
});

ModalCloseButton.displayName = 'ModalCloseButton';
