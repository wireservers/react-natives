import React from 'react';
import { View } from 'react-native';
import type { ButtonGroupProps } from './types';
import { buttonGroupStyle } from './styles';

export const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ButtonGroupProps
>(
  (
    {
      className,
      space = 'md',
      isAttached = false,
      flexDirection = 'column',
      ...props
    },
    ref,
  ) => {
    return (
      <View
        ref={ref}
        className={buttonGroupStyle({
          class: className,
          space,
          isAttached,
          flexDirection,
        })}
        {...props}
      />
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
