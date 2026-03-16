import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import type { FormControlProps, FormControlContextValue } from './types';
import { formControlStyle } from './styles';

export const FormControlContext =
  createContext<FormControlContextValue | null>(null);

export function useFormControlContext(): FormControlContextValue | null {
  return useContext(FormControlContext);
}

export const FormControl = React.forwardRef<
  React.ElementRef<typeof View>,
  FormControlProps
>(
  (
    {
      className,
      isDisabled = false,
      isInvalid = false,
      isRequired = false,
      isReadOnly = false,
      size = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControlContext.Provider
        value={{ isDisabled, isInvalid, isRequired, isReadOnly, size }}
      >
        <View
          ref={ref}
          className={formControlStyle({ size, class: className })}
          {...props}
        >
          {children}
        </View>
      </FormControlContext.Provider>
    );
  },
);

FormControl.displayName = 'FormControl';
