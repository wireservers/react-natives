import { tv } from 'tailwind-variants';

export const tabsStyle = tv({
  base: 'w-full',
});

export const tabListStyle = tv({
  base: 'flex-row',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    variant: {
      underlined: 'border-b border-outline-200',
      outline: 'gap-1',
      rounded: 'bg-background-100 rounded-lg p-0.5 gap-0.5',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'underlined',
  },
});

export const tabStyle = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'px-3 py-1.5',
      md: 'px-4 py-2',
      lg: 'px-5 py-2.5',
    },
    variant: {
      underlined: '',
      outline: '',
      rounded: '',
    },
    active: {
      true: '',
      false: '',
    },
    isFitted: {
      true: 'flex-1',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'underlined',
      active: true,
      class: 'border-b-2 border-primary-500',
    },
    {
      variant: 'underlined',
      active: false,
      class: 'border-b-2 border-transparent',
    },
    {
      variant: 'outline',
      active: true,
      class: 'border border-outline-300 rounded-md bg-background-0',
    },
    {
      variant: 'outline',
      active: false,
      class: 'bg-transparent',
    },
    {
      variant: 'rounded',
      active: true,
      class: 'bg-background-0 rounded-md shadow-hard-5',
    },
    {
      variant: 'rounded',
      active: false,
      class: 'bg-transparent',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'underlined',
    active: false,
    isFitted: false,
  },
});

export const tabTextStyle = tv({
  base: 'font-medium',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    active: {
      true: 'text-typography-900',
      false: 'text-typography-500',
    },
  },
  defaultVariants: {
    size: 'md',
    active: false,
  },
});

export const tabPanelsStyle = tv({
  base: 'mt-3',
});

export const tabPanelStyle = tv({
  base: '',
});
