import { tv } from 'tailwind-variants';

export const carouselStyle = tv({ base: 'relative', variants: {} });
export const carouselContentStyle = tv({ base: '', variants: {} });
export const carouselItemStyle = tv({ base: 'w-full', variants: {} });
export const carouselPreviousStyle = tv({
  base: 'h-8 w-8 items-center justify-center rounded-full bg-background-100 border border-outline-200',
  variants: {},
});
export const carouselNextStyle = tv({
  base: 'h-8 w-8 items-center justify-center rounded-full bg-background-100 border border-outline-200',
  variants: {},
});
export const carouselDotsStyle = tv({ base: 'flex-row items-center justify-center gap-1.5 mt-3', variants: {} });
export const carouselDotStyle = tv({
  base: 'h-2 w-2 rounded-full',
  variants: {
    isActive: { true: 'bg-primary-500', false: 'bg-background-300' },
  },
  defaultVariants: { isActive: false },
});
