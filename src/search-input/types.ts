import type { View, TextInput, Pressable } from 'react-native';

export type SearchInputSize = 'sm' | 'md' | 'lg';

export interface SearchInputContextValue {
  size: SearchInputSize;
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
}

export interface SearchInputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: SearchInputSize;
  value?: string;
  onChangeText?: (text: string) => void;
  isDisabled?: boolean;
}
export interface SearchInputFieldProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}
export interface SearchInputIconProps {
  as?: React.ElementType;
  className?: string;
}
export interface SearchInputClearButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
