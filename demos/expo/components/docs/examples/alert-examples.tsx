import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Alert,
  AlertIcon,
  AlertBody,
  AlertText,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const statuses = ['info', 'success', 'warning', 'error'] as const;
const variants = ['solid', 'subtle', 'outline'] as const;

const statusMessages: Record<string, string> = {
  info: 'A new software update is available. See what is new in version 2.0.',
  success: 'Your changes have been saved successfully.',
  warning: 'Your account is about to expire. Please renew soon.',
  error: 'There was an error processing your request. Please try again.',
};

export default function AlertExamples() {
  const [status, setStatus] = useState<string>('info');
  const [variant, setVariant] = useState<string>('solid');

  useExampleCode(`import { Alert, AlertIcon, AlertBody, AlertText } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Alert status="${status}" variant="${variant}">
      <AlertIcon />
      <AlertBody>
        <AlertText>Your alert message here.</AlertText>
      </AlertBody>
    </Alert>
  );
}`, [status, variant]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Choose a status and variant to preview the Alert component."
      >
        <VariantPicker
          label="Status"
          options={[...statuses]}
          value={status}
          onChange={setStatus}
        />
        <VariantPicker
          label="Variant"
          options={[...variants]}
          value={variant}
          onChange={setVariant}
        />

        <View style={{ marginTop: 8 }}>
          <Alert status={status as any} variant={variant as any}>
            <AlertIcon />
            <AlertBody>
              <AlertText>{statusMessages[status]}</AlertText>
            </AlertBody>
          </Alert>
        </View>
      </ExampleSection>

      {/* All Statuses */}
      <ExampleSection
        title="Statuses"
        description="Alert supports four status types to convey different levels of feedback."
      >
        <View style={{ gap: 12 }}>
          {statuses.map((s) => (
            <Alert key={s} status={s} variant="subtle">
              <AlertIcon />
              <AlertBody>
                <AlertText>{statusMessages[s]}</AlertText>
              </AlertBody>
            </Alert>
          ))}
        </View>
      </ExampleSection>

      {/* All Variants */}
      <ExampleSection
        title="Variants"
        description="Alerts come in solid, subtle, and outline variants."
      >
        <View style={{ gap: 12 }}>
          {variants.map((v) => (
            <Alert key={v} status="info" variant={v}>
              <AlertIcon />
              <AlertBody>
                <AlertText>
                  This is an info alert using the {v} variant.
                </AlertText>
              </AlertBody>
            </Alert>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}
