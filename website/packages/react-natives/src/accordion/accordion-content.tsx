import React from 'react';
import { View } from 'react-native';
import { useAccordionContext } from './accordion';
import { useAccordionItemContext } from './accordion-item';
import type { AccordionContentProps } from './types';
import { accordionContentStyle } from './styles';

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { size } = useAccordionContext();
  const { isExpanded } = useAccordionItemContext();

  if (!isExpanded) {
    return null;
  }

  return (
    <View
      ref={ref}
      className={accordionContentStyle({ size, class: className })}
      {...props}
    >
      {children}
    </View>
  );
});

AccordionContent.displayName = 'AccordionContent';
