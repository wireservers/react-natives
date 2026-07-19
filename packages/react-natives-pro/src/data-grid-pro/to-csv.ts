import {
  computeViewRows,
  formatValue,
  toCell,
  type DataGridColumn,
  type DataGridProps,
  type DataGridSort,
} from '@wireservers-ui/react-natives';

export interface BuildCsvOptions {
  columns: DataGridColumn[];
  rowCount: number;
  getCellContent: DataGridProps['getCellContent'];
  getSortValue?: DataGridProps['getSortValue'];
  sort?: DataGridSort | null;
  filters?: Record<string, string>;
  manualSort?: boolean;
  manualFilter?: boolean;
  /** Emit the column titles as a first row. Defaults to true. */
  includeHeader?: boolean;
  /** Field separator. Defaults to a comma; pass '\t' for TSV. */
  delimiter?: string;
}

/**
 * Escape a single CSV field per RFC 4180: wrap in quotes when the value contains a delimiter,
 * quote, or newline, and double any embedded quotes.
 *
 * A leading =, +, -, or @ is also prefixed with a single quote. Spreadsheet apps treat such
 * fields as formulas, which turns an exported grid into a CSV-injection vector.
 */
export function escapeCsvField(value: string, delimiter = ','): string {
  const needsFormulaGuard = /^[=+\-@]/.test(value);
  const guarded = needsFormulaGuard ? `'${value}` : value;
  const needsQuoting =
    guarded.includes(delimiter) ||
    guarded.includes('"') ||
    guarded.includes('\n') ||
    guarded.includes('\r');
  if (!needsQuoting) return guarded;
  return `"${guarded.replace(/"/g, '""')}"`;
}

/**
 * Serialize the grid's *currently displayed* rows to CSV.
 *
 * Sorting and filtering are resolved with `computeViewRows` from the base package — the very
 * function the grid renders from — so an export can never drift from what the user sees.
 */
export function buildCsv(options: BuildCsvOptions): string {
  const {
    columns,
    rowCount,
    getCellContent,
    getSortValue,
    sort,
    filters,
    manualSort,
    manualFilter,
    includeHeader = true,
    delimiter = ',',
  } = options;

  const viewRows = computeViewRows({
    columns,
    rowCount,
    getCellContent,
    getSortValue,
    sort,
    filters,
    manualSort,
    manualFilter,
  });

  const lines: string[] = [];
  if (includeHeader) {
    lines.push(columns.map((column) => escapeCsvField(column.title, delimiter)).join(delimiter));
  }

  const count = viewRows ? viewRows.length : rowCount;
  for (let position = 0; position < count; position += 1) {
    const row = viewRows ? viewRows[position] : position;
    if (row == null) continue;
    const fields = columns.map((column) =>
      escapeCsvField(formatValue(toCell(getCellContent(row, column), column)), delimiter),
    );
    lines.push(fields.join(delimiter));
  }

  return lines.join('\r\n');
}
