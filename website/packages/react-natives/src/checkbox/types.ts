import type { View, Text as RNText, Pressable } from 'react-native';
import type { Size } from '../utils/types';

export interface CheckboxGroupContextValue {
  values: string[];
  onChange: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: Size;
}

export interface CheckboxContextValue {
  isChecked: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  size: Size;
}

export interface CheckboxGroupProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: Size;
}

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  isChecked?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: Size;
}

export interface CheckboxIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface CheckboxIconProps {
  as?: React.ElementType;
  className?: string;
}

export interface CheckboxLabelProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}
