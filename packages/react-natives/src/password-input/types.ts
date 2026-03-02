import type { View, TextInput, Pressable } from 'react-native';

export type PasswordInputSize = 'sm' | 'md' | 'lg';

export interface PasswordInputContextValue {
  isVisible: boolean;
  onToggle: () => void;
  size: PasswordInputSize;
}

export interface PasswordInputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: PasswordInputSize;
  isDisabled?: boolean;
}
export interface PasswordInputFieldProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}
export interface PasswordInputToggleProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
