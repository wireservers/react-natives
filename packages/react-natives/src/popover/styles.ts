import { tv } from 'tailwind-variants';

export const popoverContentStyle = tv({
  base: 'bg-background-0 rounded-lg p-4 shadow-hard-2 border border-outline-100',
  variants: {},
});

export const popoverArrowStyle = tv({
  base: 'w-3 h-3 bg-background-0 border border-outline-100 rotate-45',
  variants: {},
});

export const popoverHeaderStyle = tv({
  base: 'flex-row items-center justify-between mb-2',
  variants: {},
});

export const popoverBodyStyle = tv({
  base: 'mb-2',
  variants: {},
});

export const popoverFooterStyle = tv({
  base: 'flex-row justify-end gap-2 mt-2',
  variants: {},
});

export const popoverCloseButtonStyle = tv({
  base: 'p-1 rounded',
  variants: {},
});
