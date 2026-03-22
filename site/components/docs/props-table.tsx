import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useCustomTheme, usePageColors } from '@/context/custom-theme-context';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  title?: string;
  props: PropDefinition[];
}

export function PropsTable({ title, props }: PropsTableProps) {
  const { theme } = useCustomTheme();
  const c = usePageColors();
  if (props.length === 0) return null;

  return (
    <View style={{ marginBottom: 24 }}>
      {title && (
        <Text style={{ fontSize: 15, fontWeight: '600', color: c.heading, marginBottom: 12 }}>
          {title}
        </Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ minWidth: '100%' }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: c.iconSubtle,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              borderWidth: 1,
              borderColor: c.border,
              paddingVertical: 10,
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ width: 140, fontSize: 11, fontWeight: '600', color: c.iconText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Prop
            </Text>
            <Text style={{ width: 180, fontSize: 11, fontWeight: '600', color: c.iconText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Type
            </Text>
            <Text style={{ width: 100, fontSize: 11, fontWeight: '600', color: c.iconText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Default
            </Text>
            <Text style={{ flex: 1, minWidth: 200, fontSize: 11, fontWeight: '600', color: c.iconText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Description
            </Text>
          </View>

          {/* Rows */}
          {props.map((prop, index) => (
            <View
              key={prop.name}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: c.border,
                backgroundColor: index % 2 === 0 ? c.cardBg : c.iconSubtle,
                ...(index === props.length - 1
                  ? { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }
                  : {}),
              }}
            >
              {/* Prop name */}
              <View style={{ width: 140 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: theme.primary, fontFamily: 'monospace' }}>
                  {prop.name}
                  {prop.required && (
                    <Text style={{ color: '#EF4444' }}> *</Text>
                  )}
                </Text>
              </View>

              {/* Type */}
              <View style={{ width: 180 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'monospace',
                    color: c.text,
                    backgroundColor: c.iconSubtle,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                    alignSelf: 'flex-start',
                    overflow: 'hidden',
                  }}
                  numberOfLines={2}
                >
                  {prop.type}
                </Text>
              </View>

              {/* Default */}
              <View style={{ width: 100 }}>
                <Text style={{ fontSize: 13, color: c.text, fontFamily: 'monospace' }}>
                  {prop.default ?? '—'}
                </Text>
              </View>

              {/* Description */}
              <View style={{ flex: 1, minWidth: 200 }}>
                <Text style={{ fontSize: 13, color: c.text, lineHeight: 18 }}>
                  {prop.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
