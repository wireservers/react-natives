import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import {
  componentRegistry,
  categories,
} from '@/lib/component-registry';

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
    <ScrollView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ width: '100%', maxWidth: 1100, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
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
          <Text style={{ color: '#9CA3AF', fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search components..."
            placeholderTextColor="#9CA3AF"
            style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: '#111827' }}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Text style={{ color: '#9CA3AF', fontSize: 18 }}>✕</Text>
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
                  backgroundColor: isSelected ? '#4F46E5' : '#fff',
                  borderWidth: 1,
                  borderColor: isSelected ? '#4F46E5' : '#E5E7EB',
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
              onPress={() => router.push(`/docs/${comp.slug}` as any)}
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
                  <Text style={{ fontSize: 16, color: '#6B7280' }}>
                    {getComponentIcon(comp.slug)}
                  </Text>
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
    </ScrollView>

  );
}

function getComponentIcon(slug: string): string {
  const icons: Record<string, string> = {
    button: '▢',
    text: '𝐓',
    heading: '𝐇',
    icon: '✦',
    divider: '—',
    badge: '⬡',
    spinner: '⟳',
    image: '⊞',
    avatar: '👤',
    card: '▦',
    'form-control': '☰',
    input: '▭',
    textarea: '▤',
    switch: '◑',
    checkbox: '☑',
    radio: '◎',
    slider: '≡',
    select: '▾',
    alert: 'ⓘ',
    progress: '▰',
    link: '🔗',
    modal: '◻',
    toast: '💬',
    tooltip: '💭',
    drawer: '☰',
    actionsheet: '≡',
    tabs: '⬒',
    accordion: '▼',
    breadcrumb: '›',
    fab: '＋',
  };
  return icons[slug] ?? '◻';
}
