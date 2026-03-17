import React from 'react';
import { View, Text } from 'react-native';
import type { CodeProps, CodeBlockProps } from './types';
import { codeStyle, codeBlockStyle, codeBlockTextStyle } from './styles';

export const Code = React.forwardRef<
  React.ElementRef<typeof Text>,
  CodeProps
>(({ className, variant, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={codeStyle({ variant, class: className })}
      {...props}
    />
  );
});

Code.displayName = 'Code';

export const CodeBlock = React.forwardRef<
  React.ElementRef<typeof View>,
  CodeBlockProps
>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={codeBlockStyle({ class: className })} {...props}>
      {typeof children === 'string' ? (
        <Text className={codeBlockTextStyle({})}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});

CodeBlock.displayName = 'CodeBlock';
