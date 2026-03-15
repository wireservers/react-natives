import type { View, Pressable } from 'react-native';

export interface CollapsibleContextValue {
  isOpen: boolean;
  onToggle: () => void;
}

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
