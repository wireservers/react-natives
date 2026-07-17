import type React from 'react';
import type { View } from 'react-native';

export type ReconcileCandidate = {
  value: string;
  sources?: string[];
};

export type ReconcileField = {
  key: string;
  label: string;
  candidates: ReconcileCandidate[];
  keyboardType?: 'default' | 'numeric' | 'email-address';
  format?: (value: string) => string;
};

export interface FieldReconcilerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  className?: string;
  fields: ReconcileField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}
