import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Collapsible, CollapsibleTrigger, CollapsibleContent, Text, Box } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function CollapsibleExamples() {
  useExampleCode(`import { Collapsible, CollapsibleTrigger, CollapsibleContent, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <Text>Click to expand</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>Hidden content revealed!</Text>
      </CollapsibleContent>
    </Collapsible>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Collapsible" description="Toggle content visibility with a trigger."
        code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <Text>Click to expand</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>This content is revealed when the trigger is pressed.</Text>
      </CollapsibleContent>
    </Collapsible>
  );
}`}
      >
        <Collapsible>
          <CollapsibleTrigger>
            <Box className="p-3 bg-background-100 rounded-lg border border-outline-200">
              <Text className="font-medium">Click to expand</Text>
            </Box>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Box className="p-3 mt-1 bg-background-50 rounded-lg">
              <Text>This content is revealed when the trigger is pressed.</Text>
            </Box>
          </CollapsibleContent>
        </Collapsible>
      </ExampleSection>

      <ExampleSection title="Default Open" description="Start with the content visible."
        code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent, Text } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>
        <Text>Click to collapse</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>This content is visible by default.</Text>
      </CollapsibleContent>
    </Collapsible>
  );
}`}
      >
        <Collapsible defaultOpen>
          <CollapsibleTrigger>
            <Box className="p-3 bg-background-100 rounded-lg border border-outline-200">
              <Text className="font-medium">Click to collapse</Text>
            </Box>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Box className="p-3 mt-1 bg-background-50 rounded-lg">
              <Text>This content is visible by default.</Text>
            </Box>
          </CollapsibleContent>
        </Collapsible>
      </ExampleSection>
    </View>
  );
}
