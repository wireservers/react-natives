import { tv } from 'tailwind-variants';

export const actionsheetBackdropStyle = tv({
  base: 'absolute inset-0 bg-black/50',
});

export const actionsheetContentStyle = tv({
  base: 'bg-background-0 rounded-t-2xl pb-8 max-h-[70%]',
});

export const actionsheetDragIndicatorWrapperStyle = tv({
  base: 'items-center py-2',
});

export const actionsheetDragIndicatorStyle = tv({
  base: 'w-10 h-1 bg-outline-300 rounded-full',
});

export const actionsheetItemStyle = tv({
  base: 'flex-row items-center px-4 py-3 active:bg-background-100',
});

export const actionsheetItemTextStyle = tv({
  base: 'text-typography-900 text-base flex-1',
});
