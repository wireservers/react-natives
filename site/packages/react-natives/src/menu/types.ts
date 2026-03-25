import type { View, Pressable } from 'react-native';

export interface MenuTriggerRect { pageX: number; pageY: number; width: number; height: number; }

export interface MenuContextValue {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  triggerRect: MenuTriggerRect;
  setTriggerRect: (rect: MenuTriggerRect) => void;
}

export interface MenuProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export interface MenuTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> { className?: string; }
export interface MenuContentProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  isDisabled?: boolean;
}
export interface MenuItemTextProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface MenuItemIconProps { as: React.ElementType; className?: string; }
export interface MenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface MenuGroupProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface MenuGroupTitleProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
