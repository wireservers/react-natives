import type { View, TextInput, Text as RNText } from 'react-native';

export type InputVariant = 'outline' | 'filled' | 'underlined' | 'rounded';
export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

export interface InputContextValue {
  variant: InputVariant;
  size: InputSize;
  isDisabled: boolean;
  isInvalid: boolean;
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  variant?: InputVariant;
  size?: InputSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

export interface InputFieldProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

export interface InputSlotProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface InputIconProps {
  as: React.ElementType;
  className?: string;
}
