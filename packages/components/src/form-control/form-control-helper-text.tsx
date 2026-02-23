import React from 'react';
import { Text } from 'react-native';
import { useFormControlContext } from './form-control';
import type { FormControlHelperTextProps } from './types';
import { formControlHelperTextStyle } from './styles';

export const FormControlHelperText = React.forwardRef<
  React.ElementRef<typeof Text>,
  FormControlHelperTextProps
>(({ className, ...props }, ref) => {
  const ctx = useFormControlContext();

  return (
    <Text
      ref={ref}
      className={formControlHelperTextStyle({
        size: ctx?.size,
        class: className,
      })}
      {...props}
    />
  );
});

FormControlHelperText.displayName = 'FormControlHelperText';
