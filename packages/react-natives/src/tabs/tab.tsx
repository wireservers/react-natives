import React from 'react';
import { Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import { useTabsContext } from './tabs';
import type { TabProps } from './types';
import { tabStyle } from './styles';

export interface TabContextValue {
  isActive: boolean;
}

export const [TabProvider, useTabContext] =
  createComponentContext<TabContextValue>('Tab');

export const Tab = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  TabProps
>(({ className, _index = 0, children, onPress, ...props }, ref) => {
  const { selectedIndex, onChange, variant, size, isFitted } =
    useTabsContext();

  const isActive = _index === selectedIndex;

  const handlePress = React.useCallback(
    (e: any) => {
      onChange(_index);
      onPress?.(e);
    },
    [_index, onChange, onPress],
  );

  return (
    <TabProvider value={{ isActive }}>
      <Pressable
        ref={ref}
        className={tabStyle({
          variant,
          size,
          active: isActive,
          isFitted,
          class: className,
        })}
        onPress={handlePress}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        {...props}
      >
        {typeof children === 'function'
          ? children({ pressed: false } as any)
          : children}
      </Pressable>
    </TabProvider>
  );
});

Tab.displayName = 'Tab';
