import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

interface ComponentCardProps {
  slug: string;
  name: string;
  description: string;
  category: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Core Primitives': { bg: '#EEF2FF', text: '#4F46E5' },
  'Form Controls': { bg: '#ECFDF5', text: '#059669' },
  'Feedback & Overlay': { bg: '#FFF7ED', text: '#EA580C' },
  Navigation: { bg: '#F0F9FF', text: '#0284C7' },
};

export function ComponentCard({
  slug,
  name,
  description,
  category,
}: ComponentCardProps) {
  const router = useRouter();
  const colors = categoryColors[category] ?? { bg: '#F5F5F5', text: '#666' };

  return (
    <Pressable
      onPress={() => router.push(`/docs/${slug}` as any)}
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
