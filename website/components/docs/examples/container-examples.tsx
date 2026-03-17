import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Container, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

const sizeWidths: Record<string, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: '100%',
};

export default function ContainerExamples() {
  const [size, setSize] = useState<string>('lg');

  useExampleCode(`import { Container, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Container size="${size}">
      <Text>Centered, max-width content area</Text>
    </Container>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Select a container size to preview. The container constrains its max-width based on the selected size.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 16, backgroundColor: '#fff' }}>
          <RNText style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
            max-width: {sizeWidths[size]}
          </RNText>
          <Container size={size as any} style={{ backgroundColor: '#E0F7FA', borderWidth: 2, borderColor: '#43C3E6', borderRadius: 8, padding: 16, borderStyle: 'dashed' as any }}>
            <Text className="text-center">Content inside Container size="{size}"</Text>
          </Container>
        </View>
      </ExampleSection>
    </View>
  );
}
