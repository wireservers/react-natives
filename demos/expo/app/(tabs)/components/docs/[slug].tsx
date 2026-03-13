import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { DocPage } from '@/components/docs/doc-page';
import { SeoHead } from '@/components/seo/seo-head';
import { getComponentBySlug, componentRegistry } from '@/lib/component-registry';
import { SITE_URL } from '@/lib/seo';

type ExampleModule = { default: React.ComponentType };

// Load example modules on demand to keep non-doc routes lighter.
const exampleLoaders: Record<string, () => Promise<ExampleModule>> = {
  // Core Primitives
  text: () => import('@/components/docs/examples/text-examples'),
  heading: () => import('@/components/docs/examples/heading-examples'),
  icon: () => import('@/components/docs/examples/icon-examples'),
  divider: () => import('@/components/docs/examples/divider-examples'),
  badge: () => import('@/components/docs/examples/badge-examples'),
  spinner: () => import('@/components/docs/examples/spinner-examples'),
  image: () => import('@/components/docs/examples/image-examples'),
  avatar: () => import('@/components/docs/examples/avatar-examples'),
  card: () => import('@/components/docs/examples/card-examples'),
  button: () => import('@/components/docs/examples/button-examples'),
  // Form Controls
  'form-control': () => import('@/components/docs/examples/form-control-examples'),
  input: () => import('@/components/docs/examples/input-examples'),
  textarea: () => import('@/components/docs/examples/textarea-examples'),
  switch: () => import('@/components/docs/examples/switch-examples'),
  checkbox: () => import('@/components/docs/examples/checkbox-examples'),
  radio: () => import('@/components/docs/examples/radio-examples'),
  slider: () => import('@/components/docs/examples/slider-examples'),
  select: () => import('@/components/docs/examples/select-examples'),
  // Feedback & Overlay
  alert: () => import('@/components/docs/examples/alert-examples'),
  progress: () => import('@/components/docs/examples/progress-examples'),
  link: () => import('@/components/docs/examples/link-examples'),
  modal: () => import('@/components/docs/examples/modal-examples'),
  toast: () => import('@/components/docs/examples/toast-examples'),
  tooltip: () => import('@/components/docs/examples/tooltip-examples'),
  drawer: () => import('@/components/docs/examples/drawer-examples'),
  actionsheet: () => import('@/components/docs/examples/actionsheet-examples'),
  // Navigation
  tabs: () => import('@/components/docs/examples/tabs-examples'),
  accordion: () => import('@/components/docs/examples/accordion-examples'),
  breadcrumb: () => import('@/components/docs/examples/breadcrumb-examples'),
  fab: () => import('@/components/docs/examples/fab-examples'),
  // Data Display
  calendar: () => import('@/components/docs/examples/calendar-examples'),
  tag: () => import('@/components/docs/examples/tag-examples'),
  skeleton: () => import('@/components/docs/examples/skeleton-examples'),
  empty: () => import('@/components/docs/examples/empty-examples'),
  stat: () => import('@/components/docs/examples/stat-examples'),
  kbd: () => import('@/components/docs/examples/kbd-examples'),
  code: () => import('@/components/docs/examples/code-examples'),
  blockquote: () => import('@/components/docs/examples/blockquote-examples'),
  'icon-button': () => import('@/components/docs/examples/icon-button-examples'),
  'circular-progress': () => import('@/components/docs/examples/circular-progress-examples'),
  overlay: () => import('@/components/docs/examples/overlay-examples'),
  timeline: () => import('@/components/docs/examples/timeline-examples'),
  table: () => import('@/components/docs/examples/table-examples'),
  list: () => import('@/components/docs/examples/list-examples'),
  carousel: () => import('@/components/docs/examples/carousel-examples'),
  // Layout
  box: () => import('@/components/docs/examples/box-examples'),
  stack: () => import('@/components/docs/examples/stack-examples'),
  center: () => import('@/components/docs/examples/center-examples'),
  'aspect-ratio': () => import('@/components/docs/examples/aspect-ratio-examples'),
  pressable: () => import('@/components/docs/examples/pressable-examples'),
  container: () => import('@/components/docs/examples/container-examples'),
  // Utility
  portal: () => import('@/components/docs/examples/portal-examples'),
  'visually-hidden': () => import('@/components/docs/examples/visually-hidden-examples'),
  // Navigation (extended)
  menu: () => import('@/components/docs/examples/menu-examples'),
  pagination: () => import('@/components/docs/examples/pagination-examples'),
  stepper: () => import('@/components/docs/examples/stepper-examples'),
  'segmented-control': () => import('@/components/docs/examples/segmented-control-examples'),
  // Buttons
  toggle: () => import('@/components/docs/examples/toggle-examples'),
  'toggle-group': () => import('@/components/docs/examples/toggle-group-examples'),
  // Disclosure
  collapsible: () => import('@/components/docs/examples/collapsible-examples'),
  // Dialogs & Overlays
  'alert-dialog': () => import('@/components/docs/examples/alert-dialog-examples'),
  popover: () => import('@/components/docs/examples/popover-examples'),
  snackbar: () => import('@/components/docs/examples/snackbar-examples'),
  // Form Controls (extended)
  'number-input': () => import('@/components/docs/examples/number-input-examples'),
  'password-input': () => import('@/components/docs/examples/password-input-examples'),
  'search-input': () => import('@/components/docs/examples/search-input-examples'),
  rating: () => import('@/components/docs/examples/rating-examples'),
  'tags-input': () => import('@/components/docs/examples/tags-input-examples'),
  'date-picker': () => import('@/components/docs/examples/date-picker-examples'),
  'pin-input': () => import('@/components/docs/examples/pin-input-examples'),
  'color-picker': () => import('@/components/docs/examples/color-picker-examples'),
};

export function generateStaticParams(): { slug: string }[] {
  return componentRegistry.map((c) => ({ slug: c.slug }));
}

export default function ComponentDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();

  const meta = getComponentBySlug(slug ?? '');
  const [ExampleComponent, setExampleComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    let active = true;

    const loadExample = async () => {
      if (!slug) {
        setExampleComponent(null);
        return;
      }

      const load = exampleLoaders[slug];
      if (!load) {
        setExampleComponent(null);
        return;
      }

      try {
        const mod = await load();
        if (active) {
          setExampleComponent(() => mod.default);
        }
      } catch {
        if (active) {
          setExampleComponent(null);
        }
      }
    };

    void loadExample();
    return () => {
      active = false;
    };
  }, [slug]);

  React.useEffect(() => {
    if (meta) {
      navigation.setOptions({ title: meta.name });
    }
  }, [meta, navigation]);

  if (!meta) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 18, color: '#6B7280' }}>
          {`Component "${slug}" not found.`}
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
  const pagePath = `/components/docs/${meta.slug}`;
  const pageDescription = `${meta.description} Learn how to use the ${meta.name} component with examples, props API, and best practices.`;

  return (
    <>
      <SeoHead
        title={`${meta.name} - React-Natives Component Documentation`}
        description={pageDescription}
        path={pagePath}
        type="article"
        keywords={`${meta.name} component, react native ${meta.slug}, react natives ${meta.name}, ${meta.category.toLowerCase()} components`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            '@id': `${SITE_URL}${pagePath}#article`,
            headline: `${meta.name} Component Documentation`,
            description: pageDescription,
            url: `${SITE_URL}${pagePath}`,
            articleSection: meta.category,
            author: {
              '@id': `${SITE_URL}/#organization`,
            },
            publisher: {
              '@id': `${SITE_URL}/#organization`,
            },
            mainEntityOfPage: `${SITE_URL}${pagePath}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Components',
                item: `${SITE_URL}/components`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: meta.name,
                item: `${SITE_URL}${pagePath}`,
              },
            ],
          },
        ]}
      />
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
    </>
  );
}
