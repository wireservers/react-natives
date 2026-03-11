import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCustomTheme, usePageColors } from '@/context/custom-theme-context';
import { CodeBlock } from './code-block';

interface ExampleSectionProps {
  title: string;
  description?: string;
  code?: string;
  children: React.ReactNode;
}

export function ExampleSection({
  title,
  description,
  code,
  children,
}: ExampleSectionProps) {
  const { theme } = useCustomTheme();
  const c = usePageColors();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <View style={{ marginBottom: 32 }}>
      {/* Section Title */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: c.heading, marginBottom: 4 }}>
        {title}
      </Text>
      {description && (
        <Text style={{ fontSize: 14, color: c.text, lineHeight: 20, marginBottom: 12 }}>
          {description}
        </Text>
      )}

      {/* Tab Switcher + Content */}
      <View style={{ borderWidth: 1, borderColor: c.border, borderRadius: 12 }}>
        {/* Tab Bar */}
        {code ? (
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.docBg, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <Pressable
              onPress={() => setActiveTab('preview')}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === 'preview' ? theme.primary : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === 'preview' ? '600' : '400',
                  color: activeTab === 'preview' ? theme.primary : c.text,
                }}
              >
                Preview
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActiveTab('code')}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === 'code' ? theme.primary : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === 'code' ? '600' : '400',
                  color: activeTab === 'code' ? theme.primary : c.text,
                }}
              >
                Code
              </Text>
            </Pressable>
          </View>
        ) : null}

        {/* Content */}
        {activeTab === 'preview' ? (
          <View style={{ padding: 24, backgroundColor: c.cardBg, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, ...(!code ? { borderTopLeftRadius: 12, borderTopRightRadius: 12 } : {}) }}>
            {children}
          </View>
        ) : code ? (
          <View style={{ backgroundColor: '#111827', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, overflow: 'hidden' }}>
            <CodeBlock code={code} />
          </View>
        ) : null}
      </View>
    </View>
  );
}
