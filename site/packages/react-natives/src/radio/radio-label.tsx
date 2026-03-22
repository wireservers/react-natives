import React from 'react';
import { Text } from 'react-native';
import { useRadioContext } from './radio';
import type { RadioLabelProps } from './types';
import { radioLabelStyle } from './styles';

export const RadioLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  RadioLabelProps
>(({ className, children, ...props }, ref) => {
  const { isDisabled, size } = useRadioContext();

  return (
    <Text
      ref={ref}
      className={radioLabelStyle({ size, isDisabled, class: className })}
      {...props}
    >
      {children}
    </Text>
  );
});

RadioLabel.displayName = 'RadioLabel';
