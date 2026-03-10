import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { BRAND_COLOR_LIGHT } from '@wireservers-ui/react-natives';
import { useCustomTheme } from '@/context/custom-theme-context';

interface ComponentCardProps {
  slug: string;
  name: string;
  description: string;
  category: string;
}

export function ComponentCard({
  slug,
  name,
  description,
  category,
}: ComponentCardProps) {
  const router = useRouter();
  const { theme } = useCustomTheme();
  const categoryColors: Record<string, { bg: string; text: string }> = {
    'Core Primitives': { bg: BRAND_COLOR_LIGHT, text: theme.primary },
    'Form Controls': { bg: '#ECFDF5', text: '#059669' },
    'Feedback & Overlay': { bg: '#FFF7ED', text: '#EA580C' },
    Navigation: { bg: '#F0F9FF', text: '#0284C7' },
  };
  const colors = categoryColors[category] ?? { bg: '#F5F5F5', text: '#666' };

  return (
    <Pressable
      onPress={() => router.push(`/components/docs/${slug}` as any)}
      className="flex-1 min-w-[45%] border border-outline-100 rounded-2xl p-5 bg-background-0 active:bg-background-50"
    >
      <View
        style={{ backgroundColor: colors.bg, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 10 }}
      >
        <Text style={{ fontSize: 11, fontWeight: '600', color: colors.text }}>
          {category}
        </Text>
      </View>
      <Text className="text-base font-semibold text-typography-900">
        {name}
      </Text>
      <Text
        className="text-sm text-typography-500 mt-1 leading-5"
        numberOfLines={2}
      >
        {description}
      </Text>
    </Pressable>
  );
}
