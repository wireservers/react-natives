import React from 'react';
import { View } from 'react-native';
import { useCardContext } from './card';
import type { CardHeaderProps } from './types';
import { cardHeaderStyle } from './styles';

export const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  CardHeaderProps
>(({ className, ...props }, ref) => {
  const { size } = useCardContext();

  return (
    <View
      ref={ref}
      className={cardHeaderStyle({ size, class: className })}
      {...props}
    />
  );
});

CardHeader.displayName = 'CardHeader';
