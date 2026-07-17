import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '../alert-dialog';
import { Button, ButtonText } from '../button';
import { Heading } from '../heading';
import { Text } from '../text';
import type { ConfirmDialogProps, ConfirmOptions, UseConfirmResult } from './types';

export function useConfirm(): UseConfirmResult {
  const [options, setOptions] = React.useState<ConfirmOptions | null>(null);
  const resolverRef = React.useRef<((result: boolean) => void) | null>(null);

  const confirm = React.useCallback((next: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setOptions(next);
    });
  }, []);

  const settle = React.useCallback((result: boolean) => {
    setOptions(null);
    const resolve = resolverRef.current;
    resolverRef.current = null;
    resolve?.(result);
  }, []);

  const dialog = (
    <ConfirmDialog
      options={options}
      onCancel={() => settle(false)}
      onConfirm={() => settle(true)}
    />
  );

  return { confirm, dialog };
}

export function ConfirmDialog({ options, onCancel, onConfirm }: ConfirmDialogProps) {
  const tone = options?.tone ?? 'negative';
  return (
    <AlertDialog isOpen={Boolean(options)} onClose={onCancel} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent className="mx-auto w-full max-w-[440px] rounded-lg border border-outline-200 bg-background-0 p-0 shadow-lg">
        <AlertDialogHeader className="border-b border-outline-200 bg-background-0 px-5 py-4">
          <Heading size="lg" className="text-typography-950">
            {options?.title ?? 'Are you sure?'}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="gap-2 bg-background-0 px-5 py-4">
          {options?.message ? (
            <Text className="text-typography-700">{options.message}</Text>
          ) : null}
          {options?.detail ? (
            <Text size="sm" className="text-typography-500">
              {options.detail}
            </Text>
          ) : null}
        </AlertDialogBody>
        <AlertDialogFooter className="flex-row flex-wrap justify-end gap-2 border-t border-outline-200 bg-background-0 px-5 py-4">
          <Button variant="outline" action="default" size="sm" onPress={onCancel} className="rounded-xl">
            <ButtonText>{options?.cancelLabel ?? 'Cancel'}</ButtonText>
          </Button>
          <Button
            variant="solid"
            action={tone === 'primary' ? 'primary' : 'negative'}
            size="sm"
            onPress={onConfirm}
            className="rounded-xl"
          >
            <ButtonText>{options?.confirmLabel ?? 'Delete'}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
