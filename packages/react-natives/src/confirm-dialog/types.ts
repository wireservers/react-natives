import type { ReactNode } from 'react';

export type ConfirmOptions = {
  title: string;
  message?: string;
  detail?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'negative' | 'primary';
};

export interface ConfirmDialogProps {
  options: ConfirmOptions | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface UseConfirmResult {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  dialog: ReactNode;
}
