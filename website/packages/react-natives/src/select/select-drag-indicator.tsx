import React from 'react';
import { View } from 'react-native';
import type { SelectDragIndicatorProps } from './types';
import { selectDragIndicatorStyle } from './styles';

export const SelectDragIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectDragIndicatorProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={selectDragIndicatorStyle({ class: className })}
      {...props}
    />
  );
});

SelectDragIndicator.displayName = 'SelectDragIndicator';
