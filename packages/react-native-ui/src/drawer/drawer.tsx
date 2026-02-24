import React from 'react';
import { Modal as RNModal, View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { DrawerProps, DrawerContextValue } from './types';

export const [DrawerProvider, useDrawerContext] =
  createComponentContext<DrawerContextValue>('Drawer');

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'left',
  size = 'md',
  children,
}) => {
  return (
    <DrawerProvider value={{ isOpen, onClose, placement, size }}>
      <RNModal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <View className="flex-1">{children}</View>
      </RNModal>
    </DrawerProvider>
  );
};

Drawer.displayName = 'Drawer';
