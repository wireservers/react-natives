import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Footer } from '@/components/footer';
import { SeoHead } from '@/components/seo/seo-head';
import {
  componentRegistry,
  categories,
} from '@/lib/component-registry';
import { usePageColors, useCustomTheme } from '@/context/custom-theme-context';
import { SITE_URL } from '@/lib/seo';

const ALL_CATEGORIES = ['All', ...categories];

export default function CatalogScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();
  const c = usePageColors();
  const { theme } = useCustomTheme();
  const [footerH, setFooterH] = useState(180);

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
    <View style={{ flex: 1, backgroundColor: c.docBg }}>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: footerH }}>
      <SeoHead
        title="Components | React-Natives UI Library"
        description={`Browse ${componentRegistry.length}+ responsive React Native components organized by category. Buttons, forms, navigation, data display, and more.`}
        path="/components"
        keywords="react native components list, react native ui catalog, mobile component docs, react native examples"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/components#collection`,
          url: `${SITE_URL}/components`,
          name: 'React-Natives Components Catalog',
          description: `Browse ${componentRegistry.length}+ responsive React Native components by category.`,
          isPartOf: {
            '@id': `${SITE_URL}/#website`,
          },
        }}
      />
      <View style={{ width: '100%', maxWidth: 1504, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: c.heading, marginBottom: 6 }}>
            All Components
          </Text>
          <Text style={{ fontSize: 15, color: c.text, lineHeight: 22 }}>
            {componentRegistry.length}+ responsive components built for React Native with NativeWind.
          </Text>
        </View>
        {/* Search */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: c.inputBg, borderWidth: 1, borderColor: c.border, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 }}
        >
          <Text style={{ color: c.iconText, fontSize: 16, marginRight: 8 }}>S</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search components..."
            placeholderTextColor={c.iconText}
            style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: c.heading }}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Text style={{ color: c.iconText, fontSize: 14, fontWeight: '700' }}>x</Text>
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
                  backgroundColor: isSelected ? theme.primary : c.cardBg,
                  borderWidth: 1,
                  borderColor: isSelected ? theme.primary : c.border,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: isSelected ? '600' : '400',
                    color: isSelected ? '#fff' : c.textSecondary,
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
                backgroundColor: c.cardBg,
                borderWidth: 1,
                borderColor: c.border,
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
                    backgroundColor: c.iconSubtle,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: c.iconText, fontSize: 16, fontWeight: '700' }}>
                    {getComponentIcon(comp.slug)}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: '700', color: c.heading }}>
                  {comp.name}
                </Text>
              </View>
              <Text style={{ fontSize: 13, color: c.text, lineHeight: 18 }} numberOfLines={2}>
                {comp.description}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
    <View
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
      onLayout={(e) => setFooterH(e.nativeEvent.layout.height)}
    >
      <Footer />
    </View>
    </View>
  );
}

function getComponentIcon(slug: string): string {
  const first = slug
    .replace(/[^a-z0-9]/gi, ' ')
    .trim()
    .charAt(0);

  return first ? first.toUpperCase() : 'C';
}
