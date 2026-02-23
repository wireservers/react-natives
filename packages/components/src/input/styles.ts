import { tv } from 'tailwind-variants';

export const inputStyle = tv({
  base: 'flex-row items-center',
  variants: {
    variant: {
      outline: 'border border-outline-300 rounded-md bg-transparent',
      filled: 'border border-transparent rounded-md bg-background-50',
      underlined: 'border-b border-outline-300 bg-transparent rounded-none',
      rounded: 'border border-outline-300 rounded-full bg-transparent',
    },
    size: {
      sm: 'h-9',
      md: 'h-10',
      lg: 'h-11',
      xl: 'h-12',
    },
    isFocused: {
      true: 'border-primary-500',
    },
    isInvalid: {
      true: 'border-error-500',
    },
    isDisabled: {
      true: 'opacity-40',
    },
  },
  compoundVariants: [
    {
      isFocused: true,
      isInvalid: true,
      class: 'border-error-500',
    },
  ],
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export const inputFieldStyle = tv({
  base: 'flex-1 text-typography-900 px-3 web:outline-none',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const inputSlotStyle = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'px-2',
      md: 'px-3',
      lg: 'px-3',
      xl: 'px-3.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const inputIconStyle = tv({
  base: 'text-typography-400',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-5 w-5',
    },
    isFocused: {
      true: 'text-typography-700',
    },
    isInvalid: {
      true: 'text-error-500',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
