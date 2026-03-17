import { tv } from 'tailwind-variants';

export const textareaStyle = tv({
  base: 'text-typography-900 web:outline-none',
  variants: {
    variant: {
      outline: 'border border-outline-300 rounded-md',
      filled: 'border border-transparent rounded-md bg-background-50',
      underlined: 'border-b border-outline-300 rounded-none',
    },
    size: {
      sm: 'min-h-[80px] text-sm p-2',
      md: 'min-h-[100px] text-base p-3',
      lg: 'min-h-[120px] text-lg p-3',
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
