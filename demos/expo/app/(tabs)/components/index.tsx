import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Footer } from '@/components/footer';
import {
  componentRegistry,
  categories,
} from '@/lib/component-registry';
import { BRAND_COLOR } from '@wireservers-ui/react-natives';
import { DOC_BG } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

const ALL_CATEGORIES = ['All', ...categories];

export default function CatalogScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  const filtered = useMemo(() => {
    let items = componentRegistry;

    if (selectedCategory !== 'All') {
      items = items.filter((c) => c.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }

    return items;
  }, [search, selectedCategory]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DOC_BG }}>
      <View style={{ width: '100%', maxWidth: 1504, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 6 }}>
            All Components
          </Text>
          <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
            {componentRegistry.length}+ responsive components built for React Native with NativeWind.
          </Text>
        </View>
        {/* Search */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 }}
        >
          <MaterialIcons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search components..."
            placeholderTextColor="#9CA3AF"
            style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: '#111827' }}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <MaterialIcons name="close" size={18} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginBottom: 20 }}
        >
          {ALL_CATEGORIES.map((cat) => {
            const isSelected = cat === selectedCategory;
            return (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: isSelected ? BRAND_COLOR : '#fff',
                  borderWidth: 1,
                  borderColor: isSelected ? BRAND_COLOR : '#E5E7EB',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: isSelected ? '600' : '400',
                    color: isSelected ? '#fff' : '#374151',
                  }}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Component Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {filtered.map((comp) => (
            <Pressable
              key={comp.slug}
              onPress={() => router.push(`/components/docs/${comp.slug}` as any)}
              style={{
                flex: 1,
                minWidth: '45%',
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: '#F3F4F6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons
                    name={getComponentIcon(comp.slug)}
                    size={20}
                    color="#6B7280"
                  />
                </View>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>
                  {comp.name}
                </Text>
              </View>
              <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 18 }} numberOfLines={2}>
                {comp.description}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

function getComponentIcon(slug: string): keyof typeof MaterialIcons.glyphMap {
  const icons: Record<string, keyof typeof MaterialIcons.glyphMap> = {
    button: 'smart-button',
    text: 'text-fields',
    heading: 'title',
    icon: 'stars',
    divider: 'horizontal-rule',
    badge: 'verified',
    spinner: 'refresh',
    image: 'image',
    avatar: 'account-circle',
    card: 'dashboard',
    kbd: 'keyboard',
    code: 'code',
    blockquote: 'format-quote',
    'form-control': 'assignment',
    input: 'text-fields',
    textarea: 'notes',
    switch: 'toggle-on',
    checkbox: 'check-box',
    radio: 'radio-button-checked',
    slider: 'tune',
    select: 'arrow-drop-down-circle',
    alert: 'warning',
    progress: 'linear-scale',
    'circular-progress': 'donut-large',
    link: 'link',
    modal: 'open-in-new',
    toast: 'notifications',
    tooltip: 'info',
    drawer: 'menu-open',
    actionsheet: 'view-agenda',
    'alert-dialog': 'report',
    popover: 'chat-bubble',
    snackbar: 'announcement',
    tabs: 'tab',
    accordion: 'expand-more',
    breadcrumb: 'chevron-right',
    fab: 'add-circle',
    menu: 'menu',
    pagination: 'more-horiz',
    stepper: 'format-list-numbered',
    'segmented-control': 'view-column',
    tag: 'label',
    skeleton: 'rectangle',
    empty: 'inbox',
    stat: 'trending-up',
    table: 'table-chart',
    list: 'list',
    timeline: 'timeline',
    carousel: 'view-carousel',
    'icon-button': 'touch-app',
    overlay: 'layers',
    box: 'crop-square',
    stack: 'view-stream',
    center: 'center-focus-strong',
    'aspect-ratio': 'aspect-ratio',
    pressable: 'touch-app',
    container: 'crop-free',
    portal: 'exit-to-app',
    'visually-hidden': 'visibility-off',
    toggle: 'toggle-off',
    'toggle-group': 'toggle-on',
    collapsible: 'unfold-less',
    calendar: 'calendar-today',
    'number-input': 'pin',
    'password-input': 'lock',
    'search-input': 'search',
    rating: 'star',
    'tags-input': 'sell',
    'date-picker': 'date-range',
    'pin-input': 'dialpad',
    'color-picker': 'palette',
  };
  return icons[slug] ?? 'widgets';
}
