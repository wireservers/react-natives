import React from 'react';
import { Text } from 'react-native';
import type { ActionSheetItemTextProps } from './types';
import { actionsheetItemTextStyle } from './styles';

export const ActionSheetItemText = React.forwardRef<
  React.ElementRef<typeof Text>,
  ActionSheetItemTextProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={actionsheetItemTextStyle({ class: className })}
      {...props}
    />
  );
});

ActionSheetItemText.displayName = 'ActionSheetItemText';
