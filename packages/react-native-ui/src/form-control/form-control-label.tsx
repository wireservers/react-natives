import React from 'react';
import { View, Text } from 'react-native';
import { useFormControlContext } from './form-control';
import type { FormControlLabelProps } from './types';
import {
  formControlLabelStyle,
  formControlRequiredIndicatorStyle,
} from './styles';

export const FormControlLabel = React.forwardRef<
  React.ElementRef<typeof View>,
  FormControlLabelProps
>(({ className, children, ...props }, ref) => {
  const ctx = useFormControlContext();

  return (
    <View
      ref={ref}
      className={formControlLabelStyle({ class: className })}
      {...props}
    >
      {children}
      {ctx?.isRequired && (
        <Text
          className={formControlRequiredIndicatorStyle({
            size: ctx.size,
          })}
        >
          *
        </Text>
      )}
    </View>
  );
});

FormControlLabel.displayName = 'FormControlLabel';
