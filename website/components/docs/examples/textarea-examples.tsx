import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Textarea } from '@wireservers-ui/react-native-ui';
import type { TextareaVariant, TextareaSize } from '@wireservers-ui/react-native-ui';

export default function TextareaExamples() {
  const [variant, setVariant] = useState<TextareaVariant>('outline');
  const [size, setSize] = useState<TextareaSize>('md');
  const [value, setValue] = useState('');

  return (
    <View className="gap-6">
      <RNText className="text-xl font-bold text-typography-900">
        Textarea
      </RNText>
      <RNText className="text-sm text-typography-500">
        Textarea is a single component for multi-line text input. It accepts all
        TextInput props directly.
      </RNText>

      <View className="gap-2">
        <VariantPicker
          label="Variant"
          options={['outline', 'filled', 'underlined']}
          value={variant}
          onChange={(v) => setVariant(v as TextareaVariant)}
        />
        <VariantPicker
          label="Size"
          options={['sm', 'md', 'lg']}
          value={size}
          onChange={(v) => setSize(v as TextareaSize)}
        />
      </View>

      <ExampleSection
        title="Basic Textarea"
        description="A multi-line text input with configurable variant and size."
      >
        <Textarea
          variant={variant}
          size={size}
          placeholder="Type your message here..."
          value={value}
          onChangeText={setValue}
        />
      </ExampleSection>

      <ExampleSection
        title="Textarea with Default Value"
        description="Textarea pre-filled with content."
      >
        <Textarea
          variant={variant}
          size={size}
          placeholder="Write a bio..."
          value="I am a software developer with a passion for building great user experiences."
          multiline
          numberOfLines={4}
        />
      </ExampleSection>

      <ExampleSection
        title="Disabled Textarea"
        description="Textarea with isDisabled prevents user interaction."
      >
        <Textarea
          variant={variant}
          size={size}
          isDisabled
          placeholder="Disabled textarea"
          value="This content cannot be edited."
        />
      </ExampleSection>

      <ExampleSection
        title="Invalid Textarea"
        description="Textarea with isInvalid indicates a validation error."
      >
        <Textarea
          variant={variant}
          size={size}
          isInvalid
          placeholder="Required field"
          value=""
        />
      </ExampleSection>
    </View>
  );
}
