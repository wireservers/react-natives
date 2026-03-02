import React from 'react';
import { ScrollView } from 'react-native';
import type { ActionSheetScrollViewProps } from './types';

export const ActionSheetScrollView = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  ActionSheetScrollViewProps
>(({ className, ...props }, ref) => {
  return <ScrollView ref={ref} className={className} {...props} />;
});

ActionSheetScrollView.displayName = 'ActionSheetScrollView';
