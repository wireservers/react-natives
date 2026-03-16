import type { View, Text as RNText } from 'react-native';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  placement?: TooltipPlacement;
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  trigger: (props: {
    ref: React.Ref<any>;
    onPress: () => void;
    onLongPress: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }) => React.ReactNode;
  children: React.ReactNode;
}

export interface TooltipContextValue {
  placement: TooltipPlacement;
  isOpen: boolean;
  onClose: () => void;
}

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface TooltipTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}
