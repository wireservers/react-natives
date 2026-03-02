import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Footer } from '@/components/footer';
import { CodeBlock } from './code-block';
import { PropsTable } from './props-table';
import type { PropDefinition } from './props-table';
import { ExampleCodeContext } from './example-code-context';
import { BRAND_COLOR, BRAND_COLOR_LIGHT, BRAND_COLOR_DARK } from '@wireservers-ui/react-natives';
import { DOC_BG } from '@/constants/theme';
import { config } from '../ui/theme-provider/config';

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
  exampleCode?: string;
  props: PropDefinition[];
  subComponents?: SubComponentDoc[];
  bestPractices?: string[];
  accessibility?: string;
  relatedComponents?: RelatedComponentInfo[];
  children: React.ReactNode;
}

const BREAKPOINT_SM = 640;
const BREAKPOINT_MD = 768;

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Core Primitives': { bg: BRAND_COLOR_LIGHT, text: BRAND_COLOR },
  Layout: { bg: BRAND_COLOR_LIGHT, text: BRAND_COLOR_DARK },
  'Form Controls': { bg: '#ECFDF5', text: '#059669' },
  'Feedback & Overlay': { bg: '#FFF7ED', text: '#EA580C' },
  Navigation: { bg: '#F0F9FF', text: '#0284C7' },
  'Data Display': { bg: '#FEF9C3', text: '#CA8A04' },
  Disclosure: { bg: '#FCE7F3', text: '#DB2777' },
  Utility: { bg: '#F1F5F9', text: '#475569' },
};

export function DocPage({
  name,
  description,
  whenToUse,
  category,
  importCode,
  exampleCode,
  props,
  subComponents,
  bestPractices,
  accessibility,
  relatedComponents,
  children,
}: DocPageProps) {
  const colors = categoryColors[category] ?? { bg: '#F5F5F5', text: '#666' };
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [dynamicCode, setDynamicCode] = useState<string | null>(null);
  const codeToShow = dynamicCode || exampleCode || importCode;
  const { width: screenWidth } = useWindowDimensions();
  const isSmall = screenWidth < BREAKPOINT_SM;
  const isMedium = screenWidth < BREAKPOINT_MD;
  const horizontalPadding = isSmall ? 12 : isMedium ? 16 : 24;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DOC_BG }}>
      <View style={{ width: '100%', maxWidth: 1504, alignSelf: 'center', paddingHorizontal: horizontalPadding, paddingTop: isSmall ? 16 : 24, paddingBottom: 60 }}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <View style={{ backgroundColor: colors.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>{category}</Text>
            </View>
          </View>
          <Text style={{ fontSize: isSmall ? 22 : 28, fontWeight: '800', color: '#111827', marginBottom: 6 }}>{name}</Text>
          <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>{description}</Text>
        </View>

        {/* Example */}
        <SectionHeader title="Example" />
        <View style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
          {/* Tab Bar */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}>
            <Pressable
              onPress={() => setActiveTab('preview')}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === 'preview' ? BRAND_COLOR : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === 'preview' ? '600' : '400',
                  color: activeTab === 'preview' ? BRAND_COLOR : '#6B7280',
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
                borderBottomColor: activeTab === 'code' ? BRAND_COLOR : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === 'code' ? '600' : '400',
                  color: activeTab === 'code' ? BRAND_COLOR : '#6B7280',
                }}
              >
                Code
              </Text>
            </Pressable>
          </View>

          {/* Content */}
          {activeTab === 'preview' ? (
            <View style={{ padding: isSmall ? 12 : isMedium ? 16 : 24, backgroundColor: '#fff', ...config.light }}>
              <ExampleCodeContext.Provider value={{ setCode: setDynamicCode }}>
                {children}
              </ExampleCodeContext.Provider>
            </View>
          ) : (
            <CodeBlock code={codeToShow} showLineNumbers showHeader={false} />
          )}
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
            <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: isSmall ? 16 : 24, marginBottom: 32 }}>
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
                      <Text style={{ fontSize: 14, color: BRAND_COLOR, marginRight: 10, marginTop: 1 }}>•</Text>
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
            <View style={{ flexDirection: isMedium ? 'column' : 'row', gap: 12 }}>
              {relatedComponents.map((comp) => (
                <Pressable
                  key={comp.slug}
                  onPress={() => router.push(`/components/docs/${comp.slug}` as any)}
                  style={{
                    flex: isMedium ? undefined : 1,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '600', color: BRAND_COLOR, marginBottom: 4 }}>
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
      <Footer />
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
