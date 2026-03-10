import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Icon } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/** Map Tailwind h-* classes to pixel sizes so MaterialCommunityIcons renders correctly. */
const twSizeToPixels: Record<string, number> = {
  'h-4': 16,
  'h-5': 20,
  'h-6': 24,
  'h-8': 32,
  'h-10': 40,
  'h-12': 48,
};

function sizeFromClassName(className?: string): number | undefined {
  if (!className) return undefined;
  for (const token of className.split(' ')) {
    if (twSizeToPixels[token]) return twSizeToPixels[token];
  }
  return undefined;
}

/** Wraps a MaterialCommunityIcons glyph so it works with the Icon `as` prop. */
function createIcon(name: React.ComponentProps<typeof MaterialCommunityIcons>['name']) {
  const IconComponent = React.forwardRef<any, any>(({ className, size, color, ...props }, ref) => {
    const resolvedSize = typeof size === 'number' ? size : sizeFromClassName(className) ?? 24;
    return (
      <MaterialCommunityIcons
        ref={ref}
        name={name}
        size={resolvedSize}
        color={color ?? '#1f2937'}
        {...props}
      />
    );
  });
  IconComponent.displayName = `Icon(${name})`;
  return IconComponent;
}

const StarIcon = createIcon('star');
const HeartIcon = createIcon('heart');
const CogIcon = createIcon('cog');

export default function IconExamples() {
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { Icon } from '@wireservers-ui/react-natives';
import { Star } from 'lucide-react-native';

export default function Example() {
  return <Icon as={Star} size="${size}" />;
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Select a size to preview the Icon component."
      >
        <VariantPicker
          label="Size"
          options={[...sizes]}
          value={size}
          onChange={setSize}
        />

        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <Icon as={StarIcon} size={size as any} />
        </View>
      </ExampleSection>

      {/* All Sizes */}
      <ExampleSection
        title="All Sizes"
        description="Icons scale from xs (16px) through 2xl (48px)."
        code={`import { Icon } from '@wireservers-ui/react-natives';
import { Star } from 'lucide-react-native';

export default function Example() {
  return <Icon as={Star} size="lg" />;
}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 16 }}>
          {sizes.map((s) => (
            <View key={s} style={{ alignItems: 'center', gap: 8 }}>
              <Icon as={StarIcon} size={s} />
              <RNText style={{ fontSize: 10, color: '#8c8c8c' }}>{s}</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>

      {/* Numeric Size */}
      <ExampleSection
        title="Custom Numeric Size"
        description="Pass a number to the size prop for pixel-exact sizing."
        code={`import { Icon } from '@wireservers-ui/react-natives';
import { Star } from 'lucide-react-native';

export default function Example() {
  return <Icon as={Star} size={32} />;
}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 16 }}>
          {[16, 24, 32, 48].map((n) => (
            <View key={n} style={{ alignItems: 'center', gap: 8 }}>
              <Icon as={StarIcon} size={n} />
              <RNText style={{ fontSize: 10, color: '#8c8c8c' }}>{n}px</RNText>
            </View>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}
