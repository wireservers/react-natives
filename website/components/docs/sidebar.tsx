import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import {
  componentRegistry,
  categories,
  type ComponentCategory,
} from '@/lib/component-registry';

const SIDEBAR_WIDTH = 240;

/** Group components by category for sidebar display */
const grouped = categories.map((cat) => ({
  category: cat,
  items: componentRegistry.filter((c) => c.category === cat),
}));

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine the active slug from the current path
  const activeSlug = pathname.replace('/docs/', '').replace('/docs', '');
  const isIndex = pathname === '/docs' || pathname === '/docs/';

  return (
    <View
      style={{
        width: SIDEBAR_WIDTH,
        backgroundColor: '#111827',
        borderRightWidth: 1,
        borderRightColor: '#1F2937',
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* All Components link */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, paddingHorizontal: 8 }}>
            Components
          </Text>
          <Pressable
            onPress={() => router.push('/docs' as any)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 6,
              backgroundColor: isIndex ? '#1E293B' : 'transparent',
              borderLeftWidth: isIndex ? 3 : 0,
              borderLeftColor: '#4F46E5',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: isIndex ? '600' : '400',
                color: isIndex ? '#fff' : '#9CA3AF',
              }}
            >
              All Components
            </Text>
          </Pressable>
        </View>

        {/* Category groups */}
        {grouped.map(({ category, items }) => (
          <View key={category} style={{ paddingHorizontal: 16, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 8,
                paddingHorizontal: 8,
              }}
            >
              {category}
            </Text>
            {items.map((comp) => {
              const isActive = !isIndex && activeSlug === comp.slug;
              return (
                <Pressable
                  key={comp.slug}
                  onPress={() => router.push(`/docs/${comp.slug}` as any)}
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    backgroundColor: isActive ? '#1E293B' : 'transparent',
                    borderLeftWidth: isActive ? 3 : 0,
                    borderLeftColor: '#4F46E5',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? '#fff' : '#9CA3AF',
                    }}
                  >
                    {comp.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export { SIDEBAR_WIDTH };
