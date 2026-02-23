import React, { useState, useCallback, createContext, useContext } from 'react';
import { View } from 'react-native';
import { useFormControlContext } from '../form-control/form-control';
import type { SelectProps, SelectContextValue, SelectSize } from './types';

export const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(): SelectContextValue {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error(
      'Select compound components must be used within <Select>',
    );
  }
  return ctx;
}

export const Select = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectProps
>(
  (
    {
      className,
      selectedValue: controlledValue,
      defaultValue,
      onValueChange: onValueChangeProp,
      size = 'md',
      variant = 'outline',
      isDisabled: isDisabledProp,
      isInvalid: isInvalidProp,
      placeholder = 'Select...',
      children,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string | null>(
      defaultValue ?? null,
    );
    const [internalLabel, setInternalLabel] = useState('');

    const formControl = useFormControlContext();

    const isDisabled = isDisabledProp ?? formControl?.isDisabled ?? false;
    const isInvalid = isInvalidProp ?? formControl?.isInvalid ?? false;
    const resolvedSize = size ?? (formControl?.size as SelectSize) ?? 'md';

    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : internalValue;

    const selectedLabel = selectedValue ? internalLabel || selectedValue : '';

    const onOpen = useCallback(() => {
      if (!isDisabled) {
        setIsOpen(true);
      }
    }, [isDisabled]);

    const onClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const onValueChange = useCallback(
      (value: string, label: string) => {
        if (!isControlled) {
          setInternalValue(value);
        }
        setInternalLabel(label);
        onValueChangeProp?.(value);
      },
      [isControlled, onValueChangeProp],
    );

    return (
      <SelectContext.Provider
        value={{
          isOpen,
          selectedValue: selectedValue ?? null,
          selectedLabel,
          size: resolvedSize,
          variant,
          isDisabled,
          isInvalid,
          onOpen,
          onClose,
          onValueChange,
        }}
      >
        <View ref={ref} className={className}>
          {children}
        </View>
      </SelectContext.Provider>
    );
  },
);

Select.displayName = 'Select';
