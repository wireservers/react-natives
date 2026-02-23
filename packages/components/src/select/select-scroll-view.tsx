import React from 'react';
import { ScrollView } from 'react-native';
import type { SelectScrollViewProps } from './types';

export const SelectScrollView = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  SelectScrollViewProps
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollView
      ref={ref}
      bounces={false}
      showsVerticalScrollIndicator
      className={className}
      {...props}
    >
      {children}
    </ScrollView>
  );
});

SelectScrollView.displayName = 'SelectScrollView';
