import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Blockquote, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function BlockquoteExamples() {
  useExampleCode(`import { Blockquote } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Blockquote>
      The best way to predict the future is to invent it.
    </Blockquote>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Blockquote" description="A styled quotation with left border accent.">
        <Blockquote>The best way to predict the future is to invent it.</Blockquote>
      </ExampleSection>

      <ExampleSection title="With Attribution" description="Blockquote with source attribution.">
        <View style={{ gap: 4 }}>
          <Blockquote>Design is not just what it looks like and feels like. Design is how it works.</Blockquote>
          <Text className="text-sm text-typography-500 ml-4">-- Steve Jobs</Text>
        </View>
      </ExampleSection>
    </View>
  );
}
