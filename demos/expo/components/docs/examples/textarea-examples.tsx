import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Textarea } from '@wireservers-ui/react-natives';
import type { TextareaVariant, TextareaSize } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function TextareaExamples() {
  const [variant, setVariant] = useState<TextareaVariant>('outline');
  const [size, setSize] = useState<TextareaSize>('md');
  const [value, setValue] = useState('');

  useExampleCode(`import { Textarea } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Textarea variant="${variant}" size="${size}"
      placeholder="Write your message..."
    />
  );
}`, [variant, size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Basic Textarea"
        description="A multi-line text input with configurable variant and size."
      >
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
