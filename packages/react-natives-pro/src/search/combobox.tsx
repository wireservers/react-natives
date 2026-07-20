import React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import { highlightSegments, moveActiveIndex, rankItems, type RankableItem } from './fuzzy';

export interface ComboboxOption extends RankableItem {
  group?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options?: ComboboxOption[];
  /**
   * Async source. Called on a debounce as the user types; return the matching options.
   * When supplied, filtering is delegated to it rather than done locally.
   */
  loadOptions?: (query: string) => Promise<ComboboxOption[]>;
  /** Debounce for `loadOptions`, ms. Defaults to 250. */
  debounceMs?: number;
  value?: string[];
  defaultValue?: string[];
  onChange?: (ids: string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  /** Offer to create an option when nothing matches. */
  onCreate?: (label: string) => void;
  createLabel?: (query: string) => string;
  maxVisible?: number;
  emptyMessage?: string;
  className?: string;
}

/**
 * Autocomplete / multi-select with fuzzy ranking, async loading, and create-on-the-fly.
 *
 * Ranking comes from `fuzzy.ts`, which is unit-tested separately.
 */
export function Combobox({
  options,
  loadOptions,
  debounceMs = 250,
  value,
  defaultValue,
  onChange,
  multiple = false,
  placeholder = 'Search…',
  onCreate,
  createLabel = (q) => `Create “${q}”`,
  maxVisible = 8,
  emptyMessage = 'No matches',
  className,
}: ComboboxProps) {
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [internal, setInternal] = React.useState<string[]>(defaultValue ?? []);
  const [asyncOptions, setAsyncOptions] = React.useState<ComboboxOption[]>([]);
  const [loading, setLoading] = React.useState(false);

  const selected = value ?? internal;

  // Async loading, debounced. The request id guards against an earlier, slower response
  // overwriting a later one.
  const requestId = React.useRef(0);
  React.useEffect(() => {
    if (!loadOptions) return;
    const id = ++requestId.current;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const result = await loadOptions(query);
        if (id === requestId.current) setAsyncOptions(result);
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, loadOptions, debounceMs]);

  const source = loadOptions ? asyncOptions : options ?? [];
  // An async source has already filtered; ranking it again would fight the server.
  const ranked = React.useMemo(
    () => (loadOptions ? source.map((item) => ({ item, score: 0, indices: [] })) : rankItems(query, source, maxVisible)),
    [loadOptions, source, query, maxVisible],
  );

  const showCreate = Boolean(onCreate) && query.trim().length > 0 &&
    !source.some((o) => o.label.toLowerCase() === query.trim().toLowerCase());
  const rowCount = ranked.length + (showCreate ? 1 : 0);

  const commit = React.useCallback(
    (ids: string[]) => {
      if (value === undefined) setInternal(ids);
      onChange?.(ids);
    },
    [onChange, value],
  );

  const toggle = React.useCallback(
    (option: ComboboxOption) => {
      if (option.disabled) return;
      if (multiple) {
        commit(selected.includes(option.id) ? selected.filter((id) => id !== option.id) : [...selected, option.id]);
      } else {
        commit([option.id]);
        setOpen(false);
        setQuery('');
      }
    },
    [commit, multiple, selected],
  );

  const onKeyPress = (event: { nativeEvent: { key: string } }) => {
    const key = event.nativeEvent.key;
    if (key === 'ArrowDown') setActiveIndex((i) => moveActiveIndex(i, 1, rowCount));
    else if (key === 'ArrowUp') setActiveIndex((i) => moveActiveIndex(i, -1, rowCount));
    else if (key === 'Escape') setOpen(false);
    else if (key === 'Enter') {
      if (showCreate && activeIndex === ranked.length) {
        onCreate?.(query.trim());
        setQuery('');
      } else if (ranked[activeIndex]) {
        toggle(ranked[activeIndex].item);
      }
    }
  };

  const selectedOptions = source.filter((o) => selected.includes(o.id));

  return (
    <WithLicenseWatermark>
      <View className={className}>
        {multiple && selectedOptions.length > 0 ? (
          <View className="mb-1 flex-row flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => toggle(option)}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${option.label}`}
                className="flex-row items-center gap-1 rounded-full bg-primary-100 px-2 py-0.5"
              >
                <Text className="text-[11px] text-primary-700">{option.label}</Text>
                <Text className="text-[11px] text-primary-500">×</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <TextInput
          value={query}
          onChangeText={(t) => { setQuery(t); setOpen(true); setActiveIndex(0); }}
          onFocus={() => setOpen(true)}
          onKeyPress={onKeyPress as never}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          accessibilityLabel={placeholder}
          className="rounded-md border border-outline-300 bg-background-0 px-3 py-2 text-sm text-typography-900"
        />

        {open ? (
          <View className="mt-1 overflow-hidden rounded-md border border-outline-200 bg-background-0">
            {loading ? (
              <View className="flex-row items-center gap-2 px-3 py-2">
                <ActivityIndicator size="small" />
                <Text className="text-xs text-typography-500">Searching…</Text>
              </View>
            ) : null}

            <FlatList
              data={ranked}
              keyExtractor={(r) => r.item.id}
              style={{ maxHeight: 240 }}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item: row, index }) => {
                const isSelected = selected.includes(row.item.id);
                const isActive = index === activeIndex;
                return (
                  <Pressable
                    onPress={() => toggle(row.item)}
                    disabled={row.item.disabled}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected, disabled: row.item.disabled }}
                    accessibilityLabel={row.item.label}
                    className={`flex-row items-center justify-between px-3 py-2 ${isActive ? 'bg-background-100' : ''}`}
                  >
                    <Text className={`text-sm ${row.item.disabled ? 'text-typography-300' : 'text-typography-900'}`}>
                      {highlightSegments(row.item.label, row.indices).map((seg, i) => (
                        <Text key={i} className={seg.matched ? 'font-bold text-primary-600' : undefined}>
                          {seg.text}
                        </Text>
                      ))}
                    </Text>
                    {isSelected ? <Text className="text-xs text-primary-600">✓</Text> : null}
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                loading ? null : (
                  <Text className="px-3 py-2 text-xs text-typography-400">{emptyMessage}</Text>
                )
              }
            />

            {showCreate ? (
              <Pressable
                onPress={() => { onCreate?.(query.trim()); setQuery(''); }}
                accessibilityRole="button"
                className={`border-t border-outline-100 px-3 py-2 ${activeIndex === ranked.length ? 'bg-background-100' : ''}`}
              >
                <Text className="text-sm text-primary-600">{createLabel(query.trim())}</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </View>
    </WithLicenseWatermark>
  );
}

Combobox.displayName = 'Combobox';
