import React from 'react';
import { Modal as RNModal, View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ActionSheetProps, ActionSheetContextValue } from './types';

export const [ActionSheetProvider, useActionSheetContext] =
  createComponentContext<ActionSheetContextValue>('ActionSheet');

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <ActionSheetProvider value={{ isOpen, onClose }}>
      <RNModal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <View className="flex-1 justify-end">{children}</View>
      </RNModal>
    </ActionSheetProvider>
  );
};

ActionSheet.displayName = 'ActionSheet';
