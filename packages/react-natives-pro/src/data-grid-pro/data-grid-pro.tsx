import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import {
  DataGrid,
  type DataGridProps,
  type DataGridSort,
} from '@wireservers-ui/react-natives';
import { WithLicenseWatermark } from '../licensing/watermark';
import { buildCsv } from './to-csv';
import { buildXlsx } from './to-xlsx';

export interface DataGridProProps extends DataGridProps {
  /** Show the Pro toolbar (export controls). Defaults to true. */
  showToolbar?: boolean;
  /** Base name for the exported file, without extension. Defaults to 'export'. */
  exportFileName?: string;
  /**
   * Receives the generated CSV text.
   *
   * On web, omitting this triggers a browser download. On iOS/Android there is no universal
   * "save file" primitive, and forcing a dependency such as expo-file-system on every consumer
   * would be wrong — so native callers supply this and hand the text to their own sharing or
   * file-system layer.
   */
  onExportCsv?: (csv: string, fileName: string) => void;
  /**
   * Receives the generated .xlsx as bytes. Same platform story as `onExportCsv`: web downloads
   * by default, native callers hand the bytes to their own file-system layer (base64-encode
   * them for `expo-file-system`).
   */
  onExportXlsx?: (bytes: Uint8Array, fileName: string) => void;
  /** Field separator for the CSV export. Defaults to a comma. */
  exportDelimiter?: string;
  /** Show the XLSX button alongside CSV. Defaults to true. */
  showXlsxExport?: boolean;
  /** Worksheet name for the XLSX export. Sanitised to Excel's rules. */
  exportSheetName?: string;
}

/** Browser-only download. Returns false when there's no DOM to drive. */
function downloadBlobOnWeb(blob: Blob, fileName: string): boolean {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return false;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
  return true;
}

// ﻿ (BOM) makes Excel read CSV as UTF-8 rather than the local ANSI codepage, which
// otherwise mangles accented and non-Latin characters.
const CSV_BOM = '﻿';

/**
 * DataGrid with the Pro feature set: export toolbar, column pinning, and server-side data
 * support. Requires a license key — see `setLicenseKey`. Without one it stays fully functional
 * and renders an "unlicensed" watermark.
 *
 * Sort and filter state is owned here (and mirrored back through the caller's callbacks) so an
 * export can always reflect exactly what the user is looking at.
 */
export const DataGridPro = React.forwardRef<React.ElementRef<typeof View>, DataGridProProps>(
  (
    {
      showToolbar = true,
      exportFileName = 'export',
      onExportCsv,
      onExportXlsx,
      exportDelimiter,
      showXlsxExport = true,
      exportSheetName,
      sort,
      defaultSort = null,
      onSortChange,
      filters,
      defaultFilters,
      onFiltersChange,
      ...gridProps
    },
    ref,
  ) => {
    const [internalSort, setInternalSort] = React.useState<DataGridSort | null>(defaultSort);
    const [internalFilters, setInternalFilters] = React.useState<Record<string, string>>(
      defaultFilters ?? {},
    );

    // Respect a caller-controlled value when given one, otherwise track it ourselves.
    const activeSort = sort !== undefined ? sort : internalSort;
    const activeFilters = filters !== undefined ? filters : internalFilters;

    const handleSortChange = React.useCallback(
      (next: DataGridSort | null) => {
        if (sort === undefined) setInternalSort(next);
        onSortChange?.(next);
      },
      [onSortChange, sort],
    );

    const handleFiltersChange = React.useCallback(
      (next: Record<string, string>) => {
        if (filters === undefined) setInternalFilters(next);
        onFiltersChange?.(next);
      },
      [filters, onFiltersChange],
    );

    const exportCsv = React.useCallback(() => {
      const csv = buildCsv({
        columns: gridProps.columns,
        rowCount: gridProps.rowCount,
        getCellContent: gridProps.getCellContent,
        getSortValue: gridProps.getSortValue,
        sort: activeSort,
        filters: activeFilters,
        manualSort: gridProps.manualSort,
        manualFilter: gridProps.manualFilter,
        delimiter: exportDelimiter,
      });
      const fileName = `${exportFileName}.csv`;
      if (onExportCsv) {
        onExportCsv(csv, fileName);
        return;
      }
      const blob = new Blob([`${CSV_BOM}${csv}`], { type: 'text/csv;charset=utf-8;' });
      if (!downloadBlobOnWeb(blob, fileName)) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@wireservers-ui/react-natives-pro] No `onExportCsv` handler was supplied and this ' +
            'platform has no default download. Pass `onExportCsv` to receive the CSV text.',
        );
      }
    }, [
      activeFilters,
      activeSort,
      exportDelimiter,
      exportFileName,
      gridProps.columns,
      gridProps.getCellContent,
      gridProps.getSortValue,
      gridProps.manualFilter,
      gridProps.manualSort,
      gridProps.rowCount,
      onExportCsv,
    ]);

    const exportXlsx = React.useCallback(() => {
      const bytes = buildXlsx({
        columns: gridProps.columns,
        rowCount: gridProps.rowCount,
        getCellContent: gridProps.getCellContent,
        getSortValue: gridProps.getSortValue,
        sort: activeSort,
        filters: activeFilters,
        manualSort: gridProps.manualSort,
        manualFilter: gridProps.manualFilter,
        sheetName: exportSheetName ?? exportFileName,
      });
      const fileName = `${exportFileName}.xlsx`;
      if (onExportXlsx) {
        onExportXlsx(bytes, fileName);
        return;
      }
      // Copy into a fresh ArrayBuffer: the typed array may be a view over a larger buffer,
      // and Blob would otherwise capture the whole thing.
      const buffer = bytes.slice().buffer;
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      if (!downloadBlobOnWeb(blob, fileName)) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@wireservers-ui/react-natives-pro] No `onExportXlsx` handler was supplied and this ' +
            'platform has no default download. Pass `onExportXlsx` to receive the file bytes.',
        );
      }
    }, [
      activeFilters,
      activeSort,
      exportFileName,
      exportSheetName,
      gridProps.columns,
      gridProps.getCellContent,
      gridProps.getSortValue,
      gridProps.manualFilter,
      gridProps.manualSort,
      gridProps.rowCount,
      onExportXlsx,
    ]);

    return (
      <WithLicenseWatermark>
        <View style={{ flex: 1 }}>
          {showToolbar ? (
            <View className="flex-row items-center justify-end gap-2 border-b border-outline-100 px-2 py-2">
              <Pressable
                onPress={exportCsv}
                accessibilityRole="button"
                accessibilityLabel="Export grid as CSV"
                className="rounded-md border border-outline-300 bg-background-0 px-3 py-1.5 active:bg-background-50"
              >
                <Text className="text-xs font-medium text-typography-900">Export CSV</Text>
              </Pressable>
              {showXlsxExport ? (
                <Pressable
                  onPress={exportXlsx}
                  accessibilityRole="button"
                  accessibilityLabel="Export grid as Excel workbook"
                  className="rounded-md border border-outline-300 bg-background-0 px-3 py-1.5 active:bg-background-50"
                >
                  <Text className="text-xs font-medium text-typography-900">Export Excel</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
          <DataGrid
            ref={ref}
            {...gridProps}
            sort={activeSort}
            onSortChange={handleSortChange}
            filters={activeFilters}
            onFiltersChange={handleFiltersChange}
          />
        </View>
      </WithLicenseWatermark>
    );
  },
);

DataGridPro.displayName = 'DataGridPro';
