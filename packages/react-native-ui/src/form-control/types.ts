import type { View, Text as RNText } from 'react-native';
import type { Size } from '../utils/types';

export interface FormControlContextValue {
  isDisabled: boolean;
  isInvalid: boolean;
  isRequired: boolean;
  isReadOnly: boolean;
  size: Size;
}

export interface FormControlProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  size?: Size;
}

export interface FormControlLabelProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface FormControlLabelTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface FormControlHelperTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface FormControlErrorMessageProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface FormControlErrorIconProps {
  as?: React.ElementType;
  className?: string;
}
