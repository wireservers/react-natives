import React from 'react';
import { Text } from 'react-native';
import { useAccordionContext } from './accordion';
import type { AccordionTitleTextProps } from './types';
import { accordionTitleTextStyle } from './styles';

export const AccordionTitleText = React.forwardRef<
  React.ElementRef<typeof Text>,
  AccordionTitleTextProps
>(({ className, children, ...props }, ref) => {
  const { size } = useAccordionContext();

  return (
    <Text
      ref={ref}
      className={accordionTitleTextStyle({ size, class: className })}
      {...props}
    >
      {children}
    </Text>
  );
});

AccordionTitleText.displayName = 'AccordionTitleText';
