import React from 'react';
import { View } from 'react-native';
import { useCheckboxContext } from './checkbox';
import type { CheckboxIndicatorProps } from './types';
import { checkboxIndicatorStyle } from './styles';

export const CheckboxIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  CheckboxIndicatorProps
>(({ className, children, ...props }, ref) => {
  const { isChecked, isDisabled, isInvalid, size } = useCheckboxContext();

  return (
    <View
      ref={ref}
      className={checkboxIndicatorStyle({
        size,
        isChecked,
        isInvalid,
        isDisabled,
        class: className,
      })}
      {...props}
    >
      {children}
    </View>
  );
});

CheckboxIndicator.displayName = 'CheckboxIndicator';
