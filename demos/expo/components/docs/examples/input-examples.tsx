import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Input,
  InputField,
  InputSlot,
} from '@wireservers-ui/react-natives';
import type { InputVariant, InputSize } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function InputExamples() {
  const [variant, setVariant] = useState<InputVariant>('outline');
  const [size, setSize] = useState<InputSize>('md');
  const [text, setText] = useState('');

  useExampleCode(`import { Input, InputField } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Input variant="${variant}" size="${size}">
      <InputField placeholder="Type something..." />
    </Input>
  );
}`, [variant, size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Basic Input"
        description="A simple text input with configurable variant and size."
      >
        <View style={{ gap: 4 }}>
          <VariantPicker
            label="Variant"
            options={['outline', 'filled', 'underlined', 'rounded']}
            value={variant}
            onChange={(v) => setVariant(v as InputVariant)}
          />
          <VariantPicker
            label="Size"
            options={['sm', 'md', 'lg', 'xl']}
            value={size}
            onChange={(v) => setSize(v as InputSize)}
          />
        </View>

        <View style={{ marginTop: 12, maxWidth: 400 }}>
          <Input variant={variant} size={size}>
            <InputField
              placeholder="Type something..."
              value={text}
              onChangeText={setText}
            />
          </Input>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Input with Slots"
        description="Input with leading and trailing slot content."
      >
        <View style={{ maxWidth: 400 }}>
          <Input variant={variant} size={size}>
            <InputSlot style={{ paddingLeft: 12 }}>
              <RNText style={{ color: 'rgb(var(--color-typography-400))' }}>$</RNText>
            </InputSlot>
            <InputField placeholder="0.00" keyboardType="decimal-pad" />
            <InputSlot style={{ paddingRight: 12 }}>
              <RNText style={{ color: 'rgb(var(--color-typography-400))' }}>USD</RNText>
            </InputSlot>
          </Input>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Input with Leading Slot"
        description="Input with a search prefix in the leading slot."
      >
        <View style={{ maxWidth: 400 }}>
          <Input variant={variant} size={size}>
            <InputSlot style={{ paddingLeft: 12 }}>
              <RNText style={{ color: 'rgb(var(--color-typography-400))' }}>@</RNText>
            </InputSlot>
            <InputField placeholder="Search users..." />
          </Input>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Disabled Input"
        description="Input with isDisabled set to true prevents user interaction."
      >
        <View style={{ maxWidth: 400 }}>
          <Input variant={variant} size={size} isDisabled>
            <InputField placeholder="Disabled input" value="Cannot edit this" />
          </Input>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Invalid Input"
        description="Input with isInvalid set to true indicates an error state."
      >
        <View style={{ maxWidth: 400 }}>
          <Input variant={variant} size={size} isInvalid>
            <InputField placeholder="Invalid input" value="bad-email" />
          </Input>
        </View>
      </ExampleSection>
    </View>
  );
}
