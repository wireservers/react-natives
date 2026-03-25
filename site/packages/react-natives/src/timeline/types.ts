import type { View, Text as RNText } from 'react-native';

export type TimelineVariant = 'solid' | 'outline';

export interface TimelineProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface TimelineItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  isLast?: boolean;
}

export interface TimelineDotProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  variant?: TimelineVariant;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'muted';
}

export interface TimelineSeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface TimelineConnectorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export interface TimelineContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
