import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { IconButton, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const actions = ['primary', 'secondary', 'positive', 'negative'] as const;
const variants = ['solid', 'outline', 'ghost'] as const;
const sizes = ['xs', 'sm', 'md', 'lg'] as const;

function PlaceholderIcon({ className, size, ...props }: any) {
  return <View className={`bg-current rounded-sm ${className ?? ''}`} style={size ? { width: size, height: size } : { width: 16, height: 16 }} {...props} />;
}

export default function IconButtonExamples() {
  const [action, setAction] = useState<string>('primary');
  const [variant, setVariant] = useState<string>('solid');
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { IconButton } from '@wireservers-ui/react-natives';
import { Trash } from 'lucide-react-native';

export default function Example() {
  return (
    <IconButton
      as={Trash}
      action="${action}"
      variant="${variant}"
      size="${size}"
      onPress={() => {}}
    />
  );
}`, [action, variant, size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Customize the IconButton appearance.">
        <VariantPicker label="Action" options={[...actions]} value={action} onChange={setAction} />
        <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={setVariant} />
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <IconButton as={PlaceholderIcon} action={action as any} variant={variant as any} size={size as any} onPress={() => {}} />
        </View>
      </ExampleSection>

      <ExampleSection title="All Actions" description="Icon buttons in each action color.">
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {actions.map(a => (
            <IconButton key={a} as={PlaceholderIcon} action={a} onPress={() => {}} />
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}
