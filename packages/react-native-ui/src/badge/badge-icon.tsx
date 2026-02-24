import React from 'react';
import { useBadgeContext } from './badge';
import type { BadgeIconProps } from './types';
import { badgeIconStyle } from './styles';

export const BadgeIcon = React.forwardRef<any, BadgeIconProps>(
  ({ as: IconComponent, className, ...props }, ref) => {
    const { action, variant, size } = useBadgeContext();

    return (
      <IconComponent
        ref={ref}
        className={badgeIconStyle({ action, variant, size, class: className })}
        {...props}
      />
    );
  },
);

BadgeIcon.displayName = 'BadgeIcon';
