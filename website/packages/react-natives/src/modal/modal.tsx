import React from 'react';
import {
  Modal as RNModal,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ModalProps, ModalContextValue } from './types';

export const [ModalProvider, useModalContext] =
  createComponentContext<ModalContextValue>('Modal');

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  avoidKeyboard = false,
  children,
}) => {
  const content = (
    <View className="flex-1 items-center justify-center">{children}</View>
  );

  return (
    <ModalProvider value={{ isOpen, onClose, size, closeOnOverlayClick }}>
      <RNModal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        {avoidKeyboard ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            {content}
          </KeyboardAvoidingView>
        ) : (
          content
        )}
      </RNModal>
    </ModalProvider>
  );
};

Modal.displayName = 'Modal';
