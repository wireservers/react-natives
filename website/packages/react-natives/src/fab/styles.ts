import { tv } from 'tailwind-variants';

export const fabStyle = tv({
  base: 'absolute bg-primary-500 flex-row items-center justify-center shadow-hard-3 z-20 active:bg-primary-600',
  variants: {
    placement: {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'top-center': 'top-4 self-center',
      'bottom-center': 'bottom-4 self-center',
    },
    size: {
      sm: 'h-10 min-w-[40px] rounded-full',
      md: 'h-13 min-w-[52px] rounded-full',
      lg: 'h-15 min-w-[60px] rounded-full',
    },
    isExtended: {
      true: 'px-5 gap-2',
      false: '',
    },
  },
  defaultVariants: {
    placement: 'bottom-right',
    size: 'md',
    isExtended: false,
  },
});

export const fabIconStyle = tv({
  base: 'text-typography-0',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const fabLabelStyle = tv({
  base: 'text-typography-0 font-semibold',
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
