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
  tag: require('@/components/docs/examples/tag-examples').default,
  skeleton: require('@/components/docs/examples/skeleton-examples').default,
  empty: require('@/components/docs/examples/empty-examples').default,
  stat: require('@/components/docs/examples/stat-examples').default,
  kbd: require('@/components/docs/examples/kbd-examples').default,
  code: require('@/components/docs/examples/code-examples').default,
  blockquote: require('@/components/docs/examples/blockquote-examples').default,
  'icon-button': require('@/components/docs/examples/icon-button-examples').default,
  'circular-progress': require('@/components/docs/examples/circular-progress-examples').default,
  overlay: require('@/components/docs/examples/overlay-examples').default,
  timeline: require('@/components/docs/examples/timeline-examples').default,
  table: require('@/components/docs/examples/table-examples').default,
  list: require('@/components/docs/examples/list-examples').default,
  carousel: require('@/components/docs/examples/carousel-examples').default,
  // Layout
  box: require('@/components/docs/examples/box-examples').default,
  stack: require('@/components/docs/examples/stack-examples').default,
  center: require('@/components/docs/examples/center-examples').default,
  'aspect-ratio': require('@/components/docs/examples/aspect-ratio-examples').default,
  pressable: require('@/components/docs/examples/pressable-examples').default,
  container: require('@/components/docs/examples/container-examples').default,
  // Utility
  portal: require('@/components/docs/examples/portal-examples').default,
  'visually-hidden': require('@/components/docs/examples/visually-hidden-examples').default,
  // Navigation (extended)
  menu: require('@/components/docs/examples/menu-examples').default,
  pagination: require('@/components/docs/examples/pagination-examples').default,
  stepper: require('@/components/docs/examples/stepper-examples').default,
  'segmented-control': require('@/components/docs/examples/segmented-control-examples').default,
  // Buttons
  toggle: require('@/components/docs/examples/toggle-examples').default,
  'toggle-group': require('@/components/docs/examples/toggle-group-examples').default,
  // Disclosure
  collapsible: require('@/components/docs/examples/collapsible-examples').default,
  // Dialogs & Overlays
  'alert-dialog': require('@/components/docs/examples/alert-dialog-examples').default,
  popover: require('@/components/docs/examples/popover-examples').default,
  snackbar: require('@/components/docs/examples/snackbar-examples').default,
  // Form Controls (extended)
  'number-input': require('@/components/docs/examples/number-input-examples').default,
  'password-input': require('@/components/docs/examples/password-input-examples').default,
  'search-input': require('@/components/docs/examples/search-input-examples').default,
  rating: require('@/components/docs/examples/rating-examples').default,
  'tags-input': require('@/components/docs/examples/tags-input-examples').default,
  'date-picker': require('@/components/docs/examples/date-picker-examples').default,
  'pin-input': require('@/components/docs/examples/pin-input-examples').default,
  'color-picker': require('@/components/docs/examples/color-picker-examples').default,
};

export function generateStaticParams(): { slug: string }[] {
  return componentRegistry.map((c) => ({ slug: c.slug }));
}

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
      exampleCode={meta.exampleCode}
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
