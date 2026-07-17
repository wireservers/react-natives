import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Button, ButtonText, SelectionBar, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function SelectionBarExamples() {
  const [count, setCount] = React.useState(2);

  useExampleCode(`import { SelectionBar } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <SelectionBar
      count={2}
      label="Transactions"
      summary="2 selected for comparison"
      onClear={() => {}}
      onCompare={() => {}}
    />
  );
}`);

  return (
    <View style={{ gap: 24, minHeight: 220 }}>
      <ExampleSection title="Bulk Actions" description="Show a fixed action bar while items are selected.">
        <View style={{ gap: 12 }}>
          <Text className="text-typography-600">Preview area with selected rows.</Text>
          <Button size="sm" onPress={() => setCount((value) => (value ? 0 : 2))}>
            <ButtonText>{count ? 'Clear preview' : 'Select 2'}</ButtonText>
          </Button>
        </View>
        <SelectionBar
          count={count}
          label="Transactions"
          summary={`${count} selected for comparison`}
          onClear={() => setCount(0)}
          onCompare={() => undefined}
        />
      </ExampleSection>
    </View>
  );
}
