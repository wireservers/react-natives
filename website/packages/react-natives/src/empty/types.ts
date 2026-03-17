import type { View, Text as RNText } from 'react-native';

export interface EmptyProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface EmptyIconProps {
  as: React.ElementType;
  className?: string;
}

export interface EmptyTitleProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface EmptyDescriptionProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface EmptyActionProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
