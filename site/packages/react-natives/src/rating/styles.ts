import { tv } from 'tailwind-variants';

export const ratingStyle = tv({
  base: 'flex-row items-center gap-0.5',
  variants: {},
});
export const ratingIconStyle = tv({
  base: '',
  variants: {
    size: { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6', xl: 'h-8 w-8' },
  },
  defaultVariants: { size: 'md' },
});
