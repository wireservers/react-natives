import { tv } from 'tailwind-variants';

export const searchInputStyle = tv({
  base: 'flex-row items-center border border-outline-300 rounded-lg bg-background-0 px-3',
  variants: {
    size: { sm: 'h-8 gap-1.5', md: 'h-10 gap-2', lg: 'h-12 gap-2.5' },
    isDisabled: { true: 'opacity-50' },
  },
  defaultVariants: { size: 'md' },
});
export const searchInputFieldStyle = tv({
  base: 'flex-1 text-typography-900',
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  defaultVariants: { size: 'md' },
});
export const searchInputIconStyle = tv({
  base: 'text-typography-400',
  variants: {
    size: { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' },
  },
  defaultVariants: { size: 'md' },
});
export const searchInputClearButtonStyle = tv({
  base: 'p-0.5 rounded-full',
  variants: {},
});
