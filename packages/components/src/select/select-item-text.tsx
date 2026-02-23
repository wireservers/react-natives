import React from 'react';
import { Text } from 'react-native';
import { useSelectContext } from './select';
import { useSelectItemContext } from './select-item';
import type { SelectItemTextProps } from './types';
import { selectItemTextStyle } from './styles';

export const SelectItemText = React.forwardRef<
  React.ElementRef<typeof Text>,
  SelectItemTextProps
>(({ className, children, ...props }, ref) => {
  const { size } = useSelectContext();
  const { label, isSelected } = useSelectItemContext();

  return (
    <Text
      ref={ref}
      className={selectItemTextStyle({
        size,
        isSelected,
        class: className,
      })}
      {...props}
    >
      {children ?? label}
    </Text>
  );
});

SelectItemText.displayName = 'SelectItemText';
