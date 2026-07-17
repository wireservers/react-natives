import type React from 'react';
import type { ReactNode } from 'react';
import type { View } from 'react-native';

export interface DrawerShellProps
  extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  className?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: ReactNode;
  maxWidth?: number;
  topInset?: number;
  bottomInset?: number;
  children: ReactNode;
}

export interface FormDrawerProps extends DrawerShellProps {
  onSave: () => void;
  onDelete?: () => void;
  saveLabel?: string;
  deleteLabel?: string;
  cancelLabel?: string;
  saveDisabled?: boolean;
  footerNote?: ReactNode;
}

export interface DrawerCardProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface DrawerSectionLabelProps {
  children: ReactNode;
  className?: string;
}
