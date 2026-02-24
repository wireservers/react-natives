import { tv } from 'tailwind-variants';

export const dividerStyle = tv({
  base: 'bg-outline-200',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
