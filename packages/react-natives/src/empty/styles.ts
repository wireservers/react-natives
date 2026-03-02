import { tv } from 'tailwind-variants';

export const emptyStyle = tv({
  base: 'items-center justify-center py-12 px-6',
  variants: {},
});

export const emptyIconStyle = tv({
  base: 'h-12 w-12 text-typography-300 mb-4',
  variants: {},
});

export const emptyTitleStyle = tv({
  base: 'text-lg font-semibold text-typography-900 mb-1 text-center',
  variants: {},
});

export const emptyDescriptionStyle = tv({
  base: 'text-sm text-typography-500 text-center mb-4',
  variants: {},
});

export const emptyActionStyle = tv({
  base: 'mt-2',
  variants: {},
});
