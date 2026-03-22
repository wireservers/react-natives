import type { View, Text as RNText } from 'react-native';

export interface StatProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface StatLabelProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface StatNumberProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface StatHelpTextProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export type StatArrowType = 'increase' | 'decrease';

export interface StatArrowProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  type?: StatArrowType;
}
