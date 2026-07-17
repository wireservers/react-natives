import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Input, InputField } from '../input';
import { Text } from '../text';
import type { SearchablePickerOption, SearchablePickerProps } from './types';

export const SearchablePicker = React.forwardRef<
  React.ElementRef<typeof View>,
  SearchablePickerProps
>(
  (
    {
      className,
      label,
      value,
      options,
      onChange,
      placeholder,
      freeText = false,
      emptyText = 'No options found',
      createActionLabel = 'Use',
      onCreateOption,
      maxVisibleOptions,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState(value);
    const [busy, setBusy] = React.useState(false);
    const [localError, setLocalError] = React.useState('');
    const pickerOptions = React.useMemo(
      () => options.map(normalizePickerOption),
      [options],
    );
    const selectedLabel =
      pickerOptions.find((option) => option.value === value)?.label ?? value;

    React.useEffect(() => {
      if (!open) setQuery(selectedLabel);
    }, [open, selectedLabel]);

    const trimmed = normalizeOptionLabel(query);
    const filteredOptions = React.useMemo(() => {
      const q = query.trim().toLowerCase();
      const matches = q
        ? pickerOptions.filter((option) =>
            [option.label, option.group].some((candidate) =>
              candidate?.toLowerCase().includes(q),
            ),
          )
        : pickerOptions;
      return maxVisibleOptions ? matches.slice(0, maxVisibleOptions) : matches;
    }, [maxVisibleOptions, pickerOptions, query]);

    const exactMatch = pickerOptions.find(
      (option) => option.label.toLowerCase() === trimmed.toLowerCase(),
    );
    const canCreate = Boolean(trimmed) && !exactMatch && (freeText || onCreateOption);

    const selectOption = React.useCallback(
      (next: string, nextLabel?: string) => {
        onChange(next);
        setQuery(nextLabel ?? next);
        setOpen(false);
        setLocalError('');
      },
      [onChange],
    );

    const createOrUseOption = React.useCallback(async () => {
      if (!trimmed) return;
      if (freeText) {
        selectOption(trimmed);
        return;
      }
      if (!onCreateOption) return;
      setBusy(true);
      setLocalError('');
      try {
        await onCreateOption(trimmed);
        selectOption(trimmed);
      } catch (err) {
        setLocalError(err instanceof Error ? err.message : String(err));
      } finally {
        setBusy(false);
      }
    }, [freeText, onCreateOption, selectOption, trimmed]);

    return (
      <View ref={ref} className={`gap-1.5 ${className ?? ''}`} {...props}>
        {label ? (
          <Text size="sm" weight="semibold" className="text-typography-700">
            {label}
          </Text>
        ) : null}
        <Input className="rounded-lg border-outline-200 bg-white">
          <InputField
            value={open ? query : selectedLabel}
            onFocus={() => {
              setQuery(freeText ? selectedLabel : '');
              setOpen(true);
            }}
            onChangeText={(next) => {
              setQuery(next);
              setLocalError('');
              if (freeText) onChange(next);
            }}
            onSubmitEditing={() => {
              if (exactMatch) selectOption(exactMatch.value, exactMatch.label);
              else if (canCreate) void createOrUseOption();
            }}
            placeholder={placeholder}
            className="min-h-[46px] w-full px-3 py-2 text-[15px] text-typography-950 web:outline-none"
          />
        </Input>
        {open ? (
          <View className="overflow-hidden rounded-lg border border-outline-200 bg-white shadow-sm">
            <ScrollView style={{ maxHeight: 280 }} nestedScrollEnabled>
              {filteredOptions.length > 0 ? (
                <GroupedOptions
                  options={filteredOptions}
                  value={value}
                  onSelect={selectOption}
                />
              ) : (
                <View className="px-3 py-2">
                  <Text size="sm" className="text-typography-500">
                    {emptyText}
                  </Text>
                </View>
              )}
            </ScrollView>
            {canCreate ? (
              <Pressable
                onPress={() => void createOrUseOption()}
                disabled={busy}
                className="border-t border-outline-200 bg-background-50 px-3 py-2"
              >
                <Text
                  size="sm"
                  weight="semibold"
                  className={busy ? 'text-typography-400' : 'text-primary-700'}
                >
                  {createActionLabel} "{trimmed}"
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
        {localError ? (
          <Text size="sm" className="text-error-600">
            {localError}
          </Text>
        ) : null}
      </View>
    );
  },
);

SearchablePicker.displayName = 'SearchablePicker';

function GroupedOptions({
  options,
  value,
  onSelect,
}: {
  options: SearchablePickerOption[];
  value: string;
  onSelect: (value: string, label: string) => void;
}) {
  let lastGroup = '';
  return (
    <>
      {options.map((option) => {
        const selected = value.toLowerCase() === option.value.toLowerCase();
        const showGroup = option.group && option.group !== lastGroup;
        lastGroup = option.group ?? '';
        return (
          <View key={`${option.group ?? 'Options'}:${option.value}`}>
            {showGroup ? (
              <View className="border-b border-outline-100 bg-background-50 px-3 py-2">
                <Text size="xs" weight="bold" className="uppercase text-typography-500">
                  {option.group}
                </Text>
              </View>
            ) : null}
            <Pressable
              onPress={() => onSelect(option.value, option.label)}
              className={`flex-row items-center gap-2 border-b border-outline-100 px-3 py-2 ${
                selected ? 'bg-primary-50' : 'bg-white'
              }`}
            >
              {option.icon ? (
                <View
                  className="h-7 w-7 items-center justify-center rounded-lg bg-background-100"
                  style={{ marginLeft: Math.min(option.depth ?? 0, 6) * 14 }}
                >
                  {typeof option.icon === 'string' ? (
                    <Text style={{ fontSize: 15 }}>{option.icon}</Text>
                  ) : (
                    option.icon
                  )}
                </View>
              ) : null}
              <Text
                size="sm"
                weight={selected ? 'bold' : 'normal'}
                className="flex-1 text-typography-800"
                style={{ paddingLeft: option.icon ? 0 : Math.min(option.depth ?? 0, 6) * 14 }}
              >
                {option.depth ? '- ' : ''}
                {option.label}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </>
  );
}

function normalizePickerOption(option: string | SearchablePickerOption): SearchablePickerOption {
  if (typeof option === 'string') return { value: option, label: option };
  return option;
}

function normalizeOptionLabel(value: string) {
  return value.trim().replace(/\s+/g, ' ');
}
