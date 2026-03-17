import { tv } from 'tailwind-variants';

export const pressableStyle = tv({
  base: 'self-start',
  variants: {
    isDisabled: {
      true: 'opacity-50',
    },
  },
});
