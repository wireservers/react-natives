import { tv } from 'tailwind-variants';

export const tagsInputStyle = tv({
  base: 'flex-row flex-wrap items-center border border-outline-300 rounded-lg bg-background-0 p-1.5 gap-1.5',
  variants: {
    size: { sm: 'min-h-[32px]', md: 'min-h-[40px]', lg: 'min-h-[48px]' },
    isDisabled: { true: 'opacity-50' },
  },
  defaultVariants: { size: 'md' },
});
export const tagsInputFieldStyle = tv({
  base: 'flex-1 min-w-[80px] text-typography-900 px-1',
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  defaultVariants: { size: 'md' },
});
export const tagsInputTagStyle = tv({
  base: 'flex-row items-center bg-primary-50 rounded-md px-2 py-0.5 gap-1',
  variants: {},
});
export const tagsInputTagTextStyle = tv({
  base: 'text-xs font-medium text-primary-700',
  variants: {},
});
export const tagsInputTagCloseButtonStyle = tv({
  base: 'rounded-full',
  variants: {},
});
