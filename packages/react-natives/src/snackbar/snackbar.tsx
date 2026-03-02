import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { SnackbarProps, SnackbarTextProps, SnackbarActionButtonProps, SnackbarContextValue } from './types';
import { snackbarStyle, snackbarTextStyle, snackbarActionButtonStyle, snackbarActionButtonTextStyle } from './styles';

export const [SnackbarProvider, useSnackbarContext] =
  createComponentContext<SnackbarContextValue>('Snackbar');

export const Snackbar = React.forwardRef<React.ElementRef<typeof View>, SnackbarProps>(
  ({ className, action = 'info', children, ...props }, ref) => {
    return (
      <SnackbarProvider value={{ action }}>
        <View ref={ref} className={snackbarStyle({ action, class: className })} {...props}>
          {children}
        </View>
      </SnackbarProvider>
    );
  },
);
Snackbar.displayName = 'Snackbar';

export const SnackbarText = React.forwardRef<React.ElementRef<typeof Text>, SnackbarTextProps>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} className={snackbarTextStyle({ class: className })} {...props} />;
  },
);
SnackbarText.displayName = 'SnackbarText';

export const SnackbarActionButton = React.forwardRef<React.ElementRef<typeof Pressable>, SnackbarActionButtonProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <Pressable ref={ref} className={snackbarActionButtonStyle({ class: className })} accessibilityRole="button" {...props}>
        <Text className={snackbarActionButtonTextStyle({})}>{label}</Text>
      </Pressable>
    );
  },
);
SnackbarActionButton.displayName = 'SnackbarActionButton';
