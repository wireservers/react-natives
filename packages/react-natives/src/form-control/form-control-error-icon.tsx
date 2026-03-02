import React from 'react';
import { useFormControlContext } from './form-control';
import type { FormControlErrorIconProps } from './types';
import { formControlErrorIconStyle } from './styles';

export const FormControlErrorIcon = React.forwardRef<any, FormControlErrorIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    const ctx = useFormControlContext();

    if (!AsComp) return null;

    return (
      <AsComp
        ref={ref}
        className={formControlErrorIconStyle({
          size: ctx?.size,
          class: className,
        })}
        {...props}
      />
    );
  },
);

FormControlErrorIcon.displayName = 'FormControlErrorIcon';
