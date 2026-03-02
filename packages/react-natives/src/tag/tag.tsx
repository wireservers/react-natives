import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { TagProps, TagContextValue } from './types';
import { tagStyle } from './styles';

export const [TagProvider, useTagContext] =
  createComponentContext<TagContextValue>('Tag');

export const Tag = React.forwardRef<
  React.ElementRef<typeof View>,
  TagProps
>(
  (
    {
      action = 'info',
      variant = 'subtle',
      size = 'md',
      isDisabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TagProvider value={{ action, variant, size }}>
        <View
          ref={ref}
          className={tagStyle({ action, variant, size, isDisabled, class: className })}
          {...props}
        >
          {children}
        </View>
      </TagProvider>
    );
  },
);

Tag.displayName = 'Tag';
