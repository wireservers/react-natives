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
