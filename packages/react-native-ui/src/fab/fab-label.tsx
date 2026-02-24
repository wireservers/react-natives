import React from 'react';
import { Text } from 'react-native';
import { useFabContext } from './fab';
import type { FabLabelProps } from './types';
import { fabLabelStyle } from './styles';

export const FabLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  FabLabelProps
>(({ className, ...props }, ref) => {
  const { size } = useFabContext();

  return (
    <Text
      ref={ref}
      className={fabLabelStyle({ size, class: className })}
      {...props}
    />
  );
});

FabLabel.displayName = 'FabLabel';
