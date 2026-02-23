import React from 'react';
import { Pressable, Text } from 'react-native';
import { useDrawerContext } from './drawer';
import type { DrawerCloseButtonProps } from './types';
import { drawerCloseButtonStyle } from './styles';

export const DrawerCloseButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  DrawerCloseButtonProps
>(({ className, children, ...props }, ref) => {
  const { onClose } = useDrawerContext();

  return (
    <Pressable
      ref={ref}
      onPress={onClose}
      accessibilityRole="button"
      accessibilityLabel="Close"
      className={drawerCloseButtonStyle({ class: className })}
      {...props}
    >
      {children ?? (
        <Text className="text-typography-500 text-lg leading-none">✕</Text>
      )}
    </Pressable>
  );
});

DrawerCloseButton.displayName = 'DrawerCloseButton';
