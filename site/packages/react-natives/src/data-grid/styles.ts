import { tv } from 'tailwind-variants';

export const dataGridStyle = tv({
  base: 'overflow-hidden rounded-xl border border-outline-200 bg-background-0',
  variants: {},
});

export const dataGridHeaderStyle = tv({
  base: 'flex-row border-b border-outline-200 bg-background-50',
  variants: {},
});

export const dataGridGroupHeaderStyle = tv({
  base: 'flex-row border-b border-outline-100 bg-background-100',
  variants: {},
});

export const dataGridRowStyle = tv({
  base: 'flex-row border-b border-outline-100 bg-background-0',
  variants: {
    isSelected: {
      true: 'bg-info-50',
      false: '',
    },
  },
});

export const dataGridHeaderCellStyle = tv({
  base: 'relative flex-row items-center border-r border-outline-100 px-3',
  variants: {
    isSelected: {
      true: 'bg-info-100',
      false: '',
    },
  },
});

export const dataGridHeaderCellTextStyle = tv({
  base: 'text-sm font-semibold text-typography-700',
  variants: {},
});

export const dataGridGroupHeaderTextStyle = tv({
  base: 'text-xs font-semibold text-typography-500',
  variants: {},
});

export const dataGridCellStyle = tv({
  base: 'overflow-hidden border-r border-outline-100 px-3 justify-center',
  variants: {
    isSelected: {
      true: 'bg-info-100',
      false: '',
    },
    isEditing: {
      true: 'border border-primary-500 bg-background-0',
      false: '',
    },
  },
});

export const dataGridCellTextStyle = tv({
  base: 'text-sm text-typography-800',
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    isMuted: {
      true: 'text-typography-500',
      false: '',
    },
  },
});

export const dataGridResizeHandleStyle = tv({
  base: 'absolute right-0 top-0 bottom-0 w-2 web:cursor-col-resize',
  variants: {},
});

export const dataGridBubbleStyle = tv({
  base: 'self-start rounded-full border border-outline-100 bg-background-0 px-2 py-1',
  variants: {},
});

export const dataGridImageStyle = tv({
  base: 'h-8 w-8 rounded-md bg-background-100',
  variants: {},
});

export const dataGridEditInputStyle = tv({
  base: 'min-h-8 rounded border border-primary-500 bg-background-0 px-2 text-sm text-typography-900',
  variants: {},
});
