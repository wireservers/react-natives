import React from 'react';
import { View } from 'react-native';
import type { SelectContentProps } from './types';
import { selectContentStyle } from './styles';

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-end' }}
      pointerEvents="box-none"
    >
      <View
        ref={ref}
        className={selectContentStyle({ class: className })}
        {...props}
      >
        {children}
      </View>
    </View>
  );
});

SelectContent.displayName = 'SelectContent';
