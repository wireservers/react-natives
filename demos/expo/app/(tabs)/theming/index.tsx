import React from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { BRAND_COLOR, BRAND_COLOR_DARK, BRAND_GRADIENT } from '@wireservers-ui/react-natives';
import { Footer } from '@/components/footer';

const SECTIONS = [
  {
    tag: 'Getting Started',
    tagColor: '#6366F1',
    title: 'One Config File, Every Component',
    body: `React-Natives uses CSS custom properties for every color token. Change your brand color in a single config file and it propagates automatically across all 70+ components — in both light and dark mode, with no component-level overrides needed.`,
    code: `// gluestack-ui-provider/config.ts
export const config = {
  tokens: {
    colors: {
      // Change these two lines to re-theme your entire app
      primary500: '#6366F1',
      primary600: '#4F46E5',

      // Semantic surface tokens — light mode
      background0:   '#FFFFFF',
      background50:  '#F9FAFB',
      background100: '#F3F4F6',

      // Typography
      typography900: '#111827',
      typography700: '#374151',
      typography500: '#6B7280',
    },
  },
};`,
  },
  {
    tag: 'Dark Mode',
    tagColor: '#8B5CF6',
    title: 'Automatic Dark Mode — Zero Configuration',
    body: `Every component reads from semantic CSS variables that automatically swap values based on the system color scheme. No conditional styles, no theme provider state — just set \`colorScheme\` tokens in your config and everything adapts.`,
    code: `// Tokens automatically swap — no conditional logic needed
export const darkTokens = {
  background0:   '#0F172A',   // ↔ '#FFFFFF' in light
  background50:  '#1E293B',   // ↔ '#F9FAFB' in light
  background100: '#334155',   // ↔ '#F3F4F6' in light

  typography900: '#F8FAFC',   // ↔ '#111827' in light
  typography700: '#CBD5E1',   // ↔ '#374151' in light
  typography500: '#94A3B8',   // ↔ '#6B7280' in light
};

// Components just use tokens — works in both modes automatically
<Button action="primary">   // uses primary500 in both modes
  <ButtonText>Save</ButtonText>
</Button>`,
  },
  {
    tag: 'NativeWind Overrides',
    tagColor: '#0284C7',
    title: 'Per-Component Overrides with Tailwind Classes',
    body: `Need a one-off style? Pass a \`className\` prop directly on any component to override with NativeWind utility classes. No wrapper views, no style merging — just Tailwind classes applied directly to the component root.`,
    code: `import { Button, ButtonText, Card } from '@wireservers-ui/react-natives';

// Override background, padding, and border radius in one line
<Button
  className="bg-rose-500 active:bg-rose-600 rounded-full px-8"
>
  <ButtonText>Delete Account</ButtonText>
</Button>

// Stack utility classes with the existing component style
<Card className="shadow-lg border-2 border-indigo-200">
  <CardBody className="gap-4 p-6">
    <Text className="text-indigo-900 font-bold text-lg">
      Premium Plan
    </Text>
  </CardBody>
</Card>`,
  },
  {
    tag: 'Semantic Tokens',
    tagColor: '#059669',
    title: 'Semantic Color Tokens — Not Hex Values',
    body: `Components never hard-code hex values. Every color reference uses a semantic token like \`primary-500\`, \`background-0\`, or \`typography-900\`. This means any token change in config instantly updates every component that uses it, and your design system stays consistent at scale.`,
    code: `// ✗ Don't hard-code hex values in component styles
const badStyle = { backgroundColor: '#6366F1' };

// ✓ Use semantic tokens — they adapt to your config and theme
<Button action="primary" />     // → primary500 from config
<Badge action="info" />         // → primary500 from config
<Switch defaultValue={true} />  // → primary500 from config
<Progress value={75} />         // → primary500 from config
<Slider defaultValue={[50]} />  // → primary500 from config

// Change once in config — all of the above update automatically
primary500: '#10B981',  // ← swap to green, everything follows`,
  },
];

export default function ThemingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const isWide = width >= 1024;
  const isXWide = width >= 1920;
  const px = isMobile ? 20 : isWide ? 48 : 32;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }}>
      {Platform.OS === 'web' && (
        <Head>
          <title>Theming | React-Natives - Customizable Design System</title>
          <meta name="description" content="Customize your React Native app with a powerful theming system. CSS variables, light and dark mode, and brand-level control across 70+ components." />
        </Head>
      )}

      {/* Hero */}
      <LinearGradient
        colors={['#EC4899', '#8B5CF6']}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.8 }}
      >
        <View style={{ maxWidth: 1680, alignSelf: 'center', width: '100%', paddingHorizontal: px, paddingTop: isXWide ? 120 : isWide ? 80 : 48, paddingBottom: isXWide ? 108 : isWide ? 72 : 44 }}>
          <Pressable
            onPress={() => router.navigate('/' as any)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 32, alignSelf: 'flex-start' }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>←</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500' }}>Back to Home</Text>
          </Pressable>

          <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 28 }}>🎨</Text>
          </View>

          <Text style={{ fontSize: isXWide ? 72 : isWide ? 56 : 32, fontWeight: '800', color: '#fff', lineHeight: isXWide ? 80 : isWide ? 64 : 40, marginBottom: 16 }}>
            Theming
          </Text>
          <Text style={{ fontSize: isWide ? 20 : 16, color: 'rgba(255,255,255,0.8)', lineHeight: isWide ? 30 : 24, maxWidth: 600 }}>
            Your brand. Your colors. Change one file and every component updates automatically — in light and dark mode.
          </Text>
        </View>
      </LinearGradient>

      {/* Stat bar */}
      <View style={{ backgroundColor: '#1F2937' }}>
        <View style={{ maxWidth: 1680, alignSelf: 'center', width: '100%', paddingHorizontal: px, paddingVertical: 24, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Text style={{ fontSize: isWide ? 40 : 32, fontWeight: '800', color: '#fff' }}>1 file</Text>
          <Text style={{ fontSize: isWide ? 16 : 14, color: 'rgba(255,255,255,0.6)', flex: 1 }}>
            Change to re-theme all 70+ components instantly
          </Text>
          <Pressable
            onPress={() => router.navigate('/components' as any)}
            style={{ backgroundColor: BRAND_COLOR, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Browse Components →</Text>
          </Pressable>
        </View>
      </View>

      {/* Content sections */}
      <View style={{ maxWidth: 1504, alignSelf: 'center', width: '100%', paddingHorizontal: px }}>
        {SECTIONS.map((section, i) => (
          <View
            key={i}
            style={{ paddingTop: i === 0 ? 56 : 40, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <View style={{ width: 4, height: 24, backgroundColor: section.tagColor, borderRadius: 2 }} />
              <Text style={{ fontSize: 11, fontWeight: '700', color: section.tagColor, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                {section.tag}
              </Text>
            </View>
            <Text style={{ fontSize: isWide ? 28 : 22, fontWeight: '800', color: '#111827', marginBottom: 16, lineHeight: isWide ? 36 : 30 }}>
              {section.title}
            </Text>
            <Text style={{ fontSize: isWide ? 17 : 15, color: '#4B5563', lineHeight: isWide ? 28 : 24, marginBottom: 24 }}>
              {section.body}
            </Text>

            {/* Code block */}
            <View style={{ backgroundColor: '#1F2937', borderRadius: 12, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 6, borderBottomWidth: 1, borderBottomColor: '#374151' }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444' }} />
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#F59E0B' }} />
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' }} />
                <Text style={{ color: '#9CA3AF', fontSize: 12, marginLeft: 8 }}>config.ts</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={{ fontFamily: 'monospace', fontSize: isWide ? 14 : 12, color: '#D1D5DB', padding: 20, lineHeight: isWide ? 24 : 20 }}>
                  {section.code}
                </Text>
              </ScrollView>
            </View>
          </View>
        ))}

        {/* CTA */}
        <View style={{ paddingTop: 56, paddingBottom: 56 }}>
          <LinearGradient
            colors={['#EC4899', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 16, padding: 40, width: '100%', alignItems: 'center' }}
          >
            <Text style={{ fontSize: isWide ? 28 : 22, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 10 }}>
              Ready to make it yours?
            </Text>
            <Text style={{ fontSize: isWide ? 16 : 14, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: 24, maxWidth: 400 }}>
              Start with a component, change the config, and see your brand come to life.
            </Text>
            <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Pressable
                onPress={() => router.navigate('/components' as any)}
                style={{ backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
              >
                <Text style={{ color: BRAND_COLOR_DARK, fontWeight: '700', fontSize: 15 }}>Browse Components →</Text>
              </Pressable>
              <Pressable
                onPress={() => router.navigate('/' as any)}
                style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>Back to Home</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}
