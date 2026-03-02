import React from 'react';
import { useTagContext } from './tag';
import type { TagIconProps } from './types';
import { tagIconStyle } from './styles';

export const TagIcon = React.forwardRef<any, TagIconProps>(
  ({ as: AsComp, className, ...props }, ref) => {
    const { size } = useTagContext();

    return (
      <AsComp
        ref={ref}
        className={tagIconStyle({ size, class: className })}
        {...props}
      />
    );
  },
);

TagIcon.displayName = 'TagIcon';
