import type { View, TextInput, Pressable } from 'react-native';

export type TagsInputSize = 'sm' | 'md' | 'lg';

export interface TagsInputContextValue {
  size: TagsInputSize;
  value: string[];
  onValueChange?: (values: string[]) => void;
  isDisabled: boolean;
}

export interface TagsInputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: string[];
  onValueChange?: (values: string[]) => void;
  size?: TagsInputSize;
  isDisabled?: boolean;
}
export interface TagsInputFieldProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}
export interface TagsInputTagProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  onRemove?: (value: string) => void;
}
export interface TagsInputTagTextProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
export interface TagsInputTagCloseButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
