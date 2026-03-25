import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { AccordionProps, AccordionContextValue } from './types';
import { accordionStyle } from './styles';

export const [AccordionProvider, useAccordionContext] =
  createComponentContext<AccordionContextValue>('Accordion');

export const Accordion = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionProps
>(
  (
    {
      className,
      type = 'single',
      defaultValue = [],
      value: controlledValue,
      onValueChange,
      isCollapsible = true,
      variant = 'unfilled',
      size = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState<string[]>(defaultValue);

    const isControlled = controlledValue !== undefined;
    const expandedItems = isControlled ? controlledValue : uncontrolledValue;

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        let nextValue: string[];

        if (type === 'single') {
          if (expandedItems.includes(itemValue)) {
            // Trying to collapse the currently expanded item
            nextValue = isCollapsible ? [] : expandedItems;
          } else {
            nextValue = [itemValue];
          }
        } else {
          // multiple
          if (expandedItems.includes(itemValue)) {
            nextValue = isCollapsible
              ? expandedItems.filter((v) => v !== itemValue)
              : expandedItems;
          } else {
            nextValue = [...expandedItems, itemValue];
          }
        }

        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [type, expandedItems, isCollapsible, isControlled, onValueChange],
    );

    const contextValue = React.useMemo<AccordionContextValue>(
      () => ({
        expandedItems,
        toggleItem,
        type,
        isCollapsible,
        variant,
        size,
      }),
      [expandedItems, toggleItem, type, isCollapsible, variant, size],
    );

    return (
      <AccordionProvider value={contextValue}>
        <View
          ref={ref}
          className={accordionStyle({ class: className })}
          {...props}
        >
          {children}
        </View>
      </AccordionProvider>
    );
  },
);

Accordion.displayName = 'Accordion';
