import React from 'react';
import { ActivityIndicator } from 'react-native';
import type { ButtonSpinnerProps } from './types';

export const ButtonSpinner = React.forwardRef<
  React.ElementRef<typeof ActivityIndicator>,
  ButtonSpinnerProps
>((props, ref) => {
  return <ActivityIndicator ref={ref} aria-label="loading" {...props} />;
});

ButtonSpinner.displayName = 'ButtonSpinner';
