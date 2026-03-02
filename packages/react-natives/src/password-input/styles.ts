import { tv } from 'tailwind-variants';

export const passwordInputStyle = tv({
  base: 'flex-row items-center border border-outline-300 rounded-lg overflow-hidden bg-background-0',
  variants: {
    size: { sm: 'h-8', md: 'h-10', lg: 'h-12' },
    isDisabled: { true: 'opacity-50' },
  },
  defaultVariants: { size: 'md' },
});
export const passwordInputFieldStyle = tv({
  base: 'flex-1 text-typography-900 px-3',
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  defaultVariants: { size: 'md' },
});
export const passwordInputToggleStyle = tv({
  base: 'items-center justify-center px-3',
  variants: {},
});
export const passwordInputToggleTextStyle = tv({
  base: 'text-xs font-medium text-typography-500',
  variants: {},
});
