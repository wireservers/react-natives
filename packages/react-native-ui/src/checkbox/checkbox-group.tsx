import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';
import type { CheckboxGroupProps, CheckboxGroupContextValue } from './types';
import { checkboxGroupStyle } from './styles';

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext(): CheckboxGroupContextValue | null {
  return useContext(CheckboxGroupContext);
}

export const CheckboxGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  CheckboxGroupProps
>(
  (
    {
      className,
      value: valueProp,
      defaultValue = [],
      onChange,
      isDisabled,
      isInvalid,
      size = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValues, setInternalValues] =
      useState<string[]>(defaultValue);
    const isControlled = valueProp !== undefined;
    const values = isControlled ? valueProp : internalValues;

    const handleChange = (checkboxValue: string) => {
      const newValues = values.includes(checkboxValue)
        ? values.filter((v) => v !== checkboxValue)
        : [...values, checkboxValue];

      if (!isControlled) {
        setInternalValues(newValues);
      }
      onChange?.(newValues);
    };

    return (
      <CheckboxGroupContext.Provider
        value={{ values, onChange: handleChange, isDisabled, isInvalid, size }}
      >
        <View
          ref={ref}
          className={checkboxGroupStyle({ class: className })}
          {...props}
        >
          {children}
        </View>
      </CheckboxGroupContext.Provider>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';
