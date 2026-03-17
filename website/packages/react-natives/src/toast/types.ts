import type { View, Text as RNText } from 'react-native';

export type ToastPlacement =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left';

export type ToastStatus = 'info' | 'success' | 'warning' | 'error';

export type ToastVariant = 'solid' | 'subtle' | 'outline';

export interface ToastConfig {
  id: string;
  title?: string;
  description?: string;
  status?: ToastStatus;
  variant?: ToastVariant;
  duration?: number;
  placement?: ToastPlacement;
  isClosable?: boolean;
  render?: () => React.ReactNode;
}

export interface UseToastReturn {
  show(config: Omit<ToastConfig, 'id'>): string;
  close(id: string): void;
  closeAll(): void;
}

export type ToastContextValue = UseToastReturn;

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  status?: ToastStatus;
  variant?: ToastVariant;
}

export interface ToastTitleProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}
