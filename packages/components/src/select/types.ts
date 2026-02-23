import type { View, Text as RNText, Pressable, ScrollView } from 'react-native';

export type SelectSize = 'sm' | 'md' | 'lg' | 'xl';
export type SelectVariant = 'outline' | 'filled' | 'underlined' | 'rounded';

export interface SelectContextValue {
  isOpen: boolean;
  selectedValue: string | null;
  selectedLabel: string;
  size: SelectSize;
  variant: SelectVariant;
  isDisabled: boolean;
  isInvalid: boolean;
  onOpen: () => void;
  onClose: () => void;
  onValueChange: (value: string, label: string) => void;
}

export interface SelectProps {
  className?: string;
  selectedValue?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SelectSize;
  variant?: SelectVariant;
  isDisabled?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  children: React.ReactNode;
}

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface SelectInputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  placeholder?: string;
}

export interface SelectIconProps {
  as?: React.ElementType;
  className?: string;
}

export interface SelectPortalProps {
  children: React.ReactNode;
}

export interface SelectBackdropProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  label: string;
  value: string;
  isDisabled?: boolean;
}

export interface SelectItemTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface SelectDragIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface SelectScrollViewProps
  extends React.ComponentPropsWithoutRef<typeof ScrollView> {
  className?: string;
}
