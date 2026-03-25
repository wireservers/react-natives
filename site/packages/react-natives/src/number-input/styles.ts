import { tv } from 'tailwind-variants';

export const numberInputStyle = tv({
  base: 'flex-row items-center border border-outline-300 rounded-lg overflow-hidden',
  variants: {
    size: { sm: 'h-8', md: 'h-10', lg: 'h-12' },
    isDisabled: { true: 'opacity-50' },
  },
  defaultVariants: { size: 'md' },
});
export const numberInputFieldStyle = tv({
  base: 'flex-1 text-center text-typography-900',
  variants: {
    size: { sm: 'text-sm px-2', md: 'text-base px-3', lg: 'text-lg px-4' },
  },
  defaultVariants: { size: 'md' },
});
export const numberInputStepperStyle = tv({
  base: 'self-stretch justify-center',
  variants: {},
});
export const numberInputButtonStyle = tv({
  base: 'items-center justify-center bg-background-50 border-l border-outline-200',
  variants: {
    size: { sm: 'w-8 flex-1', md: 'w-10 flex-1', lg: 'w-12 flex-1' },
  },
  defaultVariants: { size: 'md' },
});
export const numberInputButtonTextStyle = tv({
  base: 'font-semibold text-typography-600',
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
  defaultVariants: { size: 'md' },
});
