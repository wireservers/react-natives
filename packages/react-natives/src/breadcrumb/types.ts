import type { View, Text as RNText, Pressable } from 'react-native';

export interface BreadcrumbProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  separator?: string | React.ReactNode;
}

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  href?: string;
}

export interface BreadcrumbTextProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

export interface BreadcrumbContextValue {
  separator: string | React.ReactNode;
}
