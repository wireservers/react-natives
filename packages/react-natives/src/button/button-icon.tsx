import React from 'react';
import { useButtonContext } from './button';
import type { ButtonIconProps } from './types';
import { buttonIconStyle } from './styles';

export const ButtonIcon = React.forwardRef<any, ButtonIconProps>(
  ({ className, as: AsComp, size, height, width, ...props }, ref) => {
    const parent = useButtonContext();

    const sizeClass =
      typeof size === 'number' ? undefined : (size ?? parent.size);

    const computedClassName = buttonIconStyle({
      size: sizeClass,
      variant: parent.variant,
      action: parent.action,
      class: className,
    });

    if (AsComp) {
      return (
        <AsComp
          ref={ref}
          className={computedClassName}
          size={typeof size === 'number' ? size : undefined}
          height={height}
          width={width}
          {...props}
        />
      );
    }

    return null;
  },
);

ButtonIcon.displayName = 'ButtonIcon';
