import React from 'react';
import { View } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type {
  ToastConfig,
  ToastContextValue,
  ToastPlacement,
  ToastStatus,
  ToastVariant,
} from './types';
import { toastContainerStyle } from './styles';
import { Toast } from './toast';
import { ToastTitle } from './toast-title';
import { ToastDescription } from './toast-description';

export const [ToastContextProvider, useToastContext] =
  createComponentContext<ToastContextValue>('Toast');

let idCounter = 0;
function generateId(): string {
  idCounter += 1;
  return `toast-${idCounter}-${Date.now()}`;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = React.useState<ToastConfig[]>([]);
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const close = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const closeAll = React.useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const show = React.useCallback(
    (config: Omit<ToastConfig, 'id'>): string => {
      const id = generateId();
      const duration = config.duration ?? 5000;

      const toast: ToastConfig = {
        ...config,
        id,
        status: config.status ?? 'info',
        variant: config.variant ?? 'subtle',
        placement: config.placement ?? 'top',
      };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          close(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [close],
  );

  React.useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Group toasts by placement
  const grouped = React.useMemo(() => {
    const map = new Map<ToastPlacement, ToastConfig[]>();
    toasts.forEach((toast) => {
      const placement = toast.placement ?? 'top';
      if (!map.has(placement)) {
        map.set(placement, []);
      }
      map.get(placement)!.push(toast);
    });
    return map;
  }, [toasts]);

  const contextValue = React.useMemo(
    () => ({ show, close, closeAll }),
    [show, close, closeAll],
  );

  return (
    <ToastContextProvider value={contextValue}>
      {children}
      {Array.from(grouped.entries()).map(([placement, placementToasts]) => (
        <View
          key={placement}
          pointerEvents="box-none"
          className={toastContainerStyle({ placement })}
        >
          {placementToasts.map((toast) => {
            if (toast.render) {
              return (
                <React.Fragment key={toast.id}>
                  {toast.render()}
                </React.Fragment>
              );
            }

            return (
              <Toast
                key={toast.id}
                status={toast.status as ToastStatus}
                variant={toast.variant as ToastVariant}
              >
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                {toast.description && (
                  <ToastDescription>{toast.description}</ToastDescription>
                )}
              </Toast>
            );
          })}
        </View>
      ))}
    </ToastContextProvider>
  );
};

ToastProvider.displayName = 'ToastProvider';
