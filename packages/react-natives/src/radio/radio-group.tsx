import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';
import type { RadioGroupProps, RadioGroupContextValue } from './types';
import { radioGroupStyle } from './styles';

export const RadioGroupContext =
  createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  RadioGroupProps
>(
  (
    {
      className,
      value: valueProp,
      defaultValue = undefined,
      onChange,
      isDisabled,
      isInvalid,
      size = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string | null>(
      defaultValue ?? null,
    );
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;

    const handleChange = (radioValue: string) => {
      if (!isControlled) {
        setInternalValue(radioValue);
      }
      onChange?.(radioValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{ value, onChange: handleChange, isDisabled, isInvalid, size }}
      >
        <View
          ref={ref}
          role="radiogroup"
          className={radioGroupStyle({ class: className })}
          {...props}
        >
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
