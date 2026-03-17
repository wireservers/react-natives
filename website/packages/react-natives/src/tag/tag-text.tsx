import React from 'react';
import { Text } from 'react-native';
import { useTagContext } from './tag';
import type { TagTextProps } from './types';
import { tagTextStyle } from './styles';

export const TagText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TagTextProps
>(({ className, ...props }, ref) => {
  const { action, variant, size } = useTagContext();

  return (
    <Text
      ref={ref}
      className={tagTextStyle({ action, variant, size, class: className })}
      {...props}
    />
  );
});

TagText.displayName = 'TagText';
