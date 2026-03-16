import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  NumberInputProps,
  NumberInputFieldProps,
  NumberInputStepperProps,
  NumberInputIncrementProps,
  NumberInputDecrementProps,
  NumberInputContextValue,
} from './types';
import {
  numberInputStyle,
  numberInputFieldStyle,
  numberInputStepperStyle,
  numberInputButtonStyle,
  numberInputButtonTextStyle,
} from './styles';

export const [NumberInputProvider, useNumberInputContext] =
  createComponentContext<NumberInputContextValue>('NumberInput');

export const NumberInput = React.forwardRef<
  React.ElementRef<typeof View>,
  NumberInputProps
>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      onChange,
      min,
      max,
      step = 1,
      size = 'md',
      isDisabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const clamp = (v: number) => {
      let r = v;
      if (min !== undefined) r = Math.max(min, r);
      if (max !== undefined) r = Math.min(max, r);
      return r;
    };
    const update = (v: number) => {
      const clamped = clamp(v);
      setInternalValue(clamped);
      onChange?.(clamped);
    };
    return (
      <NumberInputProvider
        value={{
          value,
          onIncrement: () => update(value + step),
          onDecrement: () => update(value - step),
          onChangeValue: update,
          size,
          min,
          max,
          step,
          isDisabled,
        }}
      >
        <View
          ref={ref}
          className={numberInputStyle({ size, isDisabled, class: className })}
          {...props}
        >
          {children}
        </View>
      </NumberInputProvider>
    );
  },
);
NumberInput.displayName = 'NumberInput';

export const NumberInputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  NumberInputFieldProps
>(({ className, ...props }, ref) => {
  const { value, onChangeValue, size, isDisabled } =
    useNumberInputContext();
  return (
    <TextInput
      ref={ref}
      value={String(value)}
      onChangeText={(t) => {
        const n = parseFloat(t);
        if (!isNaN(n)) onChangeValue(n);
      }}
      keyboardType="numeric"
      editable={!isDisabled}
      className={numberInputFieldStyle({ size, class: className })}
      {...props}
    />
  );
});
NumberInputField.displayName = 'NumberInputField';

export const NumberInputStepper = React.forwardRef<
  React.ElementRef<typeof View>,
  NumberInputStepperProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={numberInputStepperStyle({ class: className })} {...props} />;
});
NumberInputStepper.displayName = 'NumberInputStepper';

export const NumberInputIncrementButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  NumberInputIncrementProps
>(({ className, children, ...props }, ref) => {
  const { onIncrement, size, isDisabled } = useNumberInputContext();
  return (
    <Pressable
      ref={ref}
      onPress={onIncrement}
      disabled={isDisabled}
      className={numberInputButtonStyle({ size, class: className })}
      accessibilityRole="button"
      accessibilityLabel="Increment"
      {...props}
    >
      {children ?? (
        <Text className={numberInputButtonTextStyle({ size })}>+</Text>
      )}
    </Pressable>
  );
});
NumberInputIncrementButton.displayName = 'NumberInputIncrementButton';

export const NumberInputDecrementButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  NumberInputDecrementProps
>(({ className, children, ...props }, ref) => {
  const { onDecrement, size, isDisabled } = useNumberInputContext();
  return (
    <Pressable
      ref={ref}
      onPress={onDecrement}
      disabled={isDisabled}
      className={numberInputButtonStyle({ size, class: className })}
      accessibilityRole="button"
      accessibilityLabel="Decrement"
      {...props}
    >
      {children ?? (
        <Text className={numberInputButtonTextStyle({ size })}>
          {'\u2212'}
        </Text>
      )}
    </Pressable>
  );
});
NumberInputDecrementButton.displayName = 'NumberInputDecrementButton';
