import type { Pressable, Text as RNText } from 'react-native';

export type FabPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export type FabSize = 'sm' | 'md' | 'lg';

export interface FabContextValue {
  size: FabSize;
}

export interface FabProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  placement?: FabPlacement;
  size?: FabSize;
  isExtended?: boolean;
}

export interface FabIconProps {
  as: React.ElementType;
  className?: string;
}

export interface FabLabelProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}
