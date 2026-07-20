// @wireservers-ui/react-natives-pro
//
// Premium components for @wireservers-ui/react-natives. Requires a license key; see
// `setLicenseKey`. Unlicensed use is watermarked, never disabled.

// Licensing
export {
  getLicenseStatus,
  isLicensed,
  setLicenseKey,
  verifyLicenseKey,
  PRO_PRODUCT_ID,
} from './licensing/license';
export type {
  LicenseEdition,
  LicenseInvalidReason,
  LicensePayload,
  LicenseStatus,
} from './licensing/license';
export { LicenseWatermark, WithLicenseWatermark, useLicenseStatus } from './licensing/watermark';
export type { LicenseWatermarkProps } from './licensing/watermark';

// DataGrid Pro
export { DataGridPro } from './data-grid-pro/data-grid-pro';
export type { DataGridProProps } from './data-grid-pro/data-grid-pro';
export { buildCsv, escapeCsvField } from './data-grid-pro/to-csv';
export type { BuildCsvOptions } from './data-grid-pro/to-csv';
export { buildXlsx, columnLetter, escapeXml, sanitizeSheetName } from './data-grid-pro/to-xlsx';
export type { BuildXlsxOptions } from './data-grid-pro/to-xlsx';

// Date range picker
export { DateRangePicker } from './date-range-picker/date-range-picker';
export type { DateRangePickerProps } from './date-range-picker/date-range-picker';
export {
  DEFAULT_PRESETS,
  addDays,
  addMonths,
  buildMonthGrid,
  daysBetween,
  endOfDay,
  endOfMonth,
  formatMonthLabel,
  formatRangeLabel,
  isSameDay,
  isSelectable,
  isWithinRange,
  selectDate,
  startOfDay,
  startOfMonth,
} from './date-range-picker/range-utils';
export type { DateRange, DateRangePreset } from './date-range-picker/range-utils';

// Scheduler
export { Scheduler } from './scheduler/scheduler';
export type { SchedulerProps } from './scheduler/scheduler';
export {
  DEFAULT_GEOMETRY,
  createEventFromDrag,
  formatTimeRange,
  hourLabels,
  layoutDayEvents,
  minutesToY,
  moveEvent,
  resizeEvent,
  snapToGrid,
  weekDays,
  yToMinutes,
} from './scheduler/scheduler-utils';
export type { SchedulerEvent, SchedulerGeometry, LaidOutEvent } from './scheduler/scheduler-utils';

// Charts — require the optional peer `react-native-svg`
export { LineChart, AreaChart, BarChart, DonutChart, Sparkline, StatTile } from './charts/charts';
export type {
  CartesianChartProps,
  BarChartProps,
  DonutChartProps,
  SparklineProps,
  StatTileProps,
} from './charts/charts';
export {
  DEFAULT_PALETTE,
  DEFAULT_PADDING,
  areaPath,
  bandX,
  donutArcs,
  linePath,
  nearestIndex,
  plotArea,
  scaleX,
  scaleY,
  seriesColor,
  yExtent,
  yTicks,
} from './charts/chart-utils';
export type { ChartPoint, ChartSeries, ChartLayout, ChartPadding, DonutSlice, DonutArc, Extent } from './charts/chart-utils';

// Combobox + Command palette
export { Combobox } from './search/combobox';
export type { ComboboxProps, ComboboxOption } from './search/combobox';
export { CommandPalette } from './search/command-palette';
export type { CommandPaletteProps, Command } from './search/command-palette';
export { fuzzyMatch, rankItems, highlightSegments, moveActiveIndex } from './search/fuzzy';
export type { FuzzyMatch, RankableItem, RankedItem } from './search/fuzzy';

// Form builder / wizard
export { FormBuilder } from './forms/form-builder';
export type { FormBuilderProps } from './forms/form-builder';
export {
  canAdvance, fieldsForStep, formSteps, initialValues, isFieldVisible, isLastStep,
  nextStep, previousStep, prunedValues, validateField, validateForm, validateStep, visibleFields,
} from './forms/form-utils';
export type { FieldSchema, FieldType, FieldRule, FieldOption, FieldCondition, FormValues, FormErrors } from './forms/form-utils';

// Kanban board
export { Kanban } from './kanban/kanban';
export type { KanbanProps } from './kanban/kanban';
export { moveCard, findCard, insertionIndex, columnAtX, isColumnFull, cardCount } from './kanban/kanban-utils';
export type { KanbanCard, KanbanColumn, DropTarget } from './kanban/kanban-utils';
