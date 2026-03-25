import React from 'react';
import { View, Text } from 'react-native';
import { createComponentContext } from '../utils/create-context';
import type { ListProps, ListItemProps, ListItemTextProps, ListItemDescriptionProps, ListItemIconProps, ListContextValue } from './types';
import { listStyle, listItemStyle, listItemBulletStyle, listItemTextStyle, listItemDescriptionStyle, listItemIconStyle } from './styles';

export const [ListProvider, useListContext] = createComponentContext<ListContextValue>('List');

export const List = React.forwardRef<React.ElementRef<typeof View>, ListProps>(
  ({ className, variant = 'unordered', children, ...props }, ref) => {
    let itemIndex = 0;
    const indexedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && (child.type as any).displayName === 'ListItem') {
        return React.cloneElement(child as React.ReactElement<any>, { index: itemIndex++ });
      }
      return child;
    });
    return (
      <ListProvider value={{ variant }}>
        <View ref={ref} className={listStyle({ class: className })} accessibilityRole="list" {...props}>{indexedChildren}</View>
      </ListProvider>
    );
  },
);
List.displayName = 'List';

export const ListItem = React.forwardRef<React.ElementRef<typeof View>, ListItemProps>(
  ({ className, index, children, ...props }, ref) => {
    const { variant } = useListContext();
    return (
      <View ref={ref} className={listItemStyle({ class: className })} accessibilityRole="text" {...props}>
        <Text className={listItemBulletStyle({})}>
          {variant === 'ordered' && index !== undefined ? `${index + 1}.` : '\u2022'}
        </Text>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    );
  },
);
ListItem.displayName = 'ListItem';

export const ListItemText = React.forwardRef<React.ElementRef<typeof Text>, ListItemTextProps>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={listItemTextStyle({ class: className })} {...props} />;
});
ListItemText.displayName = 'ListItemText';

export const ListItemDescription = React.forwardRef<React.ElementRef<typeof Text>, ListItemDescriptionProps>(({ className, ...props }, ref) => {
  return <Text ref={ref} className={listItemDescriptionStyle({ class: className })} {...props} />;
});
ListItemDescription.displayName = 'ListItemDescription';

export const ListItemIcon = React.forwardRef<any, ListItemIconProps>(({ as: AsComp, className, ...props }, ref) => {
  return <AsComp ref={ref} className={listItemIconStyle({ class: className })} {...props} />;
});
ListItemIcon.displayName = 'ListItemIcon';
