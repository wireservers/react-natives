import React from 'react';
import { View, Text } from 'react-native';
import type { BlockquoteProps } from './types';
import { blockquoteStyle, blockquoteTextStyle } from './styles';

export const Blockquote = React.forwardRef<
  React.ElementRef<typeof View>,
  BlockquoteProps
>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={blockquoteStyle({ class: className })} {...props}>
      {typeof children === 'string' ? (
        <Text className={blockquoteTextStyle({})}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});

Blockquote.displayName = 'Blockquote';
