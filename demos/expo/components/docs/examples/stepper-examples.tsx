import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Stepper, Step, StepIndicator, StepSeparator, StepTitle, StepDescription, Button, ButtonText, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const orientations = ['horizontal', 'vertical'] as const;

export default function StepperExamples() {
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [activeStep, setActiveStep] = useState(1);

  useExampleCode(`import { Stepper, Step, StepIndicator, StepSeparator, StepTitle } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Stepper activeStep={${activeStep}} orientation="${orientation}">
      <Step index={0}>
        <StepIndicator />
        <StepTitle>Account</StepTitle>
        <StepSeparator />
      </Step>
      <Step index={1}>
        <StepIndicator />
        <StepTitle>Profile</StepTitle>
        <StepSeparator />
      </Step>
      <Step index={2}>
        <StepIndicator />
        <StepTitle>Review</StepTitle>
      </Step>
    </Stepper>
  );
}`, [orientation, activeStep]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Step through a multi-step process.">
        <VariantPicker label="Orientation" options={[...orientations]} value={orientation} onChange={setOrientation} />
        <Stepper activeStep={activeStep} orientation={orientation as any} style={{ marginTop: 8 }}>
          <Step index={0}>
            <StepIndicator />
            <StepTitle>Account</StepTitle>
            <StepSeparator />
          </Step>
          <Step index={1}>
            <StepIndicator />
            <StepTitle>Profile</StepTitle>
            <StepSeparator />
          </Step>
          <Step index={2}>
            <StepIndicator />
            <StepTitle>Review</StepTitle>
          </Step>
        </Stepper>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <Button size="sm" onPress={() => setActiveStep(s => Math.max(0, s - 1))}><ButtonText>Back</ButtonText></Button>
          <Button size="sm" onPress={() => setActiveStep(s => Math.min(2, s + 1))}><ButtonText>Next</ButtonText></Button>
        </View>
      </ExampleSection>
    </View>
  );
}
