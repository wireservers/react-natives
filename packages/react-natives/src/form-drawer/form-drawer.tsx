import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, ButtonText } from '../button';
import { Drawer, DrawerBackdrop } from '../drawer';
import { Heading } from '../heading';
import { Text } from '../text';
import type {
  DrawerCardProps,
  DrawerSectionLabelProps,
  DrawerShellProps,
  FormDrawerProps,
} from './types';

export const DrawerShell = React.forwardRef<
  React.ElementRef<typeof View>,
  DrawerShellProps
>(
  (
    {
      className,
      eyebrow,
      title,
      subtitle,
      onClose,
      footer,
      maxWidth = 520,
      topInset = 0,
      bottomInset = 0,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <Drawer
        isOpen
        onClose={onClose}
        placement="right"
        size="full"
        animationType="slide"
        slideFrom="right"
      >
        <DrawerBackdrop
          accessibilityRole="button"
          accessibilityLabel={`Close ${eyebrow.toLowerCase()}`}
          className="bg-slate-900/30"
        />
        <View style={styles.drawerContent} pointerEvents="box-none">
          <View
            ref={ref}
            style={[styles.drawerPanel, { maxWidth }, style]}
            className={className}
            {...props}
          >
            <View
              className="border-b border-outline-200 bg-[#111827] px-5 py-4"
              style={{ paddingTop: topInset + 16 }}
            >
              <View className="flex-row items-start justify-between gap-3">
                <View className="shrink gap-1">
                  <Text size="xs" weight="bold" className="uppercase text-primary-300">
                    {eyebrow}
                  </Text>
                  <Heading size="xl" className="text-white">
                    {title}
                  </Heading>
                  {subtitle ? <Text className="text-slate-300">{subtitle}</Text> : null}
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  onPress={onClose}
                  className="h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10"
                >
                  <Text size="xl" className="text-white">
                    x
                  </Text>
                </Pressable>
              </View>
            </View>
            <ScrollView
              className="flex-1 bg-background-50"
              contentContainerStyle={footer ? undefined : { paddingBottom: bottomInset }}
            >
              <View className="gap-4 p-5">{children}</View>
            </ScrollView>
            {footer ? (
              <View
                className="border-t border-outline-200 bg-white px-5 py-4"
                style={{ paddingBottom: bottomInset + 16 }}
              >
                {footer}
              </View>
            ) : null}
          </View>
        </View>
      </Drawer>
    );
  },
);

DrawerShell.displayName = 'DrawerShell';

export function FormDrawer({
  eyebrow,
  title,
  subtitle,
  onClose,
  onSave,
  onDelete,
  saveLabel = 'Save',
  deleteLabel = 'Delete',
  cancelLabel = 'Cancel',
  saveDisabled = false,
  footerNote,
  maxWidth,
  topInset,
  bottomInset,
  children,
  ...props
}: FormDrawerProps) {
  const footer = (
    <View className="flex-row flex-wrap items-center justify-between gap-2">
      {onDelete ? (
        <Button variant="outline" action="negative" size="sm" onPress={onDelete} className="rounded-xl">
          <ButtonText>{deleteLabel}</ButtonText>
        </Button>
      ) : footerNote ? (
        <View className="shrink">
          {typeof footerNote === 'string' ? (
            <Text className="text-typography-500">{footerNote}</Text>
          ) : (
            footerNote
          )}
        </View>
      ) : (
        <View />
      )}
      <View className="flex-row gap-2">
        <Button variant="outline" action="default" size="sm" onPress={onClose} className="rounded-xl">
          <ButtonText>{cancelLabel}</ButtonText>
        </Button>
        <Button size="sm" onPress={onSave} isDisabled={saveDisabled} className="rounded-xl">
          <ButtonText>{saveLabel}</ButtonText>
        </Button>
      </View>
    </View>
  );

  return (
    <DrawerShell
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      onClose={onClose}
      maxWidth={maxWidth}
      topInset={topInset}
      bottomInset={bottomInset}
      footer={footer}
      {...props}
    >
      {children}
    </DrawerShell>
  );
}

export const DrawerCard = React.forwardRef<React.ElementRef<typeof View>, DrawerCardProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={`gap-4 rounded-lg border border-outline-200 bg-white p-4 shadow-sm ${className ?? ''}`}
      {...props}
    />
  ),
);

DrawerCard.displayName = 'DrawerCard';

export function DrawerSectionLabel({ children, className }: DrawerSectionLabelProps) {
  return (
    <Text size="sm" weight="bold" className={`uppercase text-typography-500 ${className ?? ''}`}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  drawerPanel: {
    height: '100%',
    width: '92%',
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderLeftColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: -8, height: 0 },
  },
});
