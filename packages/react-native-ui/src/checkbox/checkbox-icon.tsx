import React from 'react';
import { Text } from 'react-native';
import { useCheckboxContext } from './checkbox';
import type { CheckboxIconProps } from './types';
import { checkboxIconStyle } from './styles';

export const CheckboxIcon = React.forwardRef<any, CheckboxIconProps>(
  ({ as: IconComponent, className, ...props }, ref) => {
    const { isChecked, size } = useCheckboxContext();

    if (!isChecked) return null;

    if (IconComponent) {
      return (
        <IconComponent
          ref={ref}
          className={checkboxIconStyle({ size, class: className })}
          {...props}
        />
      );
    }

    return (
      <Text
        ref={ref}
        className={checkboxIconStyle({ size, class: className })}
        {...props}
      >
        {'\u2713'}
      </Text>
    );
  },
);

CheckboxIcon.displayName = 'CheckboxIcon';
