import React, { useCallback, useRef } from 'react';
import { Pressable, type View } from 'react-native';
import { useSelectContext } from './select';
import type { SelectTriggerProps } from './types';
import { selectTriggerStyle } from './styles';

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SelectTriggerProps
>(({ className, children, ...props }, forwardedRef) => {
  const { variant, size, isDisabled, isInvalid, isOpen, onOpen, setTriggerLayout } =
    useSelectContext();

  const internalRef = useRef<View>(null);

  const setRef = useCallback(
    (node: View | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node as any);
      else if (forwardedRef)
        (forwardedRef as React.MutableRefObject<any>).current = node;
    },
    [forwardedRef],
  );

  const handlePress = useCallback(() => {
    if (internalRef.current) {
      (internalRef.current as any).measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setTriggerLayout({ pageX: x, pageY: y, width, height });
          onOpen();
        },
      );
    } else {
      onOpen();
    }
  }, [onOpen, setTriggerLayout]);

  return (
    <Pressable
      ref={setRef}
      disabled={isDisabled}
      onPress={handlePress}
      className={selectTriggerStyle({
        variant,
        size,
        isFocused: isOpen,
        isInvalid,
        isDisabled,
        class: className,
      })}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        expanded: isOpen,
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
});

SelectTrigger.displayName = 'SelectTrigger';
