import React from 'react';
import type { IconProps } from './types';
import { iconStyle } from './styles';

export const Icon = React.forwardRef<any, IconProps>(
  ({ as: AsComp, className, size, color, ...props }, ref) => {
    const sizeClass = typeof size === 'number' ? undefined : size;

    return (
      <AsComp
        ref={ref}
        className={iconStyle({ size: sizeClass, class: className })}
        size={typeof size === 'number' ? size : undefined}
        color={color}
        {...props}
      />
    );
  },
);

Icon.displayName = 'Icon';
