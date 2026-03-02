import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Pressable, Text, Box } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function PressableExamples() {
  const [count, setCount] = useState(0);

  useExampleCode(`import { Pressable, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Pressable
      className="p-4 bg-primary-500 rounded-lg"
      onPress={() => console.log('pressed')}
    >
      <Text className="text-white text-center">Press me</Text>
    </Pressable>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Pressable" description="A styled pressable with press states.">
        <Pressable
          className="p-4 bg-primary-500 rounded-lg active:bg-primary-600"
          onPress={() => setCount(c => c + 1)}
        >
          <Text className="text-white text-center">Pressed {count} times</Text>
        </Pressable>
      </ExampleSection>

      <ExampleSection title="Disabled" description="Pressable with disabled state.">
        <Pressable className="p-4 bg-background-300 rounded-lg" disabled>
          <Text className="text-typography-400 text-center">Disabled</Text>
        </Pressable>
      </ExampleSection>
    </View>
  );
}
