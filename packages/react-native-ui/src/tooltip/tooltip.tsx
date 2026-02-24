import React from 'react';
import { View, type LayoutRectangle } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { TooltipProps, TooltipContextValue, TooltipPlacement } from './types';

export const [TooltipProvider, useTooltipContext] =
  createComponentContext<TooltipContextValue>('Tooltip');

const TOOLTIP_OFFSET = 8;

function getTooltipPosition(
  triggerLayout: LayoutRectangle,
  placement: TooltipPlacement,
) {
  switch (placement) {
    case 'top':
      return {
        bottom: triggerLayout.height + TOOLTIP_OFFSET,
        left: 0,
      };
    case 'bottom':
      return {
        top: triggerLayout.height + TOOLTIP_OFFSET,
        left: 0,
      };
    case 'left':
      return {
        right: triggerLayout.width + TOOLTIP_OFFSET,
        top: 0,
      };
    case 'right':
      return {
        left: triggerLayout.width + TOOLTIP_OFFSET,
        top: 0,
      };
  }
}

export const Tooltip: React.FC<TooltipProps> = ({
  placement = 'bottom',
  isOpen: isOpenProp,
  defaultIsOpen = false,
  onOpen,
  onClose,
  trigger,
  children,
}) => {
  const [isOpenState, setIsOpenState] = React.useState(defaultIsOpen);
  const triggerRef = React.useRef<View>(null);
  const [triggerLayout, setTriggerLayout] =
    React.useState<LayoutRectangle | null>(null);

  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;

  const handleOpen = React.useCallback(() => {
    if (!isControlled) {
      setIsOpenState(true);
    }
    onOpen?.();
  }, [isControlled, onOpen]);

  const handleClose = React.useCallback(() => {
    if (!isControlled) {
      setIsOpenState(false);
    }
    onClose?.();
  }, [isControlled, onClose]);

  const handleToggle = React.useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleOpen, handleClose]);

  const handleTriggerLayout = React.useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.measure((_x, _y, width, height) => {
        setTriggerLayout({ x: 0, y: 0, width, height });
      });
    }
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      handleTriggerLayout();
    }
  }, [isOpen, handleTriggerLayout]);

  const positionStyle = triggerLayout
    ? getTooltipPosition(triggerLayout, placement)
    : {};

  return (
    <TooltipProvider value={{ placement, isOpen, onClose: handleClose }}>
      <View style={{ position: 'relative' }}>
        {trigger({
          ref: triggerRef,
          onPress: handleToggle,
          onLongPress: handleOpen,
        })}
        {isOpen && (
          <View style={positionStyle} pointerEvents="box-none">
            {children}
          </View>
        )}
      </View>
    </TooltipProvider>
  );
};

Tooltip.displayName = 'Tooltip';
