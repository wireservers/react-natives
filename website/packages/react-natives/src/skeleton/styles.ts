import { tv } from 'tailwind-variants';

export const skeletonStyle = tv({
  base: 'bg-background-200 animate-pulse',
  variants: {},
  defaultVariants: {},
});

export const SKELETON_VARIANT_STYLE: Record<string, { borderRadius: number }> = {
  text: { borderRadius: 4 },
  circular: { borderRadius: 9999 },
  rectangular: { borderRadius: 0 },
  rounded: { borderRadius: 8 },
};
