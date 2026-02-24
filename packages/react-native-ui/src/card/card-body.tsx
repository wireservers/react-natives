import React from 'react';
import { View } from 'react-native';
import { useCardContext } from './card';
import type { CardBodyProps } from './types';
import { cardBodyStyle } from './styles';

export const CardBody = React.forwardRef<
  React.ElementRef<typeof View>,
  CardBodyProps
>(({ className, ...props }, ref) => {
  const { size } = useCardContext();

  return (
    <View
      ref={ref}
      className={cardBodyStyle({ size, class: className })}
      {...props}
    />
  );
});

CardBody.displayName = 'CardBody';
