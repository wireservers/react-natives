import { tv } from 'tailwind-variants';

export const stackStyle = tv({
  base: 'flex',
  variants: {
    direction: {
      'row': 'flex-row',
      'column': 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    space: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
      '2xl': 'gap-8',
    },
  },
  defaultVariants: {
    direction: 'column',
    space: 'md',
  },
});
