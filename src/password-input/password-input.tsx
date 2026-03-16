import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  PasswordInputProps,
  PasswordInputFieldProps,
  PasswordInputToggleProps,
  PasswordInputContextValue,
} from './types';
import {
  passwordInputStyle,
  passwordInputFieldStyle,
  passwordInputToggleStyle,
  passwordInputToggleTextStyle,
} from './styles';

export const [PasswordInputProvider, usePasswordInputContext] =
  createComponentContext<PasswordInputContextValue>('PasswordInput');

export const PasswordInput = React.forwardRef<
  React.ElementRef<typeof View>,
  PasswordInputProps
>(({ className, size = 'md', isDisabled = false, children, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <PasswordInputProvider
      value={{ isVisible, onToggle: () => setIsVisible(!isVisible), size }}
    >
      <View
        ref={ref}
        className={passwordInputStyle({ size, isDisabled, class: className })}
        {...props}
      >
        {children}
      </View>
    </PasswordInputProvider>
  );
});
PasswordInput.displayName = 'PasswordInput';

export const PasswordInputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  PasswordInputFieldProps
>(({ className, ...props }, ref) => {
  const { isVisible, size } = usePasswordInputContext();
  return (
    <TextInput
      ref={ref}
      secureTextEntry={!isVisible}
      className={passwordInputFieldStyle({ size, class: className })}
      {...props}
    />
  );
});
PasswordInputField.displayName = 'PasswordInputField';

export const PasswordInputToggle = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PasswordInputToggleProps
>(({ className, children, ...props }, ref) => {
  const { isVisible, onToggle } = usePasswordInputContext();
  return (
    <Pressable
      ref={ref}
      onPress={onToggle}
      className={passwordInputToggleStyle({ class: className })}
      accessibilityRole="button"
      accessibilityLabel={isVisible ? 'Hide password' : 'Show password'}
      {...props}
    >
      {children ?? (
        <Text className={passwordInputToggleTextStyle({})}>
          {isVisible ? 'Hide' : 'Show'}
        </Text>
      )}
    </Pressable>
  );
});
PasswordInputToggle.displayName = 'PasswordInputToggle';
