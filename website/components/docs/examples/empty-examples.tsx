import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Empty, EmptyTitle, EmptyDescription, EmptyAction, Button, ButtonText, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function EmptyExamples() {
  useExampleCode(`import { Empty, EmptyTitle, EmptyDescription, EmptyAction, Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Empty>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>Try adjusting your search or filters to find what you're looking for.</EmptyDescription>
      <EmptyAction>
        <Button size="sm"><ButtonText>Clear filters</ButtonText></Button>
      </EmptyAction>
    </Empty>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Empty State" description="Display when no content is available."
        code={`import { Empty, EmptyTitle, EmptyDescription, EmptyAction, Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Empty>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>Try adjusting your search or filters to find what you're looking for.</EmptyDescription>
      <EmptyAction>
        <Button size="sm"><ButtonText>Clear filters</ButtonText></Button>
      </EmptyAction>
    </Empty>
  );
}`}
      >
        <Empty>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>Try adjusting your search or filters to find what you're looking for.</EmptyDescription>
          <EmptyAction>
            <Button size="sm"><ButtonText>Clear filters</ButtonText></Button>
          </EmptyAction>
        </Empty>
      </ExampleSection>

      <ExampleSection title="Minimal Empty" description="Simple empty state with just a message."
        code={`import { Empty, EmptyTitle, EmptyDescription } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Empty>
      <EmptyTitle>No items yet</EmptyTitle>
      <EmptyDescription>Items you add will appear here.</EmptyDescription>
    </Empty>
  );
}`}
      >
        <Empty>
          <EmptyTitle>No items yet</EmptyTitle>
          <EmptyDescription>Items you add will appear here.</EmptyDescription>
        </Empty>
      </ExampleSection>
    </View>
  );
}
