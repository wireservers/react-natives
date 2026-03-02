import React from 'react';
import { View } from 'react-native';
import type { ActionSheetDragIndicatorProps } from './types';
import { actionsheetDragIndicatorStyle } from './styles';

export const ActionSheetDragIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ActionSheetDragIndicatorProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={actionsheetDragIndicatorStyle({ class: className })}
      {...props}
    />
  );
});

ActionSheetDragIndicator.displayName = 'ActionSheetDragIndicator';
