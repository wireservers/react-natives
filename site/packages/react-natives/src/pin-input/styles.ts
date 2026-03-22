import { tv } from 'tailwind-variants';

export const pinInputStyle = tv({ base: 'flex-row gap-2', variants: {} });
export const pinInputFieldStyle = tv({
  base: 'border border-outline-300 rounded-lg text-center text-typography-900 font-semibold bg-background-0',
  variants: {
    size: {
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
    },
    isFilled: { true: 'border-primary-500' },
    isDisabled: { true: 'opacity-50' },
  },
  defaultVariants: { size: 'md' },
});
