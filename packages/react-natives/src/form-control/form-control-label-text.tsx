import React from 'react';
import { Text } from 'react-native';
import { useFormControlContext } from './form-control';
import type { FormControlLabelTextProps } from './types';
import { formControlLabelTextStyle } from './styles';

export const FormControlLabelText = React.forwardRef<
  React.ElementRef<typeof Text>,
  FormControlLabelTextProps
>(({ className, ...props }, ref) => {
  const ctx = useFormControlContext();

  return (
    <Text
      ref={ref}
      className={formControlLabelTextStyle({
        size: ctx?.size,
        class: className,
      })}
      {...props}
    />
  );
});

FormControlLabelText.displayName = 'FormControlLabelText';
