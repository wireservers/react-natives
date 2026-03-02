import React from 'react';
import { Pressable } from 'react-native';
import { useActionSheetContext } from './actionsheet';
import type { ActionSheetBackdropProps } from './types';
import { actionsheetBackdropStyle } from './styles';

export const ActionSheetBackdrop = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ActionSheetBackdropProps
>(({ className, ...props }, ref) => {
  const { onClose } = useActionSheetContext();

  return (
    <Pressable
      ref={ref}
      onPress={onClose}
      className={actionsheetBackdropStyle({ class: className })}
      {...props}
    />
  );
});

ActionSheetBackdrop.displayName = 'ActionSheetBackdrop';
