import type { View, Pressable } from 'react-native';

export type AlertDialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';

export interface AlertDialogContextValue {
  isOpen: boolean;
  onClose: () => void;
  size: AlertDialogSize;
}

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  size?: AlertDialogSize;
  children: React.ReactNode;
}

export interface AlertDialogBackdropProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface AlertDialogHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface AlertDialogBodyProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface AlertDialogFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface AlertDialogCloseButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
