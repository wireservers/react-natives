import type { View } from 'react-native';

export interface OverlayProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  isVisible?: boolean;
}
