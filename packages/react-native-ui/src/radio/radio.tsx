import React from 'react';
import { Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import { useFormControlContext } from '../form-control/form-control';
import { useRadioGroupContext } from './radio-group';
import type { RadioProps, RadioContextValue } from './types';
import { radioStyle } from './styles';

export const [RadioProvider, useRadioContext] =
  createComponentContext<RadioContextValue>('Radio');

export const Radio = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  RadioProps
>(
  (
    {
      className,
      value,
      isDisabled: isDisabledProp,
      isInvalid: isInvalidProp,
      size: sizeProp,
      children,
      ...props
    },
    ref,
  ) => {
    const groupContext = useRadioGroupContext();
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

    const isSelected = groupContext?.value === value;

    const handlePress = () => {
      if (isDisabled) return;
      groupContext?.onChange(value);
    };

    return (
      <RadioProvider value={{ isSelected, isDisabled, isInvalid, size }}>
        <Pressable
          ref={ref}
          role="radio"
          aria-checked={isSelected}
          disabled={isDisabled}
          onPress={handlePress}
          className={radioStyle({ class: className })}
          {...props}
        >
          {children}
        </Pressable>
      </RadioProvider>
    );
  },
);

Radio.displayName = 'Radio';
