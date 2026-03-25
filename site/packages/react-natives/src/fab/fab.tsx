import React from 'react';
import { Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { FabProps, FabContextValue } from './types';
import { fabStyle } from './styles';

export const [FabProvider, useFabContext] =
  createComponentContext<FabContextValue>('Fab');

export const Fab = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  FabProps
>(
  (
    {
      className,
      placement = 'bottom-right',
      size = 'md',
      isExtended = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <FabProvider value={{ size }}>
        <Pressable
          ref={ref}
          role="button"
          className={fabStyle({
            placement,
            size,
            isExtended,
            class: className,
          })}
          {...props}
        >
          {children}
        </Pressable>
      </FabProvider>
    );
  },
);

Fab.displayName = 'Fab';
