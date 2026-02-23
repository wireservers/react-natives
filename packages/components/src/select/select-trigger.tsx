import React from 'react';
import { Pressable } from 'react-native';
import { useSelectContext } from './select';
import type { SelectTriggerProps } from './types';
import { selectTriggerStyle } from './styles';

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => {
  const { variant, size, isDisabled, isInvalid, isOpen, onOpen } =
    useSelectContext();

  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      onPress={onOpen}
      className={selectTriggerStyle({
        variant,
        size,
        isFocused: isOpen,
        isInvalid,
        isDisabled,
        class: className,
      })}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        expanded: isOpen,
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
});

SelectTrigger.displayName = 'SelectTrigger';
