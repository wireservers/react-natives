import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Button, ButtonText, Text, useConfirm } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function ConfirmDialogExamples() {
  const { confirm, dialog } = useConfirm();
  const [result, setResult] = React.useState('No decision yet');

  useExampleCode(`import { Button, ButtonText, useConfirm } from '@wireservers-ui/react-natives';

export default function Example() {
  const { confirm, dialog } = useConfirm();
  return (
    <>
      <Button onPress={async () => await confirm({ title: 'Delete item?' })}>
        <ButtonText>Confirm</ButtonText>
      </Button>
      {dialog}
    </>
  );
}`);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Promise Confirmation" description="Ask for confirmation without using native alerts.">
        <Button
          action="negative"
          onPress={async () => {
            const ok = await confirm({
              title: 'Delete item?',
              message: 'This action cannot be undone.',
            });
            setResult(ok ? 'Confirmed' : 'Cancelled');
          }}
        >
          <ButtonText>Delete</ButtonText>
        </Button>
        <Text size="sm" className="text-typography-500">
          {result}
        </Text>
        {dialog}
      </ExampleSection>
    </View>
  );
}
