import React from 'react';
import { View } from 'react-native';
import { useTabsContext } from './tabs';
import type { TabPanelProps } from './types';
import { tabPanelStyle } from './styles';

export const TabPanel = React.forwardRef<
  React.ElementRef<typeof View>,
  TabPanelProps
>(({ className, index, children, ...props }, ref) => {
  const { selectedIndex } = useTabsContext();

  if (index !== selectedIndex) {
    return null;
  }

  return (
    <View
      ref={ref}
      className={tabPanelStyle({ class: className })}
      accessibilityRole="summary"
      {...props}
    >
      {children}
    </View>
  );
});

TabPanel.displayName = 'TabPanel';
