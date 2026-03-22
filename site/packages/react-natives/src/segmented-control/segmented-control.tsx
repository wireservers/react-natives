import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { SegmentedControlProps, SegmentedControlItemProps, SegmentedControlContextValue } from './types';
import { segmentedControlStyle, segmentedControlItemStyle, segmentedControlItemTextStyle } from './styles';

export const [SegmentedControlProvider, useSegmentedControlContext] =
  createComponentContext<SegmentedControlContextValue>('SegmentedControl');

export const SegmentedControl = React.forwardRef<React.ElementRef<typeof View>, SegmentedControlProps>(
  ({ className, value, onValueChange, size = 'md', children, ...props }, ref) => {
    return (
      <SegmentedControlProvider value={{ value, onValueChange, size }}>
        <View ref={ref} className={segmentedControlStyle({ class: className })} {...props}>{children}</View>
      </SegmentedControlProvider>
    );
  },
);
SegmentedControl.displayName = 'SegmentedControl';

export const SegmentedControlItem = React.forwardRef<React.ElementRef<typeof Pressable>, SegmentedControlItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, size } = useSegmentedControlContext();
    const isSelected = value === selectedValue;
    return (
      <Pressable ref={ref} onPress={() => onValueChange(value)} className={segmentedControlItemStyle({ size, isSelected, class: className })} accessibilityRole="button" accessibilityState={{ selected: isSelected }} {...props}>
        {typeof children === 'string' ? (
          <Text className={segmentedControlItemTextStyle({ size, isSelected })}>{children}</Text>
        ) : children}
      </Pressable>
    );
  },
);
SegmentedControlItem.displayName = 'SegmentedControlItem';
