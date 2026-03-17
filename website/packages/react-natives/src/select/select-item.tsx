import React from 'react';
import { Pressable, Text } from 'react-native';
import { useSelectContext } from './select';
import type { SelectItemProps } from './types';
import { selectItemStyle, selectItemTextStyle } from './styles';

export const SelectItemContext = React.createContext<{
  label: string;
  value: string;
  isSelected: boolean;
  isDisabled: boolean;
} | null>(null);

export function useSelectItemContext() {
  const ctx = React.useContext(SelectItemContext);
  if (!ctx) {
    throw new Error(
      'SelectItem compound components must be used within <SelectItem>',
    );
  }
  return ctx;
}

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SelectItemProps
>(({ className, label, value, isDisabled = false, children, ...props }, ref) => {
  const { selectedValue, onValueChange, onClose, size } = useSelectContext();

  const isSelected = selectedValue === value;

  const handlePress = () => {
    if (!isDisabled) {
      onValueChange(value, label);
      onClose();
    }
  };

  return (
    <SelectItemContext.Provider value={{ label, value, isSelected, isDisabled }}>
      <Pressable
        ref={ref}
        disabled={isDisabled}
        onPress={handlePress}
        className={selectItemStyle({
          isSelected,
          isDisabled,
          class: className,
        })}
        accessibilityRole="button"
        accessibilityState={{
          selected: isSelected,
          disabled: isDisabled,
        }}
        {...props}
      >
        {children ?? (
          <Text
            className={selectItemTextStyle({
              size,
              isSelected,
            })}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </SelectItemContext.Provider>
  );
});

SelectItem.displayName = 'SelectItem';
