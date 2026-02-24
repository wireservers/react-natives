import React from 'react';
import { View } from 'react-native';
import type { TabPanelsProps } from './types';
import { tabPanelsStyle } from './styles';

export const TabPanels = React.forwardRef<
  React.ElementRef<typeof View>,
  TabPanelsProps
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={tabPanelsStyle({ class: className })}
      {...props}
    >
      {children}
    </View>
  );
});

TabPanels.displayName = 'TabPanels';
