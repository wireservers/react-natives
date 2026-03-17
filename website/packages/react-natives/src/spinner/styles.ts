import { tv } from 'tailwind-variants';

export const spinnerStyle = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
