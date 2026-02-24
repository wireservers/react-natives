import React from 'react';
import { TextInput } from 'react-native';
import { useInputContext } from './input';
import type { InputFieldProps } from './types';
import { inputFieldStyle } from './styles';

export const InputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputFieldProps
>(({ className, onFocus, onBlur, ...props }, ref) => {
  const { size, isDisabled, handleFocus, handleBlur } = useInputContext();

  return (
    <TextInput
      ref={ref}
      editable={!isDisabled}
      onFocus={(e) => {
        handleFocus();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        handleBlur();
        onBlur?.(e);
      }}
      className={inputFieldStyle({ size, class: className })}
      placeholderTextColor="rgb(var(--color-typography-400))"
      {...props}
    />
  );
});

InputField.displayName = 'InputField';
