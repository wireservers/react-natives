import type { View, Pressable } from 'react-native';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
  placement: DrawerPlacement;
  size: DrawerSize;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  children: React.ReactNode;
}

export interface DrawerBackdropProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface DrawerHeaderProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface DrawerBodyProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface DrawerFooterProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface DrawerCloseButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
