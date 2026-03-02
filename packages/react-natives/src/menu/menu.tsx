import React, { useState, useRef } from 'react';
import { View, Pressable, Text, Modal } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { MenuProps, MenuTriggerProps, MenuContentProps, MenuItemProps, MenuItemTextProps, MenuItemIconProps, MenuSeparatorProps, MenuGroupProps, MenuGroupTitleProps, MenuContextValue, MenuTriggerRect } from './types';
import { menuContentStyle, menuItemStyle, menuItemTextStyle, menuItemIconStyle, menuSeparatorStyle, menuGroupStyle, menuGroupTitleStyle } from './styles';

export const [MenuProvider, useMenuContext] = createComponentContext<MenuContextValue>('Menu');

export const Menu: React.FC<MenuProps> = ({ isOpen: controlledOpen, onOpenChange, defaultOpen = false, children }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [triggerRect, setTriggerRect] = useState<MenuTriggerRect>({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onToggle = () => { const next = !isOpen; setInternalOpen(next); onOpenChange?.(next); };
  const onClose = () => { setInternalOpen(false); onOpenChange?.(false); };
  return (
    <MenuProvider value={{ isOpen, onToggle, onClose, triggerRect, setTriggerRect }}>
      {children}
    </MenuProvider>
  );
};
Menu.displayName = 'Menu';

export const MenuTrigger = React.forwardRef<React.ElementRef<typeof Pressable>, MenuTriggerProps>(({ children }) => {
  const { onToggle, setTriggerRect } = useMenuContext();
  const triggerRef = useRef<View>(null);

  const handlePress = () => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerRect({ pageX, pageY, width, height });
      onToggle();
    });
  };

  const child = React.Children.only(children) as React.ReactElement<any>;
  return (
    <View ref={triggerRef}>
      {React.cloneElement(child, { onPress: handlePress })}
    </View>
  );
});
MenuTrigger.displayName = 'MenuTrigger';

export const MenuContent = React.forwardRef<React.ElementRef<typeof View>, MenuContentProps>(({ className, children, style, ...props }, ref) => {
  const { isOpen, onClose, triggerRect } = useMenuContext();
  if (!isOpen) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            ref={ref}
            className={menuContentStyle({ class: className })}
            style={[{ position: 'absolute', top: triggerRect.pageY + triggerRect.height + 4, left: triggerRect.pageX }, style]}
            {...props}
          >
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});
MenuContent.displayName = 'MenuContent';

export const MenuItem = React.forwardRef<React.ElementRef<typeof Pressable>, MenuItemProps>(({ className, isDisabled, children, ...props }, ref) => {
  const { onClose } = useMenuContext();
  return (
    <Pressable ref={ref} disabled={isDisabled} onPress={() => { props.onPress?.(undefined as any); onClose(); }} className={menuItemStyle({ isDisabled, class: className })} {...props}>
      {children}
    </Pressable>
  );
});
MenuItem.displayName = 'MenuItem';

export const MenuItemText = React.forwardRef<React.ElementRef<typeof Text>, MenuItemTextProps>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={menuItemTextStyle({ class: className })} {...props} />;
});
MenuItemText.displayName = 'MenuItemText';

export const MenuItemIcon = React.forwardRef<any, MenuItemIconProps>(({ as: AsComp, className, ...props }, ref) => {
  return <AsComp ref={ref} className={menuItemIconStyle({ class: className })} {...props} />;
});
MenuItemIcon.displayName = 'MenuItemIcon';

export const MenuSeparator = React.forwardRef<React.ElementRef<typeof View>, MenuSeparatorProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={menuSeparatorStyle({ class: className })} {...props} />;
});
MenuSeparator.displayName = 'MenuSeparator';

export const MenuGroup = React.forwardRef<React.ElementRef<typeof View>, MenuGroupProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={menuGroupStyle({ class: className })} {...props} />;
});
MenuGroup.displayName = 'MenuGroup';

export const MenuGroupTitle = React.forwardRef<React.ElementRef<typeof Text>, MenuGroupTitleProps>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={menuGroupTitleStyle({ class: className })} {...props} />;
});
MenuGroupTitle.displayName = 'MenuGroupTitle';
