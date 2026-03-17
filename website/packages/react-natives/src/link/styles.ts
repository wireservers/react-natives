import { tv } from 'tailwind-variants';

export const linkStyle = tv({
  base: 'web:cursor-pointer',
});

export const linkTextStyle = tv({
  base: 'text-primary-600 underline data-[hover=true]:text-primary-700 data-[active=true]:text-primary-800',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
