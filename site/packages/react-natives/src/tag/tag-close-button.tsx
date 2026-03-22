import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTagContext } from './tag';
import type { TagCloseButtonProps } from './types';
import { tagCloseButtonStyle } from './styles';

export const TagCloseButton = React.forwardRef<any, TagCloseButtonProps>(
  ({ className, onPress, ...props }, ref) => {
    const { size } = useTagContext();

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        className={tagCloseButtonStyle({ size, class: className })}
        accessibilityRole="button"
        accessibilityLabel="Remove"
        {...props}
      >
        <Text style={{ fontSize: 10, lineHeight: 12 }}>&#x2715;</Text>
      </Pressable>
    );
  },
);

TagCloseButton.displayName = 'TagCloseButton';
