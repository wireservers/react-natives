import React from 'react';
import { Pressable } from 'react-native';
import { useAccordionContext } from './accordion';
import { useAccordionItemContext } from './accordion-item';
import type { AccordionTriggerProps } from './types';
import { accordionTriggerStyle } from './styles';

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  AccordionTriggerProps
>(({ className, children, onPress, ...props }, ref) => {
  const { toggleItem, size } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const handlePress = React.useCallback(
    (e: any) => {
      toggleItem(value);
      onPress?.(e);
    },
    [toggleItem, value, onPress],
  );

  return (
    <Pressable
      ref={ref}
      className={accordionTriggerStyle({ size, class: className })}
      onPress={handlePress}
      accessibilityRole="button"
      {...props}
    >
      {typeof children === 'function'
        ? children({ pressed: false } as any)
        : children}
    </Pressable>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';
