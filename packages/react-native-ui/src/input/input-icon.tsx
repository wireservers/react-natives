import React from 'react';
import { useInputContext } from './input';
import type { InputIconProps } from './types';
import { inputIconStyle } from './styles';

export const InputIcon = React.forwardRef<any, InputIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    const { size, isFocused, isInvalid } = useInputContext();

    return (
      <AsComp
        ref={ref}
        className={inputIconStyle({
          size,
          isFocused,
          isInvalid,
          class: className,
        })}
        {...props}
      />
    );
  },
);

InputIcon.displayName = 'InputIcon';
