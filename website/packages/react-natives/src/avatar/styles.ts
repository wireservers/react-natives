import { tv } from 'tailwind-variants';

export const avatarStyle = tv({
  base: 'rounded-full items-center justify-center bg-primary-500 overflow-hidden relative',
  variants: {
    size: {
      'xs': 'h-6 w-6',
      'sm': 'h-8 w-8',
      'md': 'h-10 w-10',
      'lg': 'h-12 w-12',
      'xl': 'h-14 w-14',
      '2xl': 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const avatarImageStyle = tv({
  base: 'h-full w-full rounded-full absolute',
});

export const avatarFallbackTextStyle = tv({
  base: 'text-typography-0 font-semibold uppercase',
  variants: {
    size: {
      'xs': 'text-2xs',
      'sm': 'text-xs',
      'md': 'text-sm',
      'lg': 'text-base',
      'xl': 'text-lg',
      '2xl': 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const avatarBadgeStyle = tv({
  base: 'absolute rounded-full bg-success-500 border-2 border-background-0',
  variants: {
    size: {
      'xs': 'h-2 w-2 bottom-0 right-0',
      'sm': 'h-2.5 w-2.5 bottom-0 right-0',
      'md': 'h-3 w-3 bottom-0 right-0',
      'lg': 'h-3.5 w-3.5 bottom-0 right-0',
      'xl': 'h-4 w-4 bottom-0 right-0',
      '2xl': 'h-4 w-4 bottom-0.5 right-0.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const avatarGroupStyle = tv({
  base: 'flex-row items-center',
});

export const avatarGroupOverflowStyle = tv({
  base: 'rounded-full items-center justify-center bg-background-300',
  variants: {
    size: {
      'xs': 'h-6 w-6',
      'sm': 'h-8 w-8',
      'md': 'h-10 w-10',
      'lg': 'h-12 w-12',
      'xl': 'h-14 w-14',
      '2xl': 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const avatarGroupOverflowTextStyle = tv({
  base: 'text-typography-700 font-semibold',
  variants: {
    size: {
      'xs': 'text-2xs',
      'sm': 'text-xs',
      'md': 'text-xs',
      'lg': 'text-sm',
      'xl': 'text-base',
      '2xl': 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
