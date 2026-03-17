import React from 'react';
import { View } from 'react-native';
import type { ActionSheetContentProps } from './types';
import { actionsheetContentStyle } from './styles';

export const ActionSheetContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ActionSheetContentProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={actionsheetContentStyle({ class: className })}
      {...props}
    />
  );
});

ActionSheetContent.displayName = 'ActionSheetContent';
