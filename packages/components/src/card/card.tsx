import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { CardProps, CardContextValue } from './types';
import { cardStyle } from './styles';

export const [CardProvider, useCardContext] =
  createComponentContext<CardContextValue>('Card');

export const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  CardProps
>(({ className, variant = 'elevated', size = 'md', children, ...props }, ref) => {
  return (
    <CardProvider value={{ variant, size }}>
      <View
        ref={ref}
        className={cardStyle({ variant, size, class: className })}
        {...props}
      >
        {children}
      </View>
    </CardProvider>
  );
});

Card.displayName = 'Card';
