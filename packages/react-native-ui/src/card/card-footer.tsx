import React from 'react';
import { View } from 'react-native';
import type { CardFooterProps } from './types';
import { cardFooterStyle } from './styles';

export const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  CardFooterProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cardFooterStyle({ class: className })}
      {...props}
    />
  );
});

CardFooter.displayName = 'CardFooter';
