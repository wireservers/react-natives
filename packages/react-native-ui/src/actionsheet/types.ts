import type { View, Pressable, Text as RNText, ScrollView } from 'react-native';

export interface ActionSheetContextValue {
  isOpen: boolean;
  onClose: () => void;
}

export interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ActionSheetBackdropProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface ActionSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface ActionSheetDragIndicatorWrapperProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface ActionSheetDragIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface ActionSheetItemProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface ActionSheetItemTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface ActionSheetScrollViewProps
  extends React.ComponentPropsWithoutRef<typeof ScrollView> {
  className?: string;
}
