import type { View, Text as RNText } from 'react-native';

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperContextValue { activeStep: number; orientation: StepperOrientation; }
export interface StepContextValue { index: number; isActive: boolean; isCompleted: boolean; }

export interface StepperProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  activeStep?: number;
  orientation?: StepperOrientation;
}
export interface StepProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  index: number;
}
export interface StepIndicatorProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface StepSeparatorProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface StepTitleProps extends React.ComponentPropsWithoutRef<typeof RNText> { className?: string; }
export interface StepDescriptionProps extends React.ComponentPropsWithoutRef<typeof RNText> { className?: string; }
