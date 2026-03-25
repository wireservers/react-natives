import React, { useState, createContext, useContext } from 'react';
import { View } from 'react-native';
import { useFormControlContext } from '../form-control/form-control';
import type { InputProps, InputContextValue, InputSize } from './types';
import { inputStyle } from './styles';

export const InputContext = createContext<InputContextValue | null>(null);

export function useInputContext(): InputContextValue {
  const ctx = useContext(InputContext);
  if (!ctx) {
    throw new Error(
      'Input compound components must be used within <Input>',
    );
  }
  return ctx;
}

export const Input = React.forwardRef<
  React.ElementRef<typeof View>,
  InputProps
>(
  (
    {
      className,
      variant = 'outline',
      size = 'md',
      isDisabled: isDisabledProp,
      isInvalid: isInvalidProp,
      children,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const formControl = useFormControlContext();

    const isDisabled = isDisabledProp ?? formControl?.isDisabled ?? false;
    const isInvalid = isInvalidProp ?? formControl?.isInvalid ?? false;
    const resolvedSize = size ?? (formControl?.size as InputSize) ?? 'md';

    return (
      <InputContext.Provider
        value={{
          variant,
          size: resolvedSize,
          isDisabled,
          isInvalid,
          isFocused,
          handleFocus: () => setIsFocused(true),
          handleBlur: () => setIsFocused(false),
        }}
      >
        <View
          ref={ref}
          className={inputStyle({
            variant,
            size: resolvedSize,
            isFocused,
            isInvalid,
            isDisabled,
            class: className,
          })}
          {...props}
        >
          {children}
        </View>
      </InputContext.Provider>
    );
  },
);

Input.displayName = 'Input';
