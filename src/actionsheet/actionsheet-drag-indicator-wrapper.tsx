import React from 'react';
import { View } from 'react-native';
import type { ActionSheetDragIndicatorWrapperProps } from './types';
import { actionsheetDragIndicatorWrapperStyle } from './styles';

export const ActionSheetDragIndicatorWrapper = React.forwardRef<
  React.ElementRef<typeof View>,
  ActionSheetDragIndicatorWrapperProps
>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={actionsheetDragIndicatorWrapperStyle({ class: className })}
      {...props}
    />
  );
});

ActionSheetDragIndicatorWrapper.displayName = 'ActionSheetDragIndicatorWrapper';
