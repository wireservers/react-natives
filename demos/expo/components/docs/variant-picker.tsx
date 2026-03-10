import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCustomTheme, usePageColors } from '@/context/custom-theme-context';

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
  const { theme } = useCustomTheme();
  const c = usePageColors();
  return (
    <View style={{ gap: 6, marginBottom: 12 }}>
      <Text style={{ fontSize: 13, fontWeight: '700', color: c.text, textTransform: 'capitalize' }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {options.map((option) => {
          const isSelected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={{
                backgroundColor: isSelected ? theme.primary : c.cardBg,
                borderColor: isSelected ? 'transparent' : c.border,
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: isSelected ? '#fff' : c.text,
                  fontWeight: isSelected ? '600' : '400',
                  fontSize: 13,
                }}
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
  const { theme } = useCustomTheme();
  const c = usePageColors();
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}
    >
      <View
        style={{
          backgroundColor: value ? theme.primary : c.cardBg,
          borderColor: value ? theme.primary : c.border,
          borderWidth: 1,
          width: 20,
          height: 20,
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {value && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
      </View>
      <Text style={{ fontSize: 14, color: c.textSecondary }}>{label}</Text>
    </Pressable>
  );
}
