import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { FormWizard, Text, type WizardStep } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function FormWizardExamples() {
  const steps: WizardStep[] = [
    { id: 'profile', label: 'Profile', render: () => <Text>Collect profile details.</Text> },
    { id: 'review', label: 'Review', render: () => <Text>Review before completion.</Text> },
  ];

  useExampleCode(`import { FormWizard } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <FormWizard
      title="Setup"
      steps={[
        { id: 'profile', label: 'Profile', render: () => null },
        { id: 'review', label: 'Review', render: () => null },
      ]}
      onSaveExit={() => {}}
      onComplete={() => {}}
      onExit={() => {}}
    />
  );
}`);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Multi-Step Form" description="Compose long workflows with Stepper navigation.">
        <FormWizard
          title="Account setup"
          subtitle="A small wizard for multi-part forms."
          steps={steps}
          onSaveExit={() => undefined}
          onComplete={() => undefined}
          onExit={() => undefined}
        />
      </ExampleSection>
    </View>
  );
}
