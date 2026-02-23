import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const categories = [
  {
    title: 'Core Primitives',
    description: 'Text, Heading, Icon, Divider, Badge, Spinner, Image, Avatar, Card, Button',
    route: '/components/primitives',
  },
  {
    title: 'Form Controls',
    description: 'FormControl, Input, Textarea, Switch, Checkbox, Radio, Slider, Select',
    route: '/components/form-controls',
  },
  {
    title: 'Feedback & Overlay',
    description: 'Alert, Progress, Link, Modal, Toast, Tooltip, Drawer, ActionSheet',
    route: '/components/feedback',
  },
  {
    title: 'Navigation & Disclosure',
    description: 'Fab, Breadcrumb, Tabs, Accordion',
    route: '/components/navigation',
  },
];

export default function ComponentsIndex() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-background-0"
      contentContainerClassName="p-6 gap-4 pb-24"
    >
      <Text className="text-3xl font-bold text-typography-900 mb-2">
        Component Library
      </Text>
      <Text className="text-base text-typography-600 mb-4">
        @wireservers-ui/components — 29 components across 4 categories
      </Text>
      {categories.map((cat) => (
        <Pressable
          key={cat.title}
          onPress={() => router.push(cat.route as any)}
          className="rounded-xl border border-outline-200 bg-background-0 p-4 gap-1 active:bg-background-50"
        >
          <Text className="text-lg font-semibold text-typography-900">
            {cat.title}
          </Text>
          <Text className="text-sm text-typography-500">{cat.description}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
