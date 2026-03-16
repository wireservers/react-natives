import { tv } from 'tailwind-variants';

export const stepperStyle = tv({
  base: '',
  variants: {
    orientation: { horizontal: 'flex-row items-center', vertical: 'flex-col' },
  },
  defaultVariants: { orientation: 'horizontal' },
});
export const stepStyle = tv({
  base: 'items-center',
  variants: {
    orientation: { horizontal: 'flex-row gap-2 flex-1', vertical: 'flex-row gap-3 items-start' },
  },
  defaultVariants: { orientation: 'horizontal' },
});
export const stepIndicatorStyle = tv({
  base: 'h-8 w-8 rounded-full items-center justify-center border-2',
  variants: {
    isActive: { true: 'bg-primary-500 border-primary-500' },
    isCompleted: { true: 'bg-primary-500 border-primary-500' },
  },
  defaultVariants: { isActive: false, isCompleted: false },
});
export const stepIndicatorTextStyle = tv({
  base: 'text-sm font-semibold',
  variants: {
    isActive: { true: 'text-typography-0', false: 'text-typography-500' },
    isCompleted: { true: 'text-typography-0' },
  },
  defaultVariants: { isActive: false },
});
export const stepSeparatorStyle = tv({
  base: 'bg-outline-200',
  variants: {
    orientation: { horizontal: 'h-0.5 flex-1', vertical: 'w-0.5 min-h-[24px]' },
    isCompleted: { true: 'bg-primary-500' },
  },
  defaultVariants: { orientation: 'horizontal', isCompleted: false },
});
export const stepTitleStyle = tv({
  base: 'text-sm font-medium',
  variants: {
    isActive: { true: 'text-typography-900', false: 'text-typography-500' },
    isCompleted: { true: 'text-typography-900' },
  },
  defaultVariants: { isActive: false },
});
export const stepDescriptionStyle = tv({ base: 'text-xs text-typography-400', variants: {} });
