import { tv } from 'tailwind-variants';

export const containerStyle = tv({
  base: 'w-full px-4',
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      full: 'max-w-full',
    },
    centered: {
      true: 'mx-auto',
    },
  },
  defaultVariants: {
    size: 'lg',
    centered: true,
  },
});
