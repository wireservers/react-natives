import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { DocPage } from '@/components/docs/doc-page';
import { getComponentBySlug, componentRegistry } from '@/lib/component-registry';

// Example component map — lazy require for each component
const exampleMap: Record<string, React.ComponentType> = {
  // Core Primitives
  text: require('@/components/docs/examples/text-examples').default,
  heading: require('@/components/docs/examples/heading-examples').default,
  icon: require('@/components/docs/examples/icon-examples').default,
  divider: require('@/components/docs/examples/divider-examples').default,
  badge: require('@/components/docs/examples/badge-examples').default,
  spinner: require('@/components/docs/examples/spinner-examples').default,
  image: require('@/components/docs/examples/image-examples').default,
  avatar: require('@/components/docs/examples/avatar-examples').default,
  card: require('@/components/docs/examples/card-examples').default,
  button: require('@/components/docs/examples/button-examples').default,
  // Form Controls
  'form-control': require('@/components/docs/examples/form-control-examples').default,
  input: require('@/components/docs/examples/input-examples').default,
  textarea: require('@/components/docs/examples/textarea-examples').default,
  switch: require('@/components/docs/examples/switch-examples').default,
  checkbox: require('@/components/docs/examples/checkbox-examples').default,
  radio: require('@/components/docs/examples/radio-examples').default,
  slider: require('@/components/docs/examples/slider-examples').default,
  select: require('@/components/docs/examples/select-examples').default,
  // Feedback & Overlay
  alert: require('@/components/docs/examples/alert-examples').default,
  progress: require('@/components/docs/examples/progress-examples').default,
  link: require('@/components/docs/examples/link-examples').default,
  modal: require('@/components/docs/examples/modal-examples').default,
  toast: require('@/components/docs/examples/toast-examples').default,
  tooltip: require('@/components/docs/examples/tooltip-examples').default,
  drawer: require('@/components/docs/examples/drawer-examples').default,
  actionsheet: require('@/components/docs/examples/actionsheet-examples').default,
  // Navigation
  tabs: require('@/components/docs/examples/tabs-examples').default,
  accordion: require('@/components/docs/examples/accordion-examples').default,
  breadcrumb: require('@/components/docs/examples/breadcrumb-examples').default,
  fab: require('@/components/docs/examples/fab-examples').default,
  // Data Display
  calendar: require('@/components/docs/examples/calendar-examples').default,
};

export default function ComponentDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();

  const meta = getComponentBySlug(slug ?? '');
  const ExampleComponent = slug ? exampleMap[slug] : undefined;

  React.useEffect(() => {
    if (meta) {
      navigation.setOptions({ title: meta.name });
    }
  }, [meta, navigation]);

  if (!meta) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 18, color: '#6B7280' }}>
          Component "{slug}" not found.
        </Text>
      </View>
    );
  }

  // Resolve related component slugs to full info
  const relatedComponents = (meta.relatedComponents ?? [])
    .map((relSlug) => {
      const rel = componentRegistry.find((c) => c.slug === relSlug);
      return rel ? { slug: rel.slug, name: rel.name, description: rel.description } : null;
    })
    .filter(Boolean) as { slug: string; name: string; description: string }[];

  return (
    <DocPage
      name={meta.name}
      description={meta.description}
      whenToUse={meta.whenToUse}
      category={meta.category}
      importCode={meta.importCode}
      props={meta.props}
      subComponents={meta.subComponents}
      bestPractices={meta.bestPractices}
      accessibility={meta.accessibility}
      relatedComponents={relatedComponents}
    >
      {ExampleComponent ? <ExampleComponent /> : null}
    </DocPage>
  );
}
