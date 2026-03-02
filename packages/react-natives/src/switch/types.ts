import type { View, Switch as RNSwitch } from 'react-native';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: SwitchSize;
  isDisabled?: boolean;
  value?: boolean;
  defaultValue?: boolean;
  onToggle?: (value: boolean) => void;
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: string;
}

export interface SwitchLabelProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
