import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useFormControlContext } from '../form-control/form-control';
import type { TextareaProps } from './types';
import { textareaStyle } from './styles';

export const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextareaProps
>(
  (
    {
      className,
      variant = 'outline',
      size = 'md',
      isDisabled: isDisabledProp,
      isInvalid: isInvalidProp,
      isReadOnly: isReadOnlyProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const formControl = useFormControlContext();

    const isDisabled = isDisabledProp ?? formControl?.isDisabled ?? false;
    const isInvalid = isInvalidProp ?? formControl?.isInvalid ?? false;
    const isReadOnly = isReadOnlyProp ?? formControl?.isReadOnly ?? false;

    const handleFocus = (
      e: Parameters<NonNullable<TextareaProps['onFocus']>>[0],
    ) => {
      setIsFocused(true);
      onFocusProp?.(e);
    };

    const handleBlur = (
      e: Parameters<NonNullable<TextareaProps['onBlur']>>[0],
    ) => {
      setIsFocused(false);
      onBlurProp?.(e);
    };

    return (
      <TextInput
        ref={ref}
        multiline
        textAlignVertical="top"
        editable={!isDisabled && !isReadOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={textareaStyle({
          variant,
          size,
          isFocused,
          isInvalid,
          isDisabled,
          class: className,
        })}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
