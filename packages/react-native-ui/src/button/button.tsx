import React from 'react';
import { Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ButtonProps, ButtonContextValue } from './types';
import { buttonStyle } from './styles';

export const [ButtonProvider, useButtonContext] =
  createComponentContext<ButtonContextValue>('Button');

export const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      variant = 'solid',
      size = 'md',
      action = 'primary',
      isDisabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonProvider value={{ variant, size, action }}>
        <Pressable
          ref={ref}
          role="button"
          disabled={isDisabled}
          className={buttonStyle({ variant, size, action, class: className })}
          {...props}
        >
          {children}
        </Pressable>
      </ButtonProvider>
    );
  },
);

Button.displayName = 'Button';
