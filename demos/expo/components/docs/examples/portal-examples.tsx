import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Portal, Text, Box } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function PortalExamples() {
  useExampleCode(`import { Portal, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <View>
      <Text>Content inside the component tree</Text>
      <Portal>
        <Text>This renders outside the parent tree</Text>
      </Portal>
    </View>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Portal"
        description="Renders children outside the parent component tree. Commonly used internally by Modal, Popover, and Menu components."
        code={`import { Portal, Text } from '@wireservers-ui/react-natives';
import { View } from 'react-native';

export default function Example() {
  return (
    <View>
      <Text>Content inside the component tree</Text>
      <Portal>
        <Text>This renders outside the parent tree</Text>
      </Portal>
    </View>
  );
}`}
      >
        <Box className="p-4 bg-background-100 rounded-lg border border-outline-200">
          <Text>Portal is primarily used internally by overlay components like Modal, Popover, and Menu to render content above the rest of the UI.</Text>
        </Box>
      </ExampleSection>
    </View>
  );
}
