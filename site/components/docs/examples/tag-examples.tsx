import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Tag, TagText, TagCloseButton, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const actions = ['info', 'success', 'warning', 'error'] as const;
const variants = ['solid', 'outline', 'subtle'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function TagExamples() {
  const [action, setAction] = useState<string>('info');
  const [variant, setVariant] = useState<string>('subtle');
  const [size, setSize] = useState<string>('md');

  useExampleCode(`import { Tag, TagText, TagCloseButton } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Tag action="${action}" variant="${variant}" size="${size}">
      <TagText>Label</TagText>
      <TagCloseButton onPress={() => {}} />
    </Tag>
  );
}`, [action, variant, size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Customize the tag appearance.">
        <VariantPicker label="Action" options={[...actions]} value={action} onChange={setAction} />
        <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={setVariant} />
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, flexDirection: 'row', gap: 8 }}>
          <Tag action={action as any} variant={variant as any} size={size as any}>
            <TagText>Label</TagText>
            <TagCloseButton onPress={() => {}} />
          </Tag>
        </View>
      </ExampleSection>

      <ExampleSection title="All Actions" description="Tags in each action color." code={`import { Tag, TagText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Tag action="info">
      <TagText>info</TagText>
    </Tag>
  );
}`}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {actions.map(a => (
            <Tag key={a} action={a}>
              <TagText>{a}</TagText>
            </Tag>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}
