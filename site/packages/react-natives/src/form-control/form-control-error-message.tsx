import React from 'react';
import { View, Text } from 'react-native';
import { useFormControlContext } from './form-control';
import type { FormControlErrorMessageProps } from './types';
import {
  formControlErrorMessageStyle,
  formControlErrorMessageTextStyle,
} from './styles';

export const FormControlErrorMessage = React.forwardRef<
  React.ElementRef<typeof View>,
  FormControlErrorMessageProps
>(({ className, children, ...props }, ref) => {
  const ctx = useFormControlContext();

  if (!ctx?.isInvalid) {
    return null;
  }

  return (
    <View
      ref={ref}
      className={formControlErrorMessageStyle({ class: className })}
      role="alert"
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          className={formControlErrorMessageTextStyle({ size: ctx.size })}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
});

FormControlErrorMessage.displayName = 'FormControlErrorMessage';
