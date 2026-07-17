import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import {
  Button,
  ButtonText,
  DrawerCard,
  DrawerSectionLabel,
  FormDrawer,
  Input,
  InputField,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function FormDrawerExamples() {
  const [open, setOpen] = React.useState(false);

  useExampleCode(`import { FormDrawer, DrawerCard, DrawerSectionLabel } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <FormDrawer
      eyebrow="Editor"
      title="Edit item"
      onClose={() => {}}
      onSave={() => {}}
    >
      <DrawerCard>
        <DrawerSectionLabel>Details</DrawerSectionLabel>
      </DrawerCard>
    </FormDrawer>
  );
}`);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Editor Drawer" description="Right-side form drawer with sticky actions.">
        <Button onPress={() => setOpen(true)}>
          <ButtonText>Open drawer</ButtonText>
        </Button>
        {open ? (
          <FormDrawer
            eyebrow="Editor"
            title="Edit transaction"
            subtitle="Update details without leaving the screen."
            onClose={() => setOpen(false)}
            onSave={() => setOpen(false)}
          >
            <DrawerCard>
              <DrawerSectionLabel>Details</DrawerSectionLabel>
              <Input>
                <InputField placeholder="Name" />
              </Input>
            </DrawerCard>
          </FormDrawer>
        ) : null}
      </ExampleSection>
    </View>
  );
}
