import { tv } from 'tailwind-variants';

export const iconStyle = tv({
  base: 'fill-none text-typography-900',
  variants: {
    size: {
      'xs': 'h-4 w-4',
      'sm': 'h-5 w-5',
      'md': 'h-6 w-6',
      'lg': 'h-8 w-8',
      'xl': 'h-10 w-10',
      '2xl': 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
