import type { View, Text as RNText, Pressable } from 'react-native';
import type { Size } from '../utils/types';

export interface RadioGroupContextValue {
  value: string | null;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: Size;
}

export interface RadioContextValue {
  isSelected: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  size: Size;
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: Size;
}

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: Size;
}

export interface RadioIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface RadioIconProps {
  className?: string;
}

export interface RadioLabelProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}
