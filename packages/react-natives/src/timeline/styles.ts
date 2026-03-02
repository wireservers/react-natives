import { tv } from 'tailwind-variants';

export const timelineStyle = tv({
  base: 'gap-0',
  variants: {},
});

export const timelineItemStyle = tv({
  base: 'flex-row gap-3 items-stretch',
  variants: {},
});

export const timelineSeparatorStyle = tv({
  base: 'items-center',
  variants: {},
});

export const timelineDotStyle = tv({
  base: 'h-3 w-3 rounded-full',
  variants: {
    variant: {
      solid: '',
      outline: 'bg-transparent border-2',
    },
    color: {
      primary: '', success: '', error: '', warning: '', info: '', muted: '',
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'solid', class: 'bg-primary-500' },
    { color: 'primary', variant: 'outline', class: 'border-primary-500' },
    { color: 'success', variant: 'solid', class: 'bg-success-500' },
    { color: 'success', variant: 'outline', class: 'border-success-500' },
    { color: 'error', variant: 'solid', class: 'bg-error-500' },
    { color: 'error', variant: 'outline', class: 'border-error-500' },
    { color: 'warning', variant: 'solid', class: 'bg-warning-500' },
    { color: 'warning', variant: 'outline', class: 'border-warning-500' },
    { color: 'info', variant: 'solid', class: 'bg-info-500' },
    { color: 'info', variant: 'outline', class: 'border-info-500' },
    { color: 'muted', variant: 'solid', class: 'bg-background-400' },
    { color: 'muted', variant: 'outline', class: 'border-background-400' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
  },
});

export const timelineConnectorStyle = tv({
  base: 'w-0.5 flex-1 bg-outline-200 my-1',
  variants: {},
});

export const timelineContentStyle = tv({
  base: 'flex-1 pb-6',
  variants: {},
});
