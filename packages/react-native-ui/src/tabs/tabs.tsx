import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { TabsProps, TabsContextValue } from './types';
import { tabsStyle } from './styles';

export const [TabsProvider, useTabsContext] =
  createComponentContext<TabsContextValue>('Tabs');

export const Tabs = React.forwardRef<
  React.ElementRef<typeof View>,
  TabsProps
>(
  (
    {
      className,
      defaultIndex = 0,
      index: controlledIndex,
      onChange: onChangeProp,
      variant = 'underlined',
      size = 'md',
      orientation = 'horizontal',
      isFitted = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledIndex, setUncontrolledIndex] =
      React.useState(defaultIndex);

    const isControlled = controlledIndex !== undefined;
    const selectedIndex = isControlled ? controlledIndex : uncontrolledIndex;

    const onChange = React.useCallback(
      (newIndex: number) => {
        if (!isControlled) {
          setUncontrolledIndex(newIndex);
        }
        onChangeProp?.(newIndex);
      },
      [isControlled, onChangeProp],
    );

    const contextValue = React.useMemo<TabsContextValue>(
      () => ({
        selectedIndex,
        onChange,
        variant,
        size,
        orientation,
        isFitted,
      }),
      [selectedIndex, onChange, variant, size, orientation, isFitted],
    );

    return (
      <TabsProvider value={contextValue}>
        <View
          ref={ref}
          className={tabsStyle({ class: className })}
          {...props}
        >
          {children}
        </View>
      </TabsProvider>
    );
  },
);

Tabs.displayName = 'Tabs';
