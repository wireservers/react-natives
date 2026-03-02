import type { View, Pressable, Text as RNText } from 'react-native';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';

export interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  size: ModalSize;
  closeOnOverlayClick: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  avoidKeyboard?: boolean;
  children: React.ReactNode;
}

export interface ModalBackdropProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface ModalHeaderProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface ModalBodyProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface ModalFooterProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface ModalCloseButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
