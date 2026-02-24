import React from 'react';
import { View } from 'react-native';
import { useRadioContext } from './radio';
import type { RadioIndicatorProps } from './types';
import { radioIndicatorStyle } from './styles';

export const RadioIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  RadioIndicatorProps
>(({ className, children, ...props }, ref) => {
  const { isSelected, isDisabled, isInvalid, size } = useRadioContext();

  return (
    <View
      ref={ref}
      className={radioIndicatorStyle({
        size,
        isSelected,
        isInvalid,
        isDisabled,
        class: className,
      })}
      {...props}
    >
      {children}
    </View>
  );
});

RadioIndicator.displayName = 'RadioIndicator';
