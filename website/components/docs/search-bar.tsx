import React from 'react';
import { View, TextInput, Text, Pressable, ScrollView } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function SearchBar({
  value,
  onChangeText,
  categories,
  selectedCategory,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <View className="gap-3">
      <View className="border border-outline-200 rounded-xl bg-background-50 flex-row items-center px-4">
        <Text className="text-typography-400 mr-2 text-base">🔍</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search components..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 py-3 text-base text-typography-900"
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChangeText('')}>
            <Text className="text-typography-400 text-lg">✕</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2"
      >
        {categories.map((cat) => {
          const isSelected = cat === selectedCategory;
          return (
            <Pressable
              key={cat}
              onPress={() => onCategoryChange(cat)}
              style={isSelected ? { backgroundColor: '#4F46E5' } : undefined}
              className={`px-4 py-2 rounded-full border ${
                isSelected
                  ? 'border-transparent'
                  : 'bg-transparent border-outline-200'
              }`}
            >
              <Text
                style={isSelected ? { color: '#fff', fontWeight: '600' } : undefined}
                className={`text-sm ${
                  isSelected ? '' : 'text-typography-600'
                }`}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
