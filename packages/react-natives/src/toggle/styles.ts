import { tv } from 'tailwind-variants';

export const toggleStyle = tv({
  base: 'items-center justify-center rounded-lg',
  variants: {
    variant: {
      outline: 'border border-outline-300 bg-transparent',
      solid: 'bg-background-100',
    },
    size: {
      sm: 'h-8 px-2.5',
      md: 'h-10 px-3',
      lg: 'h-12 px-4',
    },
    isPressed: {
      true: '',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
  compoundVariants: [
    { variant: 'outline', isPressed: true, class: 'bg-primary-50 border-primary-500' },
    { variant: 'solid', isPressed: true, class: 'bg-primary-500' },
  ],
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});
