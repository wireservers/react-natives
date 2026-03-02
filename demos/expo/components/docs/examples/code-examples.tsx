import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Code, CodeBlock, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const variants = ['subtle', 'outline', 'solid'] as const;

export default function CodeExamples() {
  const [variant, setVariant] = useState<string>('subtle');

  useExampleCode(`import { Code, CodeBlock } from '@wireservers-ui/react-natives';

export default function Example() {
  return <Code variant="${variant}">console.log('hello')</Code>;
}`, [variant]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Select a variant for the inline code.">
        <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={setVariant} />
        <View style={{ marginTop: 8 }}>
          <Text>Run <Code variant={variant as any}>npm install</Code> to install dependencies.</Text>
        </View>
      </ExampleSection>

      <ExampleSection title="Code Block" description="Multi-line code display.">
        <CodeBlock>{`function greet(name: string) {\n  return \`Hello, \${name}!\`;\n}`}</CodeBlock>
      </ExampleSection>
    </View>
  );
}
