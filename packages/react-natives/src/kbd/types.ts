import type { View } from 'react-native';

export interface KbdProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children: React.ReactNode;
}
