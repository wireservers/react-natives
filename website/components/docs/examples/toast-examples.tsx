import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Toast,
  ToastTitle,
  ToastDescription,
} from '@wireservers-ui/react-native-ui';

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

export default function ToastExamples() {
  const [status, setStatus] = useState<string>('success');
  const [variant, setVariant] = useState<string>('solid');

  return (
    <View className="gap-6">
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Pick a status and variant to preview the Toast component. These are rendered statically for demonstration."
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

        <View className="mt-2">
          <Toast status={status as any} variant={variant as any}>
            <ToastTitle>{statusTitles[status]}</ToastTitle>
            <ToastDescription>{statusDescriptions[status]}</ToastDescription>
          </Toast>
        </View>
      </ExampleSection>

      {/* All Statuses */}
      <ExampleSection
        title="Statuses"
        description="Toast supports info, success, warning, and error statuses."
      >
        <View className="gap-3">
          {statuses.map((s) => (
            <Toast key={s} status={s} variant="subtle">
              <ToastTitle>{statusTitles[s]}</ToastTitle>
              <ToastDescription>{statusDescriptions[s]}</ToastDescription>
            </Toast>
          ))}
        </View>
      </ExampleSection>

      {/* All Variants */}
      <ExampleSection
        title="Variants"
        description="Toasts come in solid, subtle, and outline variants."
      >
        <View className="gap-3">
          {variants.map((v) => (
            <Toast key={v} status="success" variant={v}>
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>
                This toast uses the {v} variant.
              </ToastDescription>
            </Toast>
          ))}
        </View>
      </ExampleSection>
    </View>
  );
}
