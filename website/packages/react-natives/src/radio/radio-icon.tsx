import React from 'react';
import { View } from 'react-native';
import { useRadioContext } from './radio';
import type { RadioIconProps } from './types';
import { radioIconStyle } from './styles';

export const RadioIcon = React.forwardRef<
  React.ElementRef<typeof View>,
  RadioIconProps
>(({ className, ...props }, ref) => {
  const { isSelected, size } = useRadioContext();

  if (!isSelected) return null;

  return (
    <View
      ref={ref}
      className={radioIconStyle({ size, class: className })}
      {...props}
    />
  );
});

RadioIcon.displayName = 'RadioIcon';
