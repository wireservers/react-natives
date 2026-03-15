import React from 'react';
import { View, Text } from 'react-native';
import type { TableProps, TableHeadProps, TableBodyProps, TableFooterProps, TableRowProps, TableCellProps, TableHeaderCellProps, TableCaptionProps } from './types';
import { tableStyle, tableHeadStyle, tableBodyStyle, tableFooterStyle, tableRowStyle, tableCellStyle, tableHeaderCellStyle, tableHeaderCellTextStyle, tableCellTextStyle, tableCaptionStyle } from './styles';

export const Table = React.forwardRef<React.ElementRef<typeof View>, TableProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={tableStyle({ class: className })} {...props} />;
});
Table.displayName = 'Table';

export const TableHead = React.forwardRef<React.ElementRef<typeof View>, TableHeadProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={tableHeadStyle({ class: className })} {...props} />;
});
TableHead.displayName = 'TableHead';

export const TableBody = React.forwardRef<React.ElementRef<typeof View>, TableBodyProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={tableBodyStyle({ class: className })} {...props} />;
});
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<React.ElementRef<typeof View>, TableFooterProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={tableFooterStyle({ class: className })} {...props} />;
});
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<React.ElementRef<typeof View>, TableRowProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={tableRowStyle({ class: className })} {...props} />;
});
TableRow.displayName = 'TableRow';

export const TableCell = React.forwardRef<React.ElementRef<typeof View>, TableCellProps>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={tableCellStyle({ class: className })} {...props}>
      {typeof children === 'string' ? <Text className={tableCellTextStyle({})}>{children}</Text> : children}
    </View>
  );
});
TableCell.displayName = 'TableCell';

export const TableHeaderCell = React.forwardRef<React.ElementRef<typeof View>, TableHeaderCellProps>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className={tableHeaderCellStyle({ class: className })} {...props}>
      {typeof children === 'string' ? <Text className={tableHeaderCellTextStyle({})}>{children}</Text> : children}
    </View>
  );
});
TableHeaderCell.displayName = 'TableHeaderCell';

export const TableCaption = React.forwardRef<React.ElementRef<typeof Text>, TableCaptionProps>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={tableCaptionStyle({ class: className })} {...props} />;
});
TableCaption.displayName = 'TableCaption';
