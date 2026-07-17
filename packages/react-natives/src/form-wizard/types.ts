import type React from 'react';
import type { ReactNode } from 'react';
import type { View } from 'react-native';

export type WizardStep = {
  id: string;
  label: string;
  isApplicable?: () => boolean;
  render: () => ReactNode;
};

export interface FormWizardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  className?: string;
  title: string;
  subtitle?: string;
  steps: WizardStep[];
  saving?: boolean;
  onSaveExit: () => void | Promise<void>;
  onComplete: () => void | Promise<void>;
  onExit: () => void;
  closeLabel?: string;
  saveExitLabel?: string;
  savingLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  completeLabel?: string;
}
