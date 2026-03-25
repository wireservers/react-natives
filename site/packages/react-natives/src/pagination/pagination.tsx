import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { PaginationProps, PaginationItemProps, PaginationPreviousProps, PaginationNextProps, PaginationEllipsisProps, PaginationContextValue } from './types';
import { paginationStyle, paginationItemStyle, paginationItemTextStyle, paginationEllipsisStyle } from './styles';

export const [PaginationProvider, usePaginationContext] = createComponentContext<PaginationContextValue>('Pagination');

export const Pagination = React.forwardRef<React.ElementRef<typeof View>, PaginationProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    return (
      <PaginationProvider value={{ size }}>
        <View ref={ref} className={paginationStyle({ class: className })} accessibilityRole="menu" {...props}>{children}</View>
      </PaginationProvider>
    );
  },
);
Pagination.displayName = 'Pagination';

export const PaginationItem = React.forwardRef<React.ElementRef<typeof Pressable>, PaginationItemProps>(
  ({ className, isActive = false, isDisabled, children, ...props }, ref) => {
    const { size } = usePaginationContext();
    return (
      <Pressable ref={ref} disabled={isDisabled} className={paginationItemStyle({ size, isActive, isDisabled, class: className })} accessibilityRole="button" {...props}>
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text className={paginationItemTextStyle({ size, isActive })}>{children}</Text>
        ) : children}
      </Pressable>
    );
  },
);
PaginationItem.displayName = 'PaginationItem';

export const PaginationPrevious = React.forwardRef<React.ElementRef<typeof Pressable>, PaginationPreviousProps>(
  ({ children = '‹', ...props }, ref) => {
    return <PaginationItem ref={ref} {...props}>{children}</PaginationItem>;
  },
);
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = React.forwardRef<React.ElementRef<typeof Pressable>, PaginationNextProps>(
  ({ children = '›', ...props }, ref) => {
    return <PaginationItem ref={ref} {...props}>{children}</PaginationItem>;
  },
);
PaginationNext.displayName = 'PaginationNext';

export const PaginationEllipsis = React.forwardRef<React.ElementRef<typeof View>, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => {
    const { size } = usePaginationContext();
    return (
      <View ref={ref} className={paginationEllipsisStyle({ size, class: className })} {...props}>
        <Text className={paginationItemTextStyle({ size, isActive: false })}>…</Text>
      </View>
    );
  },
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
