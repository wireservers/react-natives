import React from 'react';
import { Modal } from 'react-native';
import { ThemeScopeBridge } from '../theme-scope';
import { useSelectContext } from './select';
import type { SelectPortalProps } from './types';

export const SelectPortal: React.FC<SelectPortalProps> = ({ children }) => {
  const { isOpen, onClose } = useSelectContext();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <ThemeScopeBridge>
        {children}
      </ThemeScopeBridge>
    </Modal>
  );
};

SelectPortal.displayName = 'SelectPortal';
