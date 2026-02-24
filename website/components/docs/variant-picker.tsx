import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface VariantPickerProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function VariantPicker({
  label,
  options,
  value,
  onChange,
}: VariantPickerProps) {
  return (
    <View className="gap-1.5 mb-3">
      <Text className="text-xs font-semibold text-typography-400 uppercase tracking-wider">
        {label}
      </Text>
      <View className="flex-row flex-wrap gap-1.5">
        {options.map((option) => {
          const isSelected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={isSelected ? { backgroundColor: '#4F46E5' } : undefined}
              className={`px-3 py-1.5 rounded-lg border ${
                isSelected
                  ? 'border-transparent'
                  : 'bg-transparent border-outline-200'
              }`}
            >
              <Text
                style={isSelected ? { color: '#fff', fontWeight: '600' } : undefined}
                className={`text-sm ${
                  isSelected ? '' : 'text-typography-700'
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

interface BooleanPickerProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function BooleanPicker({
  label,
  value,
  onChange,
}: BooleanPickerProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      className="flex-row items-center gap-2 mb-3"
    >
      <View
        style={value ? { backgroundColor: '#4F46E5', borderColor: '#4F46E5' } : undefined}
        className={`w-5 h-5 rounded border items-center justify-center ${
          value ? '' : 'bg-transparent border-outline-300'
        }`}
      >
        {value && <Text className="text-white text-xs">✓</Text>}
      </View>
      <Text className="text-sm text-typography-700">{label}</Text>
    </Pressable>
  );
}
