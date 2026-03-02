import React, { useState } from 'react';
import { View, Pressable, Modal, Platform } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { PopoverProps, PopoverTriggerProps, PopoverContentProps, PopoverArrowProps, PopoverHeaderProps, PopoverBodyProps, PopoverFooterProps, PopoverCloseButtonProps, PopoverContextValue } from './types';
import { popoverContentStyle, popoverArrowStyle, popoverHeaderStyle, popoverBodyStyle, popoverFooterStyle, popoverCloseButtonStyle } from './styles';

export const [PopoverProvider, usePopoverContext] =
  createComponentContext<PopoverContextValue>('Popover');

export const Popover: React.FC<PopoverProps> = ({ isOpen: controlledOpen, onOpenChange, defaultOpen = false, placement = 'bottom', children }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const onToggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const onClose = () => {
    setInternalOpen(false);
    onOpenChange?.(false);
  };

  return (
    <PopoverProvider value={{ isOpen, onToggle, onClose, placement }}>
      {children}
    </PopoverProvider>
  );
};
Popover.displayName = 'Popover';

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  const { onToggle } = usePopoverContext();

  // Inject onPress directly into the child element via cloneElement.
  // This avoids wrapper nesting issues (Pressable inside Pressable, div onClick
  // not bubbling through RN Web's Responder system, etc.).
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const existingOnPress = child.props.onPress;
    return React.cloneElement(child, {
      onPress: existingOnPress
        ? (...args: any[]) => { existingOnPress(...args); onToggle(); }
        : onToggle,
    });
  }

  return (
    <Pressable onPress={onToggle}>
      {children}
    </Pressable>
  );
};
PopoverTrigger.displayName = 'PopoverTrigger';

export const PopoverContent = React.forwardRef<React.ElementRef<typeof View>, PopoverContentProps>(({ className, children, ...props }, ref) => {
  const { isOpen, onClose } = usePopoverContext();
  if (!isOpen) return null;
  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View ref={ref} className={popoverContentStyle({ class: className })} {...props}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
PopoverContent.displayName = 'PopoverContent';

export const PopoverArrow = React.forwardRef<React.ElementRef<typeof View>, PopoverArrowProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={popoverArrowStyle({ class: className })} {...props} />;
});
PopoverArrow.displayName = 'PopoverArrow';

export const PopoverHeader = React.forwardRef<React.ElementRef<typeof View>, PopoverHeaderProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={popoverHeaderStyle({ class: className })} {...props} />;
});
PopoverHeader.displayName = 'PopoverHeader';

export const PopoverBody = React.forwardRef<React.ElementRef<typeof View>, PopoverBodyProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={popoverBodyStyle({ class: className })} {...props} />;
});
PopoverBody.displayName = 'PopoverBody';

export const PopoverFooter = React.forwardRef<React.ElementRef<typeof View>, PopoverFooterProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={popoverFooterStyle({ class: className })} {...props} />;
});
PopoverFooter.displayName = 'PopoverFooter';

export const PopoverCloseButton = React.forwardRef<React.ElementRef<typeof Pressable>, PopoverCloseButtonProps>(({ className, ...props }, ref) => {
  const { onClose } = usePopoverContext();
  return <Pressable ref={ref} onPress={onClose} className={popoverCloseButtonStyle({ class: className })} accessibilityRole="button" accessibilityLabel="Close" {...props} />;
});
PopoverCloseButton.displayName = 'PopoverCloseButton';
