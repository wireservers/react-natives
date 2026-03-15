import { tv } from 'tailwind-variants';

export const toggleGroupStyle = tv({
  base: 'flex-row items-center rounded-lg border border-outline-200 overflow-hidden',
  variants: {},
});

export const toggleGroupItemStyle = tv({
  base: 'items-center justify-center border-r border-outline-200 last:border-r-0',
  variants: {
    variant: {
      outline: 'bg-transparent',
      solid: 'bg-background-50',
    },
    size: {
      sm: 'h-8 px-2.5',
      md: 'h-10 px-3',
      lg: 'h-12 px-4',
    },
    isSelected: {
      true: '',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
  compoundVariants: [
    { variant: 'outline', isSelected: true, class: 'bg-primary-50' },
    { variant: 'solid', isSelected: true, class: 'bg-primary-500' },
  ],
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});
