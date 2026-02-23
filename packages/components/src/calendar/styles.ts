import { tv } from 'tailwind-variants';

export const calendarRootStyle = tv({
  base: 'bg-background-0 rounded-xl overflow-hidden border border-outline-200',
  variants: {
    size: {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
    },
  },
});

export const calendarHeaderStyle = tv({
  base: 'flex-row items-center justify-between px-2 py-3',
});

export const calendarHeaderTitleStyle = tv({
  base: 'text-lg font-semibold text-typography-900',
});

export const calendarNavButtonStyle = tv({
  base: 'p-2 rounded-lg active:bg-background-200',
});

export const calendarViewSwitcherStyle = tv({
  base: 'flex-row rounded-lg bg-background-100 p-0.5',
});

export const calendarViewButtonStyle = tv({
  base: 'px-3 py-1.5 rounded-md',
  variants: {
    active: {
      true: 'bg-background-0 shadow-hard-5',
      false: 'bg-transparent',
    },
  },
});

export const calendarViewButtonTextStyle = tv({
  base: 'text-sm font-medium',
  variants: {
    active: {
      true: 'text-typography-900',
      false: 'text-typography-500',
    },
  },
});

export const calendarWeekDayLabelStyle = tv({
  base: 'flex-1 items-center py-2',
});

export const calendarWeekDayLabelTextStyle = tv({
  base: 'text-xs font-medium text-typography-500 uppercase',
});

export const calendarDayCellStyle = tv({
  base: 'flex-1 min-h-[48px] items-center py-1 border-b border-outline-100',
  variants: {
    isCurrentMonth: {
      true: '',
      false: 'opacity-40',
    },
  },
});

export const calendarDayNumberStyle = tv({
  base: 'w-7 h-7 rounded-full items-center justify-center',
  variants: {
    isToday: {
      true: 'bg-primary-500',
      false: '',
    },
    isSelected: {
      true: 'bg-info-500',
      false: '',
    },
  },
});

export const calendarDayNumberTextStyle = tv({
  base: 'text-sm text-typography-900',
  variants: {
    isToday: {
      true: 'text-typography-0 font-bold',
      false: '',
    },
    isSelected: {
      true: 'text-typography-0 font-bold',
      false: '',
    },
    isCurrentMonth: {
      true: '',
      false: 'text-typography-400',
    },
  },
});

export const calendarEventStyle = tv({
  base: 'rounded px-1.5 py-0.5 mt-0.5 w-full',
  variants: {
    color: {
      primary: '',
      info: '',
      success: '',
      warning: '',
      error: '',
      tertiary: '',
    },
    variant: {
      subtle: '',
      solid: '',
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'subtle', class: 'bg-primary-100' },
    { color: 'info', variant: 'subtle', class: 'bg-info-100' },
    { color: 'success', variant: 'subtle', class: 'bg-success-100' },
    { color: 'warning', variant: 'subtle', class: 'bg-warning-100' },
    { color: 'error', variant: 'subtle', class: 'bg-error-100' },
    { color: 'tertiary', variant: 'subtle', class: 'bg-tertiary-100' },
    { color: 'primary', variant: 'solid', class: 'bg-primary-500' },
    { color: 'info', variant: 'solid', class: 'bg-info-500' },
    { color: 'success', variant: 'solid', class: 'bg-success-500' },
    { color: 'warning', variant: 'solid', class: 'bg-warning-500' },
    { color: 'error', variant: 'solid', class: 'bg-error-500' },
    { color: 'tertiary', variant: 'solid', class: 'bg-tertiary-500' },
  ],
  defaultVariants: {
    variant: 'subtle',
  },
});

export const calendarEventTextStyle = tv({
  base: 'text-2xs font-medium',
  variants: {
    color: {
      primary: '',
      info: '',
      success: '',
      warning: '',
      error: '',
      tertiary: '',
    },
    variant: {
      subtle: '',
      solid: 'text-typography-0 font-semibold',
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'subtle', class: 'text-primary-800' },
    { color: 'info', variant: 'subtle', class: 'text-info-800' },
    { color: 'success', variant: 'subtle', class: 'text-success-800' },
    { color: 'warning', variant: 'subtle', class: 'text-warning-800' },
    { color: 'error', variant: 'subtle', class: 'text-error-800' },
    { color: 'tertiary', variant: 'subtle', class: 'text-tertiary-800' },
  ],
  defaultVariants: {
    variant: 'subtle',
  },
});

export const calendarTimeSlotStyle = tv({
  base: 'flex-row min-h-[56px] border-b border-outline-100',
});

export const calendarTimeSlotLabelStyle = tv({
  base: 'w-16 py-2 pr-2 items-end',
});

export const calendarTimeSlotLabelTextStyle = tv({
  base: 'text-xs text-typography-400',
});

export const calendarTimeSlotContentStyle = tv({
  base: 'flex-1 border-l border-outline-100 px-1 py-0.5',
});

// --- Horizontal view styles ---

export const calendarHorizontalMemberColumnStyle = tv({
  base: 'border-r border-outline-200 bg-background-0 z-10',
});

export const calendarHorizontalMemberCellStyle = tv({
  base: 'flex-row items-center px-3 py-2 border-b border-outline-100 min-h-[72px]',
});

export const calendarHorizontalAvatarStyle = tv({
  base: 'w-10 h-10 rounded-full items-center justify-center mr-3',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const calendarHorizontalAvatarTextStyle = tv({
  base: 'text-xs font-bold text-typography-0',
});

export const calendarHorizontalMemberNameStyle = tv({
  base: 'text-sm font-semibold text-typography-900',
});

export const calendarHorizontalMemberRoleStyle = tv({
  base: 'text-2xs text-typography-400',
});

export const calendarHorizontalTimeHeaderStyle = tv({
  base: 'flex-row border-b border-outline-200 bg-background-50',
});

export const calendarHorizontalTimeSlotHeaderStyle = tv({
  base: 'items-center justify-center border-r border-outline-100 py-2',
});

export const calendarHorizontalTimeSlotHeaderTextStyle = tv({
  base: 'text-2xs text-typography-500 font-medium',
});

export const calendarHorizontalRowStyle = tv({
  base: 'flex-row border-b border-outline-100 relative min-h-[72px]',
});

export const calendarHorizontalGridCellStyle = tv({
  base: 'border-r border-outline-50 min-h-[72px]',
});

export const calendarHorizontalEventStyle = tv({
  base: 'absolute rounded-lg px-2 py-1 overflow-hidden justify-center',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarHorizontalEventTitleStyle = tv({
  base: 'text-xs font-semibold text-typography-0',
});

export const calendarHorizontalEventTimeStyle = tv({
  base: 'text-2xs text-typography-0 opacity-80',
});

// --- Vertical view styles ---

export const calendarVerticalMemberHeaderStyle = tv({
  base: 'flex-row border-b border-outline-200 bg-background-50',
});

export const calendarVerticalMemberCellStyle = tv({
  base: 'items-center justify-center py-2 px-1 border-r border-outline-100',
});

export const calendarVerticalMemberNameStyle = tv({
  base: 'text-xs font-semibold text-typography-900 text-center mt-1',
});

export const calendarVerticalMemberRoleStyle = tv({
  base: 'text-2xs text-typography-400 text-center',
});

export const calendarVerticalTimeColumnStyle = tv({
  base: 'border-r border-outline-200 bg-background-0 z-10',
});

export const calendarVerticalTimeCellStyle = tv({
  base: 'justify-center items-end pr-2 border-b border-outline-100',
});

export const calendarVerticalTimeCellTextStyle = tv({
  base: 'text-2xs text-typography-500 font-medium',
});

export const calendarVerticalColumnStyle = tv({
  base: 'border-r border-outline-100 relative',
});

export const calendarVerticalGridCellStyle = tv({
  base: 'border-b border-outline-50',
});

export const calendarVerticalEventStyle = tv({
  base: 'absolute rounded-lg px-1.5 py-1 overflow-hidden left-1 right-1',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarVerticalEventTitleStyle = tv({
  base: 'text-2xs font-semibold text-typography-0',
});

export const calendarVerticalEventTimeStyle = tv({
  base: 'text-2xs text-typography-0 opacity-80',
});

// --- Compact event styles (used in week/month timeline cells) ---

export const calendarCompactEventStyle = tv({
  base: 'rounded px-1.5 py-0.5 mb-0.5',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarCompactEventTextStyle = tv({
  base: 'text-2xs font-medium text-typography-0',
});

// --- Legend styles ---

export const calendarLegendContainerStyle = tv({
  base: 'flex-row flex-wrap gap-4 px-2 py-2',
});

export const calendarLegendItemStyle = tv({
  base: 'flex-row items-center gap-1.5',
});

export const calendarLegendDotStyle = tv({
  base: 'w-2.5 h-2.5 rounded-full',
  variants: {
    color: {
      primary: 'bg-primary-500',
      info: 'bg-info-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      tertiary: 'bg-tertiary-500',
    },
  },
});

export const calendarLegendTextStyle = tv({
  base: 'text-xs text-typography-600',
});
