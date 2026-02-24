import { useToastContext } from './toast-provider';
import type { UseToastReturn } from './types';

export function useToast(): UseToastReturn {
  const { show, close, closeAll } = useToastContext();
  return { show, close, closeAll };
}
