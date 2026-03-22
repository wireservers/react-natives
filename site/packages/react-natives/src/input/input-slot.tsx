import React from 'react';
import { View } from 'react-native';
import { useInputContext } from './input';
import type { InputSlotProps } from './types';
import { inputSlotStyle } from './styles';

export const InputSlot = React.forwardRef<
  React.ElementRef<typeof View>,
  InputSlotProps
>(({ className, children, ...props }, ref) => {
  const { size } = useInputContext();

  return (
    <View
      ref={ref}
      className={inputSlotStyle({ size, class: className })}
      {...props}
    >
      {children}
    </View>
  );
});

InputSlot.displayName = 'InputSlot';
