import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  PinInputProps,
  PinInputFieldProps,
  PinInputContextValue,
} from './types';
import { pinInputStyle, pinInputFieldStyle } from './styles';

export const [PinInputProvider, usePinInputContext] =
  createComponentContext<PinInputContextValue>('PinInput');

export const PinInput = React.forwardRef<
  React.ElementRef<typeof View>,
  PinInputProps
>(
  (
    {
      className,
      length = 4,
      value = '',
      onChange,
      size = 'md',
      isDisabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValues, setInternalValues] = useState<string[]>(() => {
      const arr = new Array(length).fill('');
      value.split('').forEach((c, i) => {
        if (i < length) arr[i] = c;
      });
      return arr;
    });
    const values = value
      ? value
          .split('')
          .concat(new Array(Math.max(0, length - value.length)).fill(''))
          .slice(0, length)
      : internalValues;
    const onChangeAtIndex = (index: number, char: string) => {
      const newValues = [...values];
      newValues[index] = char.slice(-1);
      setInternalValues(newValues);
      onChange?.(newValues.join(''));
    };
    return (
      <PinInputProvider
        value={{ values, onChangeAtIndex, size, isDisabled, length }}
      >
        <View
          ref={ref}
          className={pinInputStyle({ class: className })}
          {...props}
        >
          {children ??
            Array.from({ length }, (_, i) => (
              <PinInputField key={i} index={i} />
            ))}
        </View>
      </PinInputProvider>
    );
  },
);
PinInput.displayName = 'PinInput';

export const PinInputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  PinInputFieldProps
>(({ className, index, ...props }, ref) => {
  const { values, onChangeAtIndex, size, isDisabled } =
    usePinInputContext();
  const isFilled = !!values[index];
  return (
    <TextInput
      ref={ref}
      value={values[index] || ''}
      onChangeText={(text) => onChangeAtIndex(index, text)}
      maxLength={1}
      keyboardType="number-pad"
      editable={!isDisabled}
      selectTextOnFocus
      className={pinInputFieldStyle({
        size,
        isFilled,
        isDisabled,
        class: className,
      })}
      {...props}
    />
  );
});
PinInputField.displayName = 'PinInputField';
