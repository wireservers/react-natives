import type { View, Text as RNText } from 'react-native';

export interface TableProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface TableHeadProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface TableBodyProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface TableFooterProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface TableRowProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface TableCellProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface TableHeaderCellProps extends React.ComponentPropsWithoutRef<typeof View> { className?: string; }
export interface TableCaptionProps extends React.ComponentPropsWithoutRef<typeof RNText> { className?: string; }
