import { tv } from 'tailwind-variants';

export const selectTriggerStyle = tv({
  base: 'flex-row items-center',
  variants: {
    variant: {
      outline: 'border border-outline-300 rounded-md bg-transparent',
      filled: 'border border-transparent rounded-md bg-background-50',
      underlined: 'border-b border-outline-300 bg-transparent rounded-none',
      rounded: 'border border-outline-300 rounded-full bg-transparent',
    },
    size: {
      sm: 'h-9 px-3',
      md: 'h-10 px-3',
      lg: 'h-11 px-3',
      xl: 'h-12 px-3.5',
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

export const selectInputStyle = tv({
  base: 'flex-1 text-typography-900',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    hasValue: {
      false: 'text-typography-400',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const selectIconStyle = tv({
  base: 'text-typography-400 ml-2',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const selectBackdropStyle = tv({
  base: 'absolute inset-0 bg-black/50',
});

export const selectContentStyle = tv({
  base: 'bg-background-0 rounded-t-2xl max-h-[60%] pb-8 shadow-hard-5',
});

export const selectDragIndicatorStyle = tv({
  base: 'w-10 h-1 bg-outline-300 rounded-full self-center mt-2 mb-3',
});

export const selectItemStyle = tv({
  base: 'flex-row items-center px-4 py-3 active:bg-background-100',
  variants: {
    isSelected: {
      true: 'bg-background-50',
    },
    isDisabled: {
      true: 'opacity-40',
    },
  },
});

export const selectItemTextStyle = tv({
  base: 'text-typography-900 flex-1',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    isSelected: {
      true: 'font-semibold text-primary-600',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
