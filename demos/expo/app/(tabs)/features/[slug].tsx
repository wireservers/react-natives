import React from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BRAND_COLOR, BRAND_COLOR_DARK, BRAND_COLOR_LIGHT, BRAND_GRADIENT } from '@wireservers-ui/react-natives';
import { Footer } from '@/components/footer';

interface FeatureContent {
  icon: string;
  iconBg: string;
  iconColor: string;
  gradientColors: [string, string];
  title: string;
  tagline: string;
  problemTitle: string;
  problem: string;
  solutionTitle: string;
  solution: string;
  highlights: { icon: string; title: string; desc: string; link?: string }[];
  code: string;
  stat: string;
  statLabel: string;
}

const FEATURES: Record<string, FeatureContent> = {
  'typescript-first': {
    icon: '</>',
    iconBg: BRAND_COLOR_LIGHT,
    iconColor: BRAND_COLOR,
    gradientColors: ['#6366F1', '#8B5CF6'],
    title: 'TypeScript First',
    tagline: 'Build with confidence.\nShip without surprises.',
    problemTitle: 'The Problem with Untyped Code',
    problem: `As your React Native codebase grows, JavaScript's dynamic typing becomes a liability. Wrong prop types slip through code review, misspelled prop names cause silent bugs at runtime, and refactoring becomes a risky guessing game. You spend hours debugging issues that should have been caught at compile time.`,
    solutionTitle: 'Built for TypeScript from Day One',
    solution: `Every component in Wireservers UI is authored in TypeScript with strict mode enabled. We export all prop types, variant unions, and context values — so your IDE and compiler work as a first-class safety net, not an obstacle.`,
    highlights: [
      { icon: '⌨️', title: 'Full IntelliSense', desc: 'Autocomplete for every prop, variant, and size across all 70+ components. No more guessing.', link: 'button' },
      { icon: '🔒', title: 'Strict Type Contracts', desc: 'No any escapes. Props, events, refs, and forwarded types are all strictly defined.', link: 'input' },
      { icon: '📦', title: 'Exported Type Interfaces', desc: 'Re-export all prop interfaces and variant unions for use in your own components and wrappers.', link: 'form-control' },
      { icon: '🔄', title: 'Refactor with Confidence', desc: "Rename a component or change a variant — TypeScript's compiler catches every callsite automatically.", link: 'select' },
    ],
    code: `import { Button, type ButtonVariant, type ButtonAction } from '@wireservers-ui/react-natives';

// Variant unions prevent silent typos
const variant: ButtonVariant = 'solid';     // ✓
const bad: ButtonVariant = 'ghost_typo';    // ✗ Type Error

// Prop contracts caught at compile time
function MyButton({ action }: { action: ButtonAction }) {
  return (
    <Button variant="solid" action={action}>
      <ButtonText>Submit</ButtonText>
    </Button>
  );
}`,
    stat: '100%',
    statLabel: 'TypeScript coverage across all components',
  },

  'customizable-theme': {
    icon: '🎨',
    iconBg: '#FDF2F8',
    iconColor: '#DB2777',
    gradientColors: ['#EC4899', '#8B5CF6'],
    title: 'Customizable Theme',
    tagline: 'Your brand. Your colors.\nZero compromise.',
    problemTitle: 'The Trap of Rigid UI Libraries',
    problem: `Most component libraries ship with opinionated styles that fight your design system. You end up overriding styles in dozens of places, battling specificity wars, and shipping unnecessary CSS just to make a button match your brand color. Dark mode is often bolted on as an afterthought.`,
    solutionTitle: 'A Theming System Built to Flex',
    solution: `Wireservers UI uses CSS custom properties for every color token and NativeWind utility classes for layout and spacing. Change your brand color in one config file and it propagates across every component automatically — in both light and dark modes.`,
    highlights: [
      { icon: '🌙', title: 'Dark Mode Built-in', desc: 'Every component adapts to the system color scheme automatically. Zero extra configuration.', link: 'switch' },
      { icon: '🎯', title: 'Single Source of Truth', desc: 'One config file. Change your brand color once — buttons, badges, switches, inputs all update.', link: 'badge' },
      { icon: '🧱', title: 'NativeWind Overrides', desc: 'Apply Tailwind utility classes directly on any component for one-off style overrides.', link: 'button' },
      { icon: '⚙️', title: 'Semantic Color Tokens', desc: 'Tokens like background-0, typography-900, and primary-500 adapt across themes by design.', link: 'color-picker' },
    ],
    code: `// gluestack-ui-provider/config.ts — one file rules them all
export const config = {
  tokens: {
    colors: {
      primary500: '#6366F1',  // ← change your brand color here
      primary600: '#4F46E5',
    },
  },
};

// Components pick it up automatically — no overrides needed
<Button action="primary" />   // uses primary500
<Badge action="info" />       // uses primary500
<Switch value={true} />       // uses primary500
<Progress value={60} />       // uses primary500`,
    stat: '1 file',
    statLabel: 'Change to re-theme all 70+ components',
  },

  'high-performance': {
    icon: '⚡',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    gradientColors: ['#059669', '#0284C7'],
    title: 'High Performance',
    tagline: '60fps interactions.\nEven on low-end devices.',
    problemTitle: 'Heavy Libraries That Slow You Down',
    problem: `Bloated component libraries bundle everything whether you use it or not. Deep render trees, inline style recalculations on every update, JS-thread animations, and heavy dependencies add kilobytes and milliseconds that your users can feel on every interaction.`,
    solutionTitle: 'Engineered to Stay Out of Your Way',
    solution: `Every component is optimized for React Native's render model. We use React.forwardRef throughout, memoize styles with tailwind-variants, run animations on the native thread via useNativeDriver, and provide full tree-shaking support so unused components cost you nothing.`,
    highlights: [
      { icon: '🧵', title: 'Native Thread Animations', desc: 'All transitions run on the UI thread via useNativeDriver — no JS bridge jank at 60fps.', link: 'carousel' },
      { icon: '🌲', title: 'Tree-Shakeable Imports', desc: "Import only what you use. Unused components don't add to your bundle size.", link: 'button' },
      { icon: '♻️', title: 'Memoized Style Objects', desc: 'Styles computed once by tailwind-variants and cached — no repeated layout recalculation.', link: 'slider' },
      { icon: '📉', title: 'Minimal Re-renders', desc: 'Context split by concern so state changes in one component never re-render unrelated siblings.', link: 'tabs' },
    ],
    code: `// Animations run on the native thread — guaranteed 60fps
Animated.spring(scale, {
  toValue: 1,
  useNativeDriver: true,  // ← off the JS bridge
}).start();

// Styles computed once, shared across all instances
const buttonStyle = tv({
  base: 'rounded-lg px-4 py-2 items-center justify-center',
  variants: {
    action: {
      primary: 'bg-primary-500 active:bg-primary-600',
      negative: 'bg-error-500 active:bg-error-600',
    },
  },
});`,
    stat: '60fps',
    statLabel: 'Smooth animations via native driver',
  },

  'accessible': {
    icon: '🛡️',
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    gradientColors: ['#EA580C', '#EAB308'],
    title: 'Accessible by Default',
    tagline: 'Apps that work for everyone,\nout of the box.',
    problemTitle: 'Accessibility as an Afterthought',
    problem: `Most apps pass visual QA but fail assistive technology entirely. Screen reader users encounter unlabeled buttons, missing focus management, and broken navigation patterns. Color contrast ratios violate WCAG. Retrofitting accessibility after launch is expensive, risky, and often incomplete.`,
    solutionTitle: 'WCAG Compliance Baked In',
    solution: `Every Wireservers UI component ships with correct accessibilityRole, sensible default accessibilityLabel fallbacks, proper focus management, and color contrast that meets WCAG 2.1 AA. You build inclusive apps without becoming an accessibility specialist.`,
    highlights: [
      { icon: '🔊', title: 'Screen Reader Ready', desc: 'Correct accessibilityRole and live region announcements on every interactive element.', link: 'button' },
      { icon: '🎯', title: 'Focus Management', desc: 'Modals, drawers, and dialogs trap focus on open and restore it correctly on close.', link: 'modal' },
      { icon: '🎨', title: 'Contrast Compliant', desc: 'All default color tokens meet WCAG 2.1 AA contrast ratios for text and UI elements.', link: 'alert' },
      { icon: '🤫', title: 'Reduced Motion Support', desc: 'Components respect the system reduced-motion preference — animations become instant transitions.', link: 'carousel' },
    ],
    code: `// Accessibility props set automatically — you don't have to think about it
<Button
  accessibilityRole="button"       // ← set by default
  accessibilityLabel="Submit form" // ← falls back to ButtonText content
  onPress={handleSubmit}
>
  <ButtonText>Submit</ButtonText>
</Button>

// Modal traps focus, announces to screen readers, restores focus on close
<AlertDialog isOpen={open} onClose={() => setOpen(false)}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <Heading>Confirm Action</Heading>   // ← announced as dialog title
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>`,
    stat: 'WCAG 2.1',
    statLabel: 'AA compliance across all components',
  },

  'seventy-plus-components': {
    icon: '🧩',
    iconBg: '#FDF2F8',
    iconColor: '#DB2777',
    gradientColors: ['#DB2777', '#6366F1'],
    title: '70+ Components',
    tagline: 'One library.\nEvery UI pattern you need.',
    problemTitle: 'Library Sprawl Slows Teams Down',
    problem: `Using five different packages for buttons, modals, date pickers, tables, and carousels means five incompatible APIs, five divergent update cycles, five sets of style conflicts, and five sources of production bugs. The integration glue code alone can take days to write and maintain.`,
    solutionTitle: 'A Complete UI System in One Package',
    solution: `From a simple Text label to a full Calendar with day/week/month views, Wireservers UI covers every common UI pattern in a single, consistent API. One install. One theming config. One mental model your whole team can learn once and apply everywhere.`,
    highlights: [
      { icon: '🏗️', title: 'Core Primitives', desc: 'Text, Heading, Button, Icon, Image, Divider, Badge, Spinner — the building blocks you use daily.', link: 'button' },
      { icon: '📝', title: 'Form Controls', desc: 'Input, Textarea, Select, Checkbox, Radio, Switch, Slider, ColorPicker, DatePicker, and more.', link: 'input' },
      { icon: '💬', title: 'Feedback & Overlay', desc: 'Modal, Drawer, AlertDialog, Toast, Snackbar, Tooltip, Popover, ActionSheet.', link: 'modal' },
      { icon: '📊', title: 'Data & Layout', desc: 'Table, List, Carousel, Calendar, Timeline, Stat, Progress, Skeleton, Stepper, Pagination.', link: 'table' },
    ],
    code: `// Everything from one package — one import path, one mental model
import {
  // Primitives
  Button, Text, Heading, Icon, Badge, Card,
  // Forms
  Input, Select, Switch, Checkbox, Slider, DatePicker,
  // Overlays
  Modal, Drawer, Toast, Tooltip, ActionSheet,
  // Data Display
  Table, List, Carousel, Calendar, Skeleton,
  // Navigation
  Tabs, Breadcrumb, Pagination, Stepper,
  // ...and 30+ more
} from '@wireservers-ui/react-natives';`,
    stat: '70+',
    statLabel: 'Production-ready components',
  },

  'cross-platform': {
    icon: '📱',
    iconBg: '#F0F9FF',
    iconColor: '#0284C7',
    gradientColors: ['#0284C7', '#059669'],
    title: 'Cross Platform',
    tagline: 'Write once.\nRun everywhere.',
    problemTitle: 'Platform Fragmentation Kills Velocity',
    problem: `Teams maintaining separate iOS and Android UIs spend half their time syncing behavior rather than shipping features. Adding web support creates a third surface to maintain. Component libraries that work on one platform but subtly break on another force constant workarounds that accumulate into technical debt.`,
    solutionTitle: 'Truly Universal Components',
    solution: `Wireservers UI components are tested across iOS, Android, and Web (via React Native Web + Expo). NativeWind handles platform style differences automatically. Platform-specific behaviors like haptic feedback and ripple effects are abstracted so your component code stays platform-agnostic and clean.`,
    highlights: [
      { icon: '🍎', title: 'iOS Native Feel', desc: 'SF Symbols support, haptic feedback integration, and proper safe area handling.', link: 'button' },
      { icon: '🤖', title: 'Android Material', desc: 'Ripple press effects, adaptive navigation patterns, and Material-compatible interactions.', link: 'pressable' },
      { icon: '🌐', title: 'Web / PWA', desc: 'Full React Native Web support via Expo for web and progressive web app deployments.', link: 'tabs' },
      { icon: '⚡', title: 'Expo & Bare CLI', desc: 'Works with Expo SDK managed workflow and bare React Native CLI projects out of the box.', link: 'card' },
    ],
    code: `// One component. Three platforms. Zero platform-specific code.
import { Button, ButtonText } from '@wireservers-ui/react-natives';

export function SaveButton({ onPress }: { onPress: () => void }) {
  return (
    <Button onPress={onPress} action="primary">
      <ButtonText>Save Changes</ButtonText>
    </Button>
    // iOS    → native haptic + highlight
    // Android → ripple effect + elevation
    // Web     → hover state + cursor:pointer
  );
}`,
    stat: '3 platforms',
    statLabel: 'iOS, Android, and Web from one codebase',
  },
};

export default function FeaturePage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const isWide = width >= 1024;
  const isXWide = width >= 1920;

  const feature = FEATURES[slug as string];

  if (!feature) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, color: '#6B7280' }}>Feature not found.</Text>
        <Pressable onPress={() => router.navigate('/' as any)} style={{ marginTop: 16 }}>
          <Text style={{ color: BRAND_COLOR, fontWeight: '600' }}>← Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  const wideMaxWidth = 1680;
  const bodyMaxWidth = 1504;
  const px = isMobile ? 20 : isWide ? 48 : 32;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 80 }}>
      {/* Hero gradient */}
      <LinearGradient
        colors={feature.gradientColors}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.8 }}
      >
        <View style={{ maxWidth: wideMaxWidth, alignSelf: 'center', width: '100%', paddingHorizontal: px, paddingTop: isXWide ? 120 : isWide ? 80 : 48, paddingBottom: isXWide ? 108 : isWide ? 72 : 44 }}>
          {/* Back */}
          <Pressable onPress={() => router.navigate('/' as any)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 32, alignSelf: 'flex-start' }}>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>←</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500' }}>Back to Home</Text>
          </Pressable>

          {/* Icon */}
          <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 28 }}>{feature.icon}</Text>
          </View>

          {/* Title */}
          <Text style={{ fontSize: isXWide ? 72 : isWide ? 56 : 32, fontWeight: '800', color: '#fff', lineHeight: isXWide ? 80 : isWide ? 64 : 40, marginBottom: 16 }}>
            {feature.title}
          </Text>
          <Text style={{ fontSize: isWide ? 20 : 16, color: 'rgba(255,255,255,0.8)', lineHeight: isWide ? 30 : 24 }}>
            {feature.tagline}
          </Text>
        </View>
      </LinearGradient>

      {/* Stat bar */}
      <View style={{ backgroundColor: '#1F2937' }}>
        <View style={{ maxWidth: wideMaxWidth, alignSelf: 'center', width: '100%', paddingHorizontal: px, paddingVertical: 24, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Text style={{ fontSize: isWide ? 40 : 32, fontWeight: '800', color: '#fff' }}>{feature.stat}</Text>
          <Text style={{ fontSize: isWide ? 16 : 14, color: 'rgba(255,255,255,0.6)', flex: 1 }}>{feature.statLabel}</Text>
          <Pressable
            onPress={() => router.navigate('/components' as any)}
            style={{ backgroundColor: BRAND_COLOR, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Browse Components →</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ maxWidth: bodyMaxWidth, alignSelf: 'center', width: '100%', paddingHorizontal: px }}>
        {/* Problem section */}
        <View style={{ paddingTop: 56, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <View style={{ width: 4, height: 24, backgroundColor: '#EF4444', borderRadius: 2 }} />
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#EF4444', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              The Problem
            </Text>
          </View>
          <Text style={{ fontSize: isWide ? 28 : 22, fontWeight: '800', color: '#111827', marginBottom: 16, lineHeight: isWide ? 36 : 30 }}>
            {feature.problemTitle}
          </Text>
          <Text style={{ fontSize: isWide ? 17 : 15, color: '#4B5563', lineHeight: isWide ? 28 : 24 }}>
            {feature.problem}
          </Text>
        </View>

        {/* Solution section */}
        <View style={{ paddingTop: 40, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <View style={{ width: 4, height: 24, backgroundColor: '#10B981', borderRadius: 2 }} />
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#10B981', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              Our Solution
            </Text>
          </View>
          <Text style={{ fontSize: isWide ? 28 : 22, fontWeight: '800', color: '#111827', marginBottom: 16, lineHeight: isWide ? 36 : 30 }}>
            {feature.solutionTitle}
          </Text>
          <Text style={{ fontSize: isWide ? 17 : 15, color: '#4B5563', lineHeight: isWide ? 28 : 24 }}>
            {feature.solution}
          </Text>
        </View>

        {/* Feature highlights */}
        <View style={{ paddingTop: 40, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
          <Text style={{ fontSize: isWide ? 28 : 22, fontWeight: '800', color: '#111827', marginBottom: 24 }}>
            Key Benefits
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            {feature.highlights.map((h, i) => (
              <Pressable
                key={i}
                onPress={h.link ? () => router.navigate(`/components/docs/${h.link}` as any) : undefined}
                style={({ pressed }) => ({
                  flex: 1,
                  minWidth: isMobile ? '100%' : isXWide ? '22%' : isWide ? '45%' : '100%',
                  backgroundColor: pressed && h.link ? '#F3F4F6' : '#F9FAFB',
                  borderRadius: 12,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E5E7EB' }}>
                    <Text style={{ fontSize: 18 }}>{h.icon}</Text>
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', flex: 1 }}>{h.title}</Text>
                  {h.link && <Text style={{ fontSize: 16, color: '#9CA3AF' }}>→</Text>}
                </View>
                <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>{h.desc}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Code section */}
        <View style={{ paddingTop: 40, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
          <Text style={{ fontSize: isWide ? 28 : 22, fontWeight: '800', color: '#111827', marginBottom: 20 }}>
            See It in Code
          </Text>
          <View style={{ backgroundColor: '#1F2937', borderRadius: 12, overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 6, borderBottomWidth: 1, borderBottomColor: '#374151' }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444' }} />
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#F59E0B' }} />
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' }} />
              <Text style={{ color: '#9CA3AF', fontSize: 12, marginLeft: 8 }}>example.tsx</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={{ fontFamily: 'monospace', fontSize: isWide ? 14 : 12, color: '#D1D5DB', padding: 20, lineHeight: isWide ? 24 : 20 }}>
                {feature.code}
              </Text>
            </ScrollView>
          </View>
        </View>

        {/* CTA */}
        <View style={{ paddingTop: 56, alignItems: 'center' }}>
          <LinearGradient
            colors={feature.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 16, padding: 40, width: '100%', alignItems: 'center' }}
          >
            <Text style={{ fontSize: isWide ? 28 : 22, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 10 }}>
              Ready to get started?
            </Text>
            <Text style={{ fontSize: isWide ? 16 : 14, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: 24, maxWidth: 400 }}>
              Explore all 70+ components and start shipping production-grade apps today.
            </Text>
            <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Pressable
                onPress={() => router.navigate('/components' as any)}
                style={{ backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}
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
