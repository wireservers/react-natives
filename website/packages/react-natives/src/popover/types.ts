import type { View, Pressable } from 'react-native';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverContextValue {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  placement: PopoverPlacement;
}

export interface PopoverProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  placement?: PopoverPlacement;
  children: React.ReactNode;
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface PopoverArrowProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface PopoverHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface PopoverBodyProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface PopoverFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface PopoverCloseButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
