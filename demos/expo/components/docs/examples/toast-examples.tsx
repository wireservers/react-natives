import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const statuses = ['info', 'success', 'warning', 'error'] as const;
const variants = ['solid', 'subtle', 'outline'] as const;

const statusTitles: Record<string, string> = {
  info: 'Information',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

const statusDescriptions: Record<string, string> = {
  info: 'Your session will expire in 5 minutes.',
  success: 'Your profile has been updated successfully.',
  warning: 'Storage is almost full. Consider freeing up space.',
  error: 'Failed to save changes. Please try again later.',
};

function ToastInteractive() {
  const [status, setStatus] = useState<string>('success');
  const [variant, setVariant] = useState<string>('solid');
  const { show } = useToast();

  const fireToast = (newStatus: string, newVariant: string) => {
    show({
      title: statusTitles[newStatus],
      description: statusDescriptions[newStatus],
      status: newStatus as any,
      variant: newVariant as any,
      duration: 3000,
    });
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    fireToast(val, variant);
  };

  const handleVariantChange = (val: string) => {
    setVariant(val);
    fireToast(status, val);
  };

  useExampleCode(`import { ToastProvider, useToast } from '@wireservers-ui/react-natives';

// Wrap your app with ToastProvider once at the root:
// <ToastProvider><App /></ToastProvider>

function Example() {
  const { show } = useToast();
  return (
    <Button onPress={() =>
      show({
        title: '${statusTitles[status]}',
        description: '${statusDescriptions[status]}',
        status: '${status}',
        variant: '${variant}',
        duration: 3000,
      })
    }>
      Show Toast
    </Button>
  );
}`, [status, variant]);

  return (
    <View style={{ gap: 12 }}>
      <VariantPicker label="Status" options={[...statuses]} value={status} onChange={handleStatusChange} />
      <VariantPicker label="Variant" options={[...variants]} value={variant} onChange={handleVariantChange} />
      <Pressable
        onPress={() => fireToast(status, variant)}
        style={{
          marginTop: 4,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#06B6D4',
          borderRadius: 8,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Show Toast</Text>
      </Pressable>
    </View>
  );
}

export default function ToastExamples() {
  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Interactive"
        description="Change status or variant to fire a toast, or click the button."
      >
        <ToastInteractive />
      </ExampleSection>

      <ExampleSection
        title="Statuses"
        description="Toast supports info, success, warning, and error statuses."
        code={`import { Toast, ToastTitle, ToastDescription } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Toast status="success" variant="subtle">
      <ToastTitle>Success</ToastTitle>
      <ToastDescription>Your profile has been updated successfully.</ToastDescription>
    </Toast>
  );
}`}
      >
        <View style={{ gap: 12 }}>
          {statuses.map((s) => (
            <Toast key={s} status={s} variant="subtle">
              <ToastTitle>{statusTitles[s]}</ToastTitle>
              <ToastDescription>{statusDescriptions[s]}</ToastDescription>
            </Toast>
          ))}
        </View>
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Toasts come in solid, subtle, and outline variants."
        code={`import { Toast, ToastTitle, ToastDescription } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Toast status="success" variant="solid">
      <ToastTitle>Success</ToastTitle>
      <ToastDescription>This toast uses the solid variant.</ToastDescription>
    </Toast>
  );
}`}
      >
        <View style={{ gap: 12 }}>
          {variants.map((v) => (
            <Toast key={v} status="success" variant={v}>
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>This toast uses the {v} variant.</ToastDescription>
            </Toast>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}
