import React from 'react';
import { Modal as RNModal, View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ActionSheetProps, ActionSheetContextValue } from './types';

export const [ActionSheetProvider, useActionSheetContext] =
  createComponentContext<ActionSheetContextValue>('ActionSheet');

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  isModal = true,
  children,
}) => {
  if (isModal) {
    return (
      <ActionSheetProvider value={{ isOpen, onClose }}>
        <RNModal
          visible={isOpen}
          transparent
          animationType="slide"
          onRequestClose={onClose}
          statusBarTranslucent
        >
          <View style={{ flex: 1, justifyContent: 'flex-end' }} pointerEvents="box-none">{children}</View>
        </RNModal>
      </ActionSheetProvider>
    );
  }

  if (!isOpen) return null;

  return (
    <ActionSheetProvider value={{ isOpen, onClose }}>
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, justifyContent: 'flex-end' }}
        pointerEvents="box-none"
      >
        {children}
      </View>
    </ActionSheetProvider>
  );
};

ActionSheet.displayName = 'ActionSheet';
