import React from 'react';
import { Text } from 'react-native';
import { useCheckboxContext } from './checkbox';
import type { CheckboxLabelProps } from './types';
import { checkboxLabelStyle } from './styles';

export const CheckboxLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  CheckboxLabelProps
>(({ className, children, ...props }, ref) => {
  const { isDisabled, size } = useCheckboxContext();

  return (
    <Text
      ref={ref}
      className={checkboxLabelStyle({ size, isDisabled, class: className })}
      {...props}
    >
      {children}
    </Text>
  );
});

CheckboxLabel.displayName = 'CheckboxLabel';
