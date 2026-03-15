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
  animationType = 'slide',
  slideFrom,
  isModal = true,
  children,
}) => {
  const ctx: DrawerContextValue = { isOpen, onClose, placement, size, animationType, slideFrom };

  // When a directional slide is requested, suppress RNModal's built-in animation.
  const rnAnimationType = slideFrom ? 'none' : animationType;

  if (isModal) {
    return (
      <DrawerProvider value={ctx}>
        <RNModal
          visible={isOpen}
          transparent
          animationType={rnAnimationType}
          onRequestClose={onClose}
          statusBarTranslucent
        >
          <View style={{ flex: 1 }} pointerEvents="box-none">{children}</View>
        </RNModal>
      </DrawerProvider>
    );
  }

  if (!isOpen) return null;

  return (
    <DrawerProvider value={ctx}>
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}
        pointerEvents="box-none"
      >
        {children}
      </View>
    </DrawerProvider>
  );
};

Drawer.displayName = 'Drawer';
