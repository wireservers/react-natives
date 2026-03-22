import type { View, Pressable } from 'react-native';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export type DrawerAnimationType = 'slide' | 'fade' | 'none';

/** Direction the drawer panel slides in from. When set, overrides animationType with a custom directional animation. */
export type DrawerSlideFrom = 'top' | 'left' | 'bottom' | 'right';

export interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
  placement: DrawerPlacement;
  size: DrawerSize;
  animationType: DrawerAnimationType;
  slideFrom?: DrawerSlideFrom;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  animationType?: DrawerAnimationType;
  /** Slide the drawer panel in from this direction (custom animation; overrides animationType). */
  slideFrom?: DrawerSlideFrom;
  /** When false the drawer renders inline (no RNModal) so background content stays interactive. */
  isModal?: boolean;
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
