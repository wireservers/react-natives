import React from 'react';
import { Pressable } from 'react-native';
import type { ActionSheetItemProps } from './types';
import { actionsheetItemStyle } from './styles';

export const ActionSheetItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ActionSheetItemProps
>(({ className, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      role="menuitem"
      className={actionsheetItemStyle({ class: className })}
      {...props}
    />
  );
});

ActionSheetItem.displayName = 'ActionSheetItem';
