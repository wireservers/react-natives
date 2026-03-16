import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import { useAccordionContext } from './accordion';
import type { AccordionItemProps, AccordionItemContextValue } from './types';
import { accordionItemStyle } from './styles';

export const [AccordionItemProvider, useAccordionItemContext] =
  createComponentContext<AccordionItemContextValue>('AccordionItem');

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionItemProps
>(({ className, value, children, ...props }, ref) => {
  const { expandedItems, variant } = useAccordionContext();

  const isExpanded = expandedItems.includes(value);

  const contextValue = React.useMemo<AccordionItemContextValue>(
    () => ({ value, isExpanded }),
    [value, isExpanded],
  );

  return (
    <AccordionItemProvider value={contextValue}>
      <View
        ref={ref}
        className={accordionItemStyle({ variant, class: className })}
        {...props}
      >
        {children}
      </View>
    </AccordionItemProvider>
  );
});

AccordionItem.displayName = 'AccordionItem';
