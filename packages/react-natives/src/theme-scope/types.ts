import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface ThemeScopeProps extends ViewProps {
  /**
   * Theme variables for this subtree, e.g. `vars({ '--color-primary-500': '...' })`
   * or an array of them. Re-applied inside modal-based components (Drawer, Modal,
   * Popover, ...) so portaled content keeps the scope's theme.
   */
  vars?: StyleProp<ViewStyle>;
}

export interface ThemeScopeBridgeProps {
  children?: React.ReactNode;
}
