import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Blockquote, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function BlockquoteExamples() {
  useExampleCode(`import { View } from 'react-native';
import { Blockquote, Text } from '@wireservers-ui/react-natives';

// Basic Blockquote
export function BasicExample() {
  return (
    <Blockquote>
      The best way to predict the future is to invent it.
    </Blockquote>
  );
}

// With Attribution
export function AttributionExample() {
  return (
    <View style={{ gap: 4 }}>
      <Blockquote>
        Design is not just what it looks like and feels like. Design is how it works.
      </Blockquote>
      <Text className="text-sm text-typography-500 ml-4">-- Steve Jobs</Text>
    </View>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Blockquote" description="A styled quotation with left border accent."
        code={`import { Blockquote } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Blockquote>The best way to predict the future is to invent it.</Blockquote>
  );
}`}
      >
        <Blockquote>The best way to predict the future is to invent it.</Blockquote>
      </ExampleSection>

      <ExampleSection title="With Attribution" description="Blockquote with source attribution."
        code={`import { Blockquote, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <View style={{ gap: 4 }}>
      <Blockquote>
        Design is not just what it looks like and feels like. Design is how it works.
      </Blockquote>
      <Text className="text-sm text-typography-500 ml-4">-- Steve Jobs</Text>
    </View>
  );
}`}
      >
        <View style={{ gap: 4 }}>
          <Blockquote>Design is not just what it looks like and feels like. Design is how it works.</Blockquote>
          <Text className="text-sm text-typography-500 ml-4">-- Steve Jobs</Text>
        </View>
      </ExampleSection>
    </View>
  );
}
