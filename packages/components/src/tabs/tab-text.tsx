import React from 'react';
import { Text } from 'react-native';
import { useTabsContext } from './tabs';
import { useTabContext } from './tab';
import type { TabTextProps } from './types';
import { tabTextStyle } from './styles';

export const TabText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TabTextProps
>(({ className, children, ...props }, ref) => {
  const { size } = useTabsContext();
  const { isActive } = useTabContext();

  return (
    <Text
      ref={ref}
      className={tabTextStyle({ size, active: isActive, class: className })}
      {...props}
    >
      {children}
    </Text>
  );
});

TabText.displayName = 'TabText';
