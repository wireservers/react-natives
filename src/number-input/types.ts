import type { View, TextInput, Pressable } from 'react-native';

export type NumberInputSize = 'sm' | 'md' | 'lg';

export interface NumberInputContextValue {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChangeValue: (val: number) => void;
  size: NumberInputSize;
  min?: number;
  max?: number;
  step: number;
  isDisabled: boolean;
}

export interface NumberInputProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: NumberInputSize;
  isDisabled?: boolean;
}
export interface NumberInputFieldProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}
export interface NumberInputStepperProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
export interface NumberInputIncrementProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
export interface NumberInputDecrementProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}
