import { tv } from 'tailwind-variants';

export const iconStyle = tv({
  base: 'fill-none text-typography-900',
  variants: {
    size: {
      'xs': 'h-3 w-3',
      'sm': 'h-4 w-4',
      'md': 'h-[18px] w-[18px]',
      'lg': 'h-5 w-5',
      'xl': 'h-6 w-6',
      '2xl': 'h-7 w-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
