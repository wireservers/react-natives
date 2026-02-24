import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { CodeBlock } from './code-block';
import { PropsTable } from './props-table';
import type { PropDefinition } from './props-table';

interface SubComponentDoc {
  name: string;
  props: PropDefinition[];
}

interface RelatedComponentInfo {
  slug: string;
  name: string;
  description: string;
}

interface DocPageProps {
  name: string;
  description: string;
  whenToUse?: string;
  category: string;
  importCode: string;
  props: PropDefinition[];
  subComponents?: SubComponentDoc[];
  bestPractices?: string[];
  accessibility?: string;
  relatedComponents?: RelatedComponentInfo[];
  children: React.ReactNode;
}

const MAX_WIDTH = 1100;

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Core Primitives': { bg: '#EEF2FF', text: '#4F46E5' },
  'Form Controls': { bg: '#ECFDF5', text: '#059669' },
  'Feedback & Overlay': { bg: '#FFF7ED', text: '#EA580C' },
  Navigation: { bg: '#F0F9FF', text: '#0284C7' },
};

export function DocPage({
  name,
  description,
  whenToUse,
  category,
  importCode,
  props,
  subComponents,
  bestPractices,
  accessibility,
  relatedComponents,
  children,
}: DocPageProps) {
  const colors = categoryColors[category] ?? { bg: '#F5F5F5', text: '#666' };
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 60 }}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <View style={{ backgroundColor: colors.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>{category}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 6 }}>{name}</Text>
          <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>{description}</Text>
        </View>

        {/* Import */}
        <SectionHeader title="Import" />
        <View style={{ marginBottom: 32 }}>
          <CodeBlock code={importCode} />
        </View>

        {/* Examples */}
        <SectionHeader title="Example" />
        <View style={{ marginBottom: 32 }}>
          {children}
        </View>

        {/* Props */}
        <SectionHeader title="Props" />
        <View style={{ marginBottom: 32 }}>
          <PropsTable title={`${name} Props`} props={props} />
          {subComponents?.map((sub) => (
            <PropsTable key={sub.name} title={`${sub.name} Props`} props={sub.props} />
          ))}
        </View>

        {/* Usage Guidelines */}
        {(whenToUse || bestPractices || accessibility) && (
          <>
            <SectionHeader title="Usage Guidelines" />
            <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 24, marginBottom: 32 }}>
              {/* When to use */}
              {whenToUse && (
                <View style={{ marginBottom: bestPractices || accessibility ? 24 : 0 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
                    When to use
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 22 }}>
                    {whenToUse}
                  </Text>
                </View>
              )}

              {/* Best practices */}
              {bestPractices && bestPractices.length > 0 && (
                <View style={{ marginBottom: accessibility ? 24 : 0 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
                    Best practices
                  </Text>
                  {bestPractices.map((practice, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
                      <Text style={{ fontSize: 14, color: '#4F46E5', marginRight: 10, marginTop: 1 }}>•</Text>
                      <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 22, flex: 1 }}>
                        {practice}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Accessibility */}
              {accessibility && (
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
                    Accessibility
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 22 }}>
                    {accessibility}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* Related Components */}
        {relatedComponents && relatedComponents.length > 0 && (
          <>
            <SectionHeader title="Related Components" />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {relatedComponents.map((comp) => (
                <Pressable
                  key={comp.slug}
                  onPress={() => router.push(`/docs/${comp.slug}` as any)}
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#4F46E5', marginBottom: 4 }}>
                    {comp.name}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 18 }} numberOfLines={2}>
                    {comp.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>
      {title}
    </Text>
  );
}
