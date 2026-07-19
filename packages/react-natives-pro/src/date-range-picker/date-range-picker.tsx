import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  DEFAULT_PRESETS,
  addMonths,
  buildMonthGrid,
  formatMonthLabel,
  formatRangeLabel,
  isSameDay,
  isSelectable,
  isWithinRange,
  selectDate,
  startOfDay,
  type DateRange,
  type DateRangePreset,
} from './range-utils';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export interface DateRangePickerProps {
  /** Controlled value. Pair with `onChange`. */
  value?: DateRange;
  /** Initial value when uncontrolled. */
  defaultValue?: DateRange;
  /** Fires on every tap, including the intermediate state where only `start` is set. */
  onChange?: (range: DateRange) => void;
  /** Fires only once a range is complete — usually the one you want. */
  onRangeComplete?: (range: DateRange) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  /** Months shown side by side. Defaults to 2. */
  numberOfMonths?: number;
  /** 0 = Sunday (default) through 6 = Saturday. */
  weekStartsOn?: number;
  /** Preset shortcuts. Pass `[]` to hide the rail entirely. */
  presets?: DateRangePreset[];
  /** Overrides "today" — primarily for tests and stories. */
  today?: Date;
  className?: string;
}

/**
 * Two-month range calendar with preset shortcuts.
 *
 * The base library's `date-picker` handles a single date only; this covers the range case,
 * including the in-progress state where a start is chosen but no end yet.
 */
export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  onRangeComplete,
  minDate,
  maxDate,
  numberOfMonths = 2,
  weekStartsOn = 0,
  presets = DEFAULT_PRESETS,
  today,
  className,
}: DateRangePickerProps) {
  const now = React.useMemo(() => startOfDay(today ?? new Date()), [today]);
  const [internalRange, setInternalRange] = React.useState<DateRange>(
    defaultValue ?? { start: null, end: null },
  );
  const range = value ?? internalRange;

  // Open on the month containing the current start so an existing selection is visible.
  const [firstMonth, setFirstMonth] = React.useState<Date>(() => range.start ?? now);

  const commit = React.useCallback(
    (next: DateRange) => {
      if (value === undefined) setInternalRange(next);
      onChange?.(next);
      if (next.start && next.end) onRangeComplete?.(next);
    },
    [onChange, onRangeComplete, value],
  );

  const handleDayPress = React.useCallback(
    (date: Date) => {
      if (!isSelectable(date, minDate, maxDate)) return;
      commit(selectDate(range, date));
    },
    [commit, maxDate, minDate, range],
  );

  const handlePreset = React.useCallback(
    (preset: DateRangePreset) => {
      const next = preset.getRange(now);
      if (next.start) setFirstMonth(next.start);
      commit(next);
    },
    [commit, now],
  );

  const months = React.useMemo(
    () => Array.from({ length: numberOfMonths }, (_, i) => addMonths(firstMonth, i)),
    [firstMonth, numberOfMonths],
  );

  return (
    <WithLicenseWatermark>
      <View className={className}>
        <View className="flex-row">
          {presets.length > 0 ? (
            <View className="border-r border-outline-100 py-2 pr-2">
              {presets.map((preset) => (
                <Pressable
                  key={preset.id}
                  onPress={() => handlePreset(preset)}
                  accessibilityRole="button"
                  className="rounded-md px-3 py-1.5 active:bg-background-100"
                >
                  <Text className="text-xs text-typography-700">{preset.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          <View className="flex-1 px-2 py-2">
            <View className="mb-2 flex-row items-center justify-between">
              <Pressable
                onPress={() => setFirstMonth((m) => addMonths(m, -1))}
                accessibilityRole="button"
                accessibilityLabel="Previous month"
                className="rounded-md px-2 py-1 active:bg-background-100"
              >
                <Text className="text-sm text-typography-700">‹</Text>
              </Pressable>
              <Text className="text-xs font-semibold text-typography-900">
                {months.map(formatMonthLabel).join('  ·  ')}
              </Text>
              <Pressable
                onPress={() => setFirstMonth((m) => addMonths(m, 1))}
                accessibilityRole="button"
                accessibilityLabel="Next month"
                className="rounded-md px-2 py-1 active:bg-background-100"
              >
                <Text className="text-sm text-typography-700">›</Text>
              </Pressable>
            </View>

            <View className="flex-row gap-4">
              {months.map((month) => (
                <View key={month.toISOString()}>
                  <View className="flex-row">
                    {WEEKDAY_LABELS.map((label, index) => (
                      <View key={`${label}-${index}`} className="h-6 w-8 items-center justify-center">
                        <Text className="text-[10px] text-typography-400">
                          {WEEKDAY_LABELS[(index + weekStartsOn) % 7]}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {buildMonthGrid(month, weekStartsOn).map((week, weekIndex) => (
                    <View key={weekIndex} className="flex-row">
                      {week.map((day) => {
                        const inMonth = day.getMonth() === month.getMonth();
                        const selectable = isSelectable(day, minDate, maxDate);
                        const isStart = isSameDay(day, range.start);
                        const isEnd = isSameDay(day, range.end);
                        const inRange = isWithinRange(day, range);
                        const isEdge = isStart || isEnd;
                        return (
                          <Pressable
                            key={day.toISOString()}
                            onPress={() => handleDayPress(day)}
                            disabled={!selectable}
                            accessibilityRole="button"
                            accessibilityState={{ selected: isEdge || inRange, disabled: !selectable }}
                            accessibilityLabel={day.toDateString()}
                            className={[
                              'h-8 w-8 items-center justify-center',
                              isEdge ? 'rounded-md bg-primary-500' : inRange ? 'bg-primary-100' : '',
                            ].join(' ')}
                          >
                            <Text
                              className={[
                                'text-xs',
                                isEdge
                                  ? 'font-semibold text-typography-0'
                                  : !selectable
                                    ? 'text-typography-300'
                                    : inMonth
                                      ? 'text-typography-900'
                                      : 'text-typography-400',
                              ].join(' ')}
                            >
                              {day.getDate()}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <Text className="mt-2 text-[11px] text-typography-500">{formatRangeLabel(range)}</Text>
          </View>
        </View>
      </View>
    </WithLicenseWatermark>
  );
}

DateRangePicker.displayName = 'DateRangePicker';
