import React from 'react';
import { Pressable } from 'react-native';
import type { IconButtonProps } from './types';
import { iconButtonStyle, iconButtonIconStyle } from './styles';

export const IconButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  IconButtonProps
>(({ as: IconComp, className, action = 'primary', variant = 'solid', size = 'md', isDisabled, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      className={iconButtonStyle({ action, variant, size, isDisabled, class: className })}
      accessibilityRole="button"
      {...props}
    >
      <IconComp className={iconButtonIconStyle({ action, variant, size })} />
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
