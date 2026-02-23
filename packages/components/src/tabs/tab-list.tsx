import React from 'react';
import { View } from 'react-native';
import { useTabsContext } from './tabs';
import type { TabListProps } from './types';
import { tabListStyle } from './styles';

export const TabList = React.forwardRef<
  React.ElementRef<typeof View>,
  TabListProps
>(({ className, children, ...props }, ref) => {
  const { orientation, variant } = useTabsContext();

  return (
    <View
      ref={ref}
      className={tabListStyle({ orientation, variant, class: className })}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { _index: index } as any);
        }
        return child;
      })}
    </View>
  );
});

TabList.displayName = 'TabList';
