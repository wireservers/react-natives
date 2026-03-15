import { tv } from 'tailwind-variants';

export const sliderStyle = tv({
  base: 'justify-center',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    isDisabled: {
      true: 'opacity-40',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const sliderTrackStyle = tv({
  base: 'bg-background-200 rounded-full overflow-hidden',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', class: 'h-1' },
    { orientation: 'horizontal', size: 'md', class: 'h-1.5' },
    { orientation: 'horizontal', size: 'lg', class: 'h-2' },
    { orientation: 'vertical', size: 'sm', class: 'w-1' },
    { orientation: 'vertical', size: 'md', class: 'w-1.5' },
    { orientation: 'vertical', size: 'lg', class: 'w-2' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

export const sliderFilledTrackStyle = tv({
  base: 'bg-primary-500 rounded-full',
  variants: {
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const sliderThumbStyle = tv({
  base: 'bg-primary-500 rounded-full absolute shadow-hard-1 items-center justify-center',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
