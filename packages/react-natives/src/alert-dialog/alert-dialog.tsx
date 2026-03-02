import React from 'react';
import { View, Pressable, Modal } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { AlertDialogProps, AlertDialogBackdropProps, AlertDialogContentProps, AlertDialogHeaderProps, AlertDialogBodyProps, AlertDialogFooterProps, AlertDialogCloseButtonProps, AlertDialogContextValue } from './types';
import { alertDialogContentStyle, alertDialogBackdropStyle, alertDialogHeaderStyle, alertDialogBodyStyle, alertDialogFooterStyle, alertDialogCloseButtonStyle } from './styles';

export const [AlertDialogProvider, useAlertDialogContext] =
  createComponentContext<AlertDialogContextValue>('AlertDialog');

export const AlertDialog: React.FC<AlertDialogProps> = ({ isOpen, onClose, size = 'md', children }) => {
  return (
    <AlertDialogProvider value={{ isOpen, onClose, size }}>
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {children}
        </View>
      </Modal>
    </AlertDialogProvider>
  );
};
AlertDialog.displayName = 'AlertDialog';

export const AlertDialogBackdrop = React.forwardRef<React.ElementRef<typeof Pressable>, AlertDialogBackdropProps>(({ className, ...props }, ref) => {
  const { onClose } = useAlertDialogContext();
  return <Pressable ref={ref} onPress={onClose} className={alertDialogBackdropStyle({ class: className })} {...props} />;
});
AlertDialogBackdrop.displayName = 'AlertDialogBackdrop';

export const AlertDialogContent = React.forwardRef<React.ElementRef<typeof View>, AlertDialogContentProps>(({ className, ...props }, ref) => {
  const { size } = useAlertDialogContext();
  return <View ref={ref} className={alertDialogContentStyle({ size, class: className })} {...props} />;
});
AlertDialogContent.displayName = 'AlertDialogContent';

export const AlertDialogHeader = React.forwardRef<React.ElementRef<typeof View>, AlertDialogHeaderProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={alertDialogHeaderStyle({ class: className })} {...props} />;
});
AlertDialogHeader.displayName = 'AlertDialogHeader';

export const AlertDialogBody = React.forwardRef<React.ElementRef<typeof View>, AlertDialogBodyProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={alertDialogBodyStyle({ class: className })} {...props} />;
});
AlertDialogBody.displayName = 'AlertDialogBody';

export const AlertDialogFooter = React.forwardRef<React.ElementRef<typeof View>, AlertDialogFooterProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={alertDialogFooterStyle({ class: className })} {...props} />;
});
AlertDialogFooter.displayName = 'AlertDialogFooter';

export const AlertDialogCloseButton = React.forwardRef<React.ElementRef<typeof Pressable>, AlertDialogCloseButtonProps>(({ className, ...props }, ref) => {
  const { onClose } = useAlertDialogContext();
  return <Pressable ref={ref} onPress={onClose} className={alertDialogCloseButtonStyle({ class: className })} accessibilityRole="button" accessibilityLabel="Close" {...props} />;
});
AlertDialogCloseButton.displayName = 'AlertDialogCloseButton';
