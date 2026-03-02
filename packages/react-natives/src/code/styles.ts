import { tv } from 'tailwind-variants';

export const codeStyle = tv({
  base: 'font-mono text-sm rounded px-1 py-0.5',
  variants: {
    variant: {
      subtle: 'bg-background-100 text-typography-800',
      outline: 'border border-outline-200 text-typography-800',
      solid: 'bg-typography-900 text-typography-0',
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
});

export const codeBlockStyle = tv({
  base: 'bg-background-950 rounded-lg p-4 overflow-hidden',
  variants: {},
});

export const codeBlockTextStyle = tv({
  base: 'font-mono text-sm text-typography-50',
  variants: {},
});
