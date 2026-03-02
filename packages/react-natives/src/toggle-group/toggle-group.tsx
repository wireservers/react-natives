import React from 'react';
import { View, Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ToggleGroupProps, ToggleGroupItemProps, ToggleGroupContextValue } from './types';
import { toggleGroupStyle, toggleGroupItemStyle } from './styles';

export const [ToggleGroupProvider, useToggleGroupContext] =
  createComponentContext<ToggleGroupContextValue>('ToggleGroup');

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ToggleGroupProps
>(({ className, type = 'single', value, onValueChange, variant = 'outline', size = 'md', children, ...props }, ref) => {
  const normalizedValue = Array.isArray(value) ? value : value ? [value] : [];

  const handleValueChange = (itemValue: string) => {
    if (type === 'single') {
      onValueChange?.(itemValue);
    } else {
      const newValue = normalizedValue.includes(itemValue)
        ? normalizedValue.filter((v) => v !== itemValue)
        : [...normalizedValue, itemValue];
      onValueChange?.(newValue);
    }
  };

  return (
    <ToggleGroupProvider value={{ type, value: normalizedValue, onValueChange: handleValueChange, variant, size }}>
      <View ref={ref} className={toggleGroupStyle({ class: className })} {...props}>
        {children}
      </View>
    </ToggleGroupProvider>
  );
});

ToggleGroup.displayName = 'ToggleGroup';

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ToggleGroupItemProps
>(({ className, value, isDisabled, children, ...props }, ref) => {
  const { value: groupValue, onValueChange, variant, size } = useToggleGroupContext();
  const isSelected = groupValue.includes(value);

  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      onPress={() => onValueChange(value)}
      className={toggleGroupItemStyle({ variant, size, isSelected, isDisabled, class: className })}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      {...props}
    >
      {children}
    </Pressable>
  );
});

ToggleGroupItem.displayName = 'ToggleGroupItem';
