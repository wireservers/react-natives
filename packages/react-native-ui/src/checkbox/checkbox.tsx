import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import { useFormControlContext } from '../form-control/form-control';
import { useCheckboxGroupContext } from './checkbox-group';
import type { CheckboxProps, CheckboxContextValue } from './types';
import { checkboxStyle } from './styles';

export const [CheckboxProvider, useCheckboxContext] =
  createComponentContext<CheckboxContextValue>('Checkbox');

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CheckboxProps
>(
  (
    {
      className,
      value,
      isChecked: isCheckedProp,
      defaultIsChecked = false,
      onChange,
      isDisabled: isDisabledProp,
      isInvalid: isInvalidProp,
      size: sizeProp,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultIsChecked);
    const groupContext = useCheckboxGroupContext();
    const formControl = useFormControlContext();

    const size = sizeProp ?? groupContext?.size ?? formControl?.size ?? 'md';
    const isDisabled =
      isDisabledProp ??
      groupContext?.isDisabled ??
      formControl?.isDisabled ??
      false;
    const isInvalid =
      isInvalidProp ??
      groupContext?.isInvalid ??
      formControl?.isInvalid ??
      false;

    // Determine checked state
    let isChecked: boolean;
    if (groupContext) {
      isChecked = groupContext.values.includes(value);
    } else if (isCheckedProp !== undefined) {
      isChecked = isCheckedProp;
    } else {
      isChecked = internalChecked;
    }

    const handlePress = () => {
      if (isDisabled) return;

      if (groupContext) {
        groupContext.onChange(value);
      } else if (isCheckedProp === undefined) {
        setInternalChecked(!isChecked);
      }
      onChange?.(!isChecked);
    };

    return (
      <CheckboxProvider value={{ isChecked, isDisabled, isInvalid, size }}>
        <Pressable
          ref={ref}
          role="checkbox"
          aria-checked={isChecked}
          disabled={isDisabled}
          onPress={handlePress}
          className={checkboxStyle({ class: className })}
          {...props}
        >
          {children}
        </Pressable>
      </CheckboxProvider>
    );
  },
);

Checkbox.displayName = 'Checkbox';
