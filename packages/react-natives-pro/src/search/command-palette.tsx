import React from 'react';
import { Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import { highlightSegments, moveActiveIndex, rankItems, type RankableItem } from './fuzzy';

export interface Command extends RankableItem {
  /** Section heading. Commands are grouped under it. */
  group?: string;
  /** Shortcut hint, e.g. ['⌘', 'K']. Display only. */
  shortcut?: string[];
  icon?: React.ReactNode;
  disabled?: boolean;
  run: () => void;
}

export interface CommandPaletteProps {
  commands: Command[];
  /** Controlled visibility. Omit to let the component manage it via the ⌘K/Ctrl-K hotkey. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  /** Bind ⌘K / Ctrl-K on web. Defaults true. No-op on native. */
  hotkey?: boolean;
  maxVisible?: number;
}

/**
 * ⌘K command palette with fuzzy search, grouping, and keyboard navigation.
 *
 * Ranking comes from `fuzzy.ts`. On web the ⌘K/Ctrl-K listener is attached to `document`;
 * on native there is no keyboard to bind, so open it yourself via the `open` prop.
 */
export function CommandPalette({
  commands,
  open: controlledOpen,
  onOpenChange,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No matching commands',
  hotkey = true,
  maxVisible = 50,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);

  const open = controlledOpen ?? internalOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
      if (!next) { setQuery(''); setActiveIndex(0); }
    },
    [controlledOpen, onOpenChange],
  );

  const enabled = React.useMemo(() => commands.filter((c) => !c.disabled), [commands]);
  const ranked = React.useMemo(() => rankItems(query, enabled, maxVisible), [query, enabled, maxVisible]);

  // ⌘K / Ctrl-K on web only.
  React.useEffect(() => {
    if (!hotkey || Platform.OS !== 'web' || typeof document === 'undefined') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(!open);
      } else if (event.key === 'Escape' && open) {
        setOpen(false);
      } else if (open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        setActiveIndex((i) => moveActiveIndex(i, event.key === 'ArrowDown' ? 1 : -1, ranked.length));
      } else if (open && event.key === 'Enter') {
        event.preventDefault();
        const command = ranked[activeIndex]?.item;
        if (command) { setOpen(false); command.run(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [hotkey, open, ranked, activeIndex, setOpen]);

  // Group while preserving rank order: a group appears where its best match landed.
  const groups = React.useMemo(() => {
    const out: { name: string | undefined; rows: typeof ranked }[] = [];
    for (const row of ranked) {
      const name = row.item.group;
      const last = out[out.length - 1];
      if (last && last.name === name) last.rows.push(row);
      else out.push({ name, rows: [row] });
    }
    return out;
  }, [ranked]);

  let flatIndex = -1;

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable
        onPress={() => setOpen(false)}
        accessibilityLabel="Close command palette"
        style={{ flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', alignItems: 'center', paddingTop: 96 }}
      >
        {/* Stop presses inside the panel from closing it. */}
        <Pressable onPress={() => {}} style={{ width: '100%', maxWidth: 560 }}>
          <WithLicenseWatermark>
            <View className="overflow-hidden rounded-xl border border-outline-200 bg-background-0">
              <TextInput
                autoFocus
                value={query}
                onChangeText={(t) => { setQuery(t); setActiveIndex(0); }}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                accessibilityLabel={placeholder}
                className="border-b border-outline-100 px-4 py-3 text-base text-typography-900"
              />

              <ScrollView style={{ maxHeight: 360 }} keyboardShouldPersistTaps="handled">
                {ranked.length === 0 ? (
                  <Text className="px-4 py-6 text-center text-sm text-typography-400">{emptyMessage}</Text>
                ) : (
                  groups.map((group, gi) => (
                    <View key={`${group.name ?? 'ungrouped'}-${gi}`}>
                      {group.name ? (
                        <Text className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wide text-typography-400">
                          {group.name}
                        </Text>
                      ) : null}
                      {group.rows.map((row) => {
                        flatIndex += 1;
                        const isActive = flatIndex === activeIndex;
                        return (
                          <Pressable
                            key={row.item.id}
                            onPress={() => { setOpen(false); row.item.run(); }}
                            accessibilityRole="button"
                            accessibilityLabel={row.item.label}
                            className={`flex-row items-center justify-between px-4 py-2 ${isActive ? 'bg-background-100' : ''}`}
                          >
                            <View className="flex-row items-center gap-2">
                              {row.item.icon}
                              <Text className="text-sm text-typography-900">
                                {highlightSegments(row.item.label, row.indices).map((seg, i) => (
                                  <Text key={i} className={seg.matched ? 'font-bold text-primary-600' : undefined}>
                                    {seg.text}
                                  </Text>
                                ))}
                              </Text>
                            </View>
                            {row.item.shortcut ? (
                              <View className="flex-row gap-1">
                                {row.item.shortcut.map((key) => (
                                  <View key={key} className="rounded border border-outline-200 px-1.5 py-0.5">
                                    <Text className="text-[10px] text-typography-500">{key}</Text>
                                  </View>
                                ))}
                              </View>
                            ) : null}
                          </Pressable>
                        );
                      })}
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </WithLicenseWatermark>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

CommandPalette.displayName = 'CommandPalette';
