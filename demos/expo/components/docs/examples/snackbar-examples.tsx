import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Snackbar, SnackbarText, SnackbarActionButton, Button, ButtonText, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const actions = ['info', 'success', 'warning', 'error'] as const;

export default function SnackbarExamples() {
  const [action, setAction] = useState<string>('info');
  const [visible, setVisible] = useState(false);

  useExampleCode(`import { Snackbar, SnackbarText, SnackbarActionButton, Button, ButtonText } from '@wireservers-ui/react-natives';

export default function Example() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>
        <ButtonText>Show Snackbar</ButtonText>
      </Button>
      {visible && (
        <Snackbar action="${action}">
          <SnackbarText>Item has been saved successfully.</SnackbarText>
          <SnackbarActionButton label="Dismiss" onPress={() => setVisible(false)} />
        </Snackbar>
      )}
    </>
  );
}`, [action]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Show a snackbar notification with different actions.">
        <VariantPicker label="Action" options={[...actions]} value={action} onChange={setAction} />
        <View style={{ marginTop: 8 }}>
          <Button onPress={() => { setVisible(true); setTimeout(() => setVisible(false), 3000); }}>
            <ButtonText>Show Snackbar</ButtonText>
          </Button>
        </View>
        {visible && (
          <Snackbar action={action as any}>
            <SnackbarText>Item has been saved successfully.</SnackbarText>
            <SnackbarActionButton label="Dismiss" onPress={() => setVisible(false)} />
          </Snackbar>
        )}
      </ExampleSection>
    </View>
  );
}
