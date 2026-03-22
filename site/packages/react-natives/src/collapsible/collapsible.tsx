import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps, CollapsibleContextValue } from './types';
import { collapsibleStyle, collapsibleTriggerStyle, collapsibleContentStyle } from './styles';

export const [CollapsibleProvider, useCollapsibleContext] =
  createComponentContext<CollapsibleContextValue>('Collapsible');

export const Collapsible = React.forwardRef<
  React.ElementRef<typeof View>,
  CollapsibleProps
>(({ className, isOpen: controlledOpen, onOpenChange, defaultOpen = false, children, ...props }, ref) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const onToggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleProvider value={{ isOpen, onToggle }}>
      <View ref={ref} className={collapsibleStyle({ class: className })} {...props}>
        {children}
      </View>
    </CollapsibleProvider>
  );
});
Collapsible.displayName = 'Collapsible';

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CollapsibleTriggerProps
>(({ className, children, ...props }, ref) => {
  const { onToggle } = useCollapsibleContext();
  return (
    <Pressable ref={ref} onPress={onToggle} className={collapsibleTriggerStyle({ class: className })} accessibilityRole="button" {...props}>
      {children}
    </Pressable>
  );
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof View>,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useCollapsibleContext();
  if (!isOpen) return null;
  return (
    <View ref={ref} className={collapsibleContentStyle({ class: className })} {...props}>
      {children}
    </View>
  );
});
CollapsibleContent.displayName = 'CollapsibleContent';
