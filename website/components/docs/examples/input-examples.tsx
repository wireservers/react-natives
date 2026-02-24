import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Input,
  InputField,
  InputSlot,
} from '@wireservers-ui/react-native-ui';
import type { InputVariant, InputSize } from '@wireservers-ui/react-native-ui';

export default function InputExamples() {
  const [variant, setVariant] = useState<InputVariant>('outline');
  const [size, setSize] = useState<InputSize>('md');
  const [text, setText] = useState('');

  return (
    <View className="gap-6">
      <RNText className="text-xl font-bold text-typography-900">Input</RNText>
      <RNText className="text-sm text-typography-500">
        Input is a compound component for text entry with support for variants,
        sizes, and slots for leading/trailing content.
      </RNText>

      <View className="gap-2">
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

      <ExampleSection
        title="Basic Input"
        description="A simple text input with configurable variant and size."
      >
        <Input variant={variant} size={size}>
          <InputField
            placeholder="Type something..."
            value={text}
            onChangeText={setText}
          />
        </Input>
      </ExampleSection>

      <ExampleSection
        title="Input with Slots"
        description="Input with leading and trailing slot content."
      >
        <Input variant={variant} size={size}>
          <InputSlot className="pl-3">
            <RNText className="text-typography-400">$</RNText>
          </InputSlot>
          <InputField placeholder="0.00" keyboardType="decimal-pad" />
          <InputSlot className="pr-3">
            <RNText className="text-typography-400">USD</RNText>
          </InputSlot>
        </Input>
      </ExampleSection>

      <ExampleSection
        title="Input with Leading Slot"
        description="Input with a search prefix in the leading slot."
      >
        <Input variant={variant} size={size}>
          <InputSlot className="pl-3">
            <RNText className="text-typography-400">@</RNText>
          </InputSlot>
          <InputField placeholder="Search users..." />
        </Input>
      </ExampleSection>

      <ExampleSection
        title="Disabled Input"
        description="Input with isDisabled set to true prevents user interaction."
      >
        <Input variant={variant} size={size} isDisabled>
          <InputField placeholder="Disabled input" value="Cannot edit this" />
        </Input>
      </ExampleSection>

      <ExampleSection
        title="Invalid Input"
        description="Input with isInvalid set to true indicates an error state."
      >
        <Input variant={variant} size={size} isInvalid>
          <InputField placeholder="Invalid input" value="bad-email" />
        </Input>
      </ExampleSection>
    </View>
  );
}
