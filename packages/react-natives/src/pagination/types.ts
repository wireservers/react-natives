import type { View, Pressable, Text as RNText } from 'react-native';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationContextValue { size: PaginationSize; }

export interface PaginationProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: PaginationSize;
}
export interface PaginationItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}
export interface PaginationPreviousProps extends Omit<PaginationItemProps, 'isActive'> {}
export interface PaginationNextProps extends Omit<PaginationItemProps, 'isActive'> {}
export interface PaginationEllipsisProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
