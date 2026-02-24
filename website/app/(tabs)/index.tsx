import React from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CodeBlock } from '@/components/docs/code-block';

const MAX_WIDTH = 1100;

function Container({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <View style={[{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center' }, style]}>
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <ScrollView
      className="flex-1 bg-background-0"
      contentContainerStyle={{ paddingBottom: 0 }}
    >
      {/* Hero Section — Purple-to-Pink gradient */}
      <LinearGradient
        colors={['#4338CA', '#7C3AED', '#C026D3']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 0.7 }}
      >
        <Container style={{ paddingTop: 56, paddingBottom: 52, paddingHorizontal: 24 }}>
          {/* Badge */}
          <View
            style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginBottom: 24 }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '500' }}>
              React Native UI Library
            </Text>
          </View>

          {/* Main heading */}
          <Text
            style={{ fontSize: 36, fontWeight: '800', color: '#fff', lineHeight: 42, marginBottom: 16, maxWidth: 600 }}
          >
            Build Beautiful Mobile Apps Faster
          </Text>

          {/* Subtitle */}
          <Text
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 24, marginBottom: 28, maxWidth: 420 }}
          >
            A comprehensive collection of production-ready React Native components. Customizable, accessible, and performant.
          </Text>

          {/* CTA Buttons */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable
              onPress={() => router.push('/docs' as any)}
              style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Text style={{ color: '#4F46E5', fontWeight: '600', fontSize: 14 }}>
                Browse Components
              </Text>
              <Text style={{ color: '#4F46E5', fontSize: 14 }}>→</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/docs' as any)}
              style={{ backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
                Learn More
              </Text>
            </Pressable>
          </View>
        </Container>
      </LinearGradient>

      {/* Why Choose Section */}
      <Container style={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 12, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 8 }}>
          Why Choose Wireservers UI?
        </Text>
        <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center' }}>
          Everything you need to build modern mobile applications
        </Text>
      </Container>

      {/* Feature Cards — 3 col grid */}
      <Container style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <FeatureCard
            icon="</>"
            iconBg="#EEF2FF"
            iconColor="#4F46E5"
            title="TypeScript First"
            description="Fully typed components with excellent IDE support and autocomplete for better developer experience."
          />
          <FeatureCard
            icon="🎨"
            iconBg="#F5F3FF"
            iconColor="#7C3AED"
            title="Customizable Theme"
            description="Easy to customize with a powerful theming system. Match your brand identity effortlessly."
          />
          <FeatureCard
            icon="⚡"
            iconBg="#ECFDF5"
            iconColor="#059669"
            title="High Performance"
            description="Optimized for performance with lazy loading, virtualization, and minimal re-renders."
          />
          <FeatureCard
            icon="🛡"
            iconBg="#FFF7ED"
            iconColor="#EA580C"
            title="Accessible"
            description="Built with accessibility in mind. WCAG compliant components that work for everyone."
          />
          <FeatureCard
            icon="🧩"
            iconBg="#FDF2F8"
            iconColor="#DB2777"
            title="25+ Components"
            description="Comprehensive library covering all your UI needs from buttons to complex data tables."
          />
          <FeatureCard
            icon="📱"
            iconBg="#F0F9FF"
            iconColor="#0284C7"
            title="Cross Platform"
            description="Works seamlessly on iOS and Android with consistent look and feel across platforms."
          />
        </View>
      </Container>

      {/* Thin separator line */}
      <Container>
        <View style={{ height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 20 }} />
      </Container>

      {/* Featured Components */}
      <Container style={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 12, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 8 }}>
          Featured Components
        </Text>
        <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center' }}>
          Start with these essential components
        </Text>
      </Container>

      <Container style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <FeaturedComponentCard
            slug="button"
            title="Button"
            description="A customizable button component with multiple variants and states"
          />
          <FeaturedComponentCard
            slug="text"
            title="Text"
            description="Typography component for displaying text with various styles"
          />
          <FeaturedComponentCard
            slug="card"
            title="Card"
            description="Flexible container component for grouping related content"
          />
          <FeaturedComponentCard
            slug="image"
            title="Image"
            description="Display images from local or remote sources with loading states"
          />
          <FeaturedComponentCard
            slug="input"
            title="TextInput"
            description="Text input field with validation and various keyboard types"
          />
          <FeaturedComponentCard
            slug="checkbox"
            title="Checkbox"
            description="Checkbox component for binary selections"
          />
        </View>
      </Container>

      {/* View All Button */}
      <View style={{ alignItems: 'center', paddingBottom: 40 }}>
        <Pressable
          onPress={() => router.push('/docs' as any)}
          style={{ backgroundColor: '#4F46E5', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>
            View All 30 Components
          </Text>
          <Text style={{ color: '#fff', fontSize: 15 }}>→</Text>
        </Pressable>
      </View>

      {/* Code Showcase — Dark section */}
      <View style={{ backgroundColor: '#111827' }}>
        <Container
          style={{
            paddingVertical: 56,
            paddingHorizontal: 24,
            flexDirection: isWide ? 'row' : 'column',
            gap: isWide ? 48 : 32,
          }}
        >
          {/* Left — text + checklist */}
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 30, fontWeight: '800', color: '#fff', lineHeight: 36, marginBottom: 14 }}
            >
              Simple. Powerful.{'\n'}Elegant.
            </Text>
            <Text
              style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 22, marginBottom: 28, maxWidth: 380 }}
            >
              Clean API design that feels natural to use. Get started in minutes with our intuitive component library.
            </Text>

            <View style={{ gap: 16 }}>
              <ChecklistItem
                title="Easy Installation"
                subtitle="npm install @wireservers-ui/react-native-ui"
              />
              <ChecklistItem
                title="Zero Configuration"
                subtitle="Works out of the box"
              />
              <ChecklistItem
                title="Great Documentation"
                subtitle="Comprehensive guides and examples"
              />
            </View>
          </View>

          {/* Right — Code Preview Card */}
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#1F2937', borderRadius: 12, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#374151' }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444' }} />
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#F59E0B' }} />
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981' }} />
                <Text style={{ color: '#9CA3AF', fontSize: 13, marginLeft: 8 }}>App.tsx</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text
                  style={{ fontFamily: 'monospace', fontSize: 13, color: '#D1D5DB', padding: 16, lineHeight: 22 }}
                >{`import { Button, Card } from '@wireservers-ui/react-native-ui';

export default function App() {
  return (
    <Card>
      <CardHeader>
        <Text variant="h2">Welcome</Text>
      </CardHeader>
      <CardBody>
        <Text>Start building amazing apps!</Text>
      </CardBody>
      <CardFooter>
        <Button
          action="primary"
          onPress={() => navigate('/home')}
        >
          <ButtonText>Get Started</ButtonText>
        </Button>
      </CardFooter>
    </Card>
  );
}`}</Text>
              </ScrollView>
            </View>
          </View>
        </Container>
      </View>

      {/* CTA Footer — Gradient */}
      <LinearGradient
        colors={['#4338CA', '#7C3AED', '#C026D3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Container style={{ paddingVertical: 56, paddingHorizontal: 24, alignItems: 'center' }}>
          <Text
            style={{ fontSize: 28, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 10 }}
          >
            Ready to Get Started?
          </Text>
          <Text
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: 28, maxWidth: 400 }}
          >
            Join thousands of developers building amazing mobile apps with Wireservers UI
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable
              onPress={() => router.push('/docs' as any)}
              style={{ backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Text style={{ color: '#4F46E5', fontWeight: '600', fontSize: 14 }}>
                Explore Components
              </Text>
              <Text style={{ color: '#4F46E5', fontSize: 14 }}>→</Text>
            </Pressable>
            <Pressable
              style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
                View on GitHub
              </Text>
            </Pressable>
          </View>
        </Container>
      </LinearGradient>

      {/* Footer */}
      <View style={{ backgroundColor: '#1F2937' }}>
        <Container style={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 20 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
            <View style={{ flex: 1, minWidth: 160 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 10 }}>
                Wireservers UI
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 20 }}>
                A comprehensive React Native component library for building beautiful mobile apps.
              </Text>
            </View>
            <View style={{ flex: 1, minWidth: 120 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 12 }}>
                Documentation
              </Text>
              <FooterLink label="Getting Started" />
              <FooterLink label="Components" />
              <FooterLink label="Theming" />
              <FooterLink label="Examples" />
            </View>
            <View style={{ flex: 1, minWidth: 120 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 12 }}>
                Community
              </Text>
              <FooterLink label="GitHub" />
              <FooterLink label="Discord" />
              <FooterLink label="Twitter" />
              <FooterLink label="Blog" />
            </View>
            <View style={{ flex: 1, minWidth: 120 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 12 }}>
                Support
              </Text>
              <FooterLink label="FAQ" />
              <FooterLink label="Contact" />
              <FooterLink label="Contributing" />
              <FooterLink label="License" />
            </View>
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 20, alignItems: 'center' }}>
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
              © 2026 Wireservers UI. All rights reserved.
            </Text>
          </View>
        </Container>
      </View>
    </ScrollView>
  );
}

function FeatureCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <View
      style={{ flex: 1, minWidth: '30%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, padding: 20, backgroundColor: '#fff' }}
    >
      <View
        style={{ backgroundColor: iconBg, width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}
      >
        <Text style={{ fontSize: 16, color: iconColor }}>{icon}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 }}>{title}</Text>
      <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>{description}</Text>
    </View>
  );
}

function FeaturedComponentCard({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/docs/${slug}` as any)}
      style={{ flex: 1, minWidth: '30%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, padding: 20, backgroundColor: '#fff' }}
    >
      <View
        style={{ backgroundColor: '#F3F4F6', width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}
      >
        <Text style={{ fontSize: 18 }}>📦</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 }}>{title}</Text>
      <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 12 }}>{description}</Text>
      <Text style={{ color: '#4F46E5', fontSize: 14, fontWeight: '600' }}>
        View Component →
      </Text>
    </Pressable>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginBottom: 8 }}>
      {label}
    </Text>
  );
}

function ChecklistItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
      <View
        style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}
      >
        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>✓</Text>
      </View>
      <View>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>{title}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginTop: 2 }}>{subtitle}</Text>
      </View>
    </View>
  );
}
