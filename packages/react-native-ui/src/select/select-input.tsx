import React from 'react';
import { Text } from 'react-native';
import { useSelectContext } from './select';
import type { SelectInputProps } from './types';
import { selectInputStyle } from './styles';

export const SelectInput = React.forwardRef<
  React.ElementRef<typeof Text>,
  SelectInputProps
>(({ className, placeholder, ...props }, ref) => {
  const { selectedLabel, size } = useSelectContext();

  const hasValue = !!selectedLabel;
  const displayText = hasValue ? selectedLabel : (placeholder ?? 'Select...');

  return (
    <Text
      ref={ref}
      numberOfLines={1}
      className={selectInputStyle({
        size,
        hasValue,
        class: className,
      })}
      {...props}
    >
      {displayText}
    </Text>
  );
});

SelectInput.displayName = 'SelectInput';
