import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Kbd, Text, HStack } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function KbdExamples() {
  useExampleCode(`import { Kbd, Text, HStack } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <HStack space="xs" className="items-center">
      <Kbd>⌘</Kbd>
      <Text>+</Text>
      <Kbd>S</Kbd>
    </HStack>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Keyboard Shortcuts" description="Display keyboard key combinations.">
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Kbd>⌘</Kbd><Text>+</Text><Kbd>S</Kbd><Text className="ml-2 text-typography-500">Save</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Kbd>⌘</Kbd><Text>+</Text><Kbd>C</Kbd><Text className="ml-2 text-typography-500">Copy</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Z</Kbd><Text className="ml-2 text-typography-500">Undo</Text>
          </View>
        </View>
      </ExampleSection>

      <ExampleSection title="Single Keys" description="Individual key display.">
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Kbd>Esc</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Space</Kbd>
        </View>
      </ExampleSection>
    </View>
  );
}
