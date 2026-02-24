import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
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
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <View style={{ marginBottom: 32 }}>
      {/* Section Title */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 }}>
        {title}
      </Text>
      {description && (
        <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 12 }}>
          {description}
        </Text>
      )}

      {/* Tab Switcher + Content */}
      <View style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
        {/* Tab Bar */}
        {code ? (
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}>
            <Pressable
              onPress={() => setActiveTab('preview')}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === 'preview' ? '#4F46E5' : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === 'preview' ? '600' : '400',
                  color: activeTab === 'preview' ? '#4F46E5' : '#6B7280',
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
                borderBottomColor: activeTab === 'code' ? '#4F46E5' : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === 'code' ? '600' : '400',
                  color: activeTab === 'code' ? '#4F46E5' : '#6B7280',
                }}
              >
                Code
              </Text>
            </Pressable>
          </View>
        ) : null}

        {/* Content */}
        {activeTab === 'preview' ? (
          <View style={{ padding: 20, backgroundColor: '#fff' }}>
            {children}
          </View>
        ) : code ? (
          <View style={{ backgroundColor: '#111827' }}>
            <CodeBlock code={code} />
          </View>
        ) : null}
      </View>
    </View>
  );
}
