import React from 'react';
import { useFabContext } from './fab';
import type { FabIconProps } from './types';
import { fabIconStyle } from './styles';

export const FabIcon = React.forwardRef<any, FabIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    const { size } = useFabContext();

    return (
      <AsComp
        ref={ref}
        className={fabIconStyle({ size, class: className })}
        {...props}
      />
    );
  },
);

FabIcon.displayName = 'FabIcon';
