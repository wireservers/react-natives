import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
} from '@wireservers-ui/react-natives';
import type { SelectVariant } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function SelectExamples() {
  const [variant, setVariant] = useState<SelectVariant>('outline');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [priority, setPriority] = useState('');

  useExampleCode(`import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Select variant="${variant}">
      <SelectTrigger>
        <SelectInput placeholder="Select a country" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectItem label="United States" value="us" />
          <SelectItem label="United Kingdom" value="uk" />
          <SelectItem label="Canada" value="ca" />
          <SelectItem label="Australia" value="au" />
          <SelectItem label="Germany" value="de" />
          <SelectItem label="France" value="fr" />
          <SelectItem label="Japan" value="jp" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}`, [variant]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Basic Select"
        description="A dropdown for selecting a country."
      >
        <VariantPicker
          label="Variant"
          options={['outline', 'filled', 'underlined', 'rounded']}
          value={variant}
          onChange={(v) => setVariant(v as SelectVariant)}
        />
        <View style={{ gap: 8, marginTop: 8 }}>
          <Select
            selectedValue={country}
            onValueChange={setCountry}
            variant={variant}
          >
            <SelectTrigger>
              <SelectInput placeholder="Select a country" />
              <SelectIcon />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectItem label="United States" value="us" />
                <SelectItem label="United Kingdom" value="uk" />
                <SelectItem label="Canada" value="ca" />
                <SelectItem label="Australia" value="au" />
                <SelectItem label="Germany" value="de" />
                <SelectItem label="France" value="fr" />
                <SelectItem label="Japan" value="jp" />
              </SelectContent>
            </SelectPortal>
          </Select>
          {country ? (
            <RNText style={{ fontSize: 12, color: '#999' }}>
              Selected: {country}
            </RNText>
          ) : null}
        </View>
      </ExampleSection>

      <ExampleSection
        title="Language Select"
        description="Select with a pre-defined set of language options."
      >
        <Select
          selectedValue={language}
          onValueChange={setLanguage}
          variant={variant}
        >
          <SelectTrigger>
            <SelectInput placeholder="Choose a language" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="English" value="en" />
              <SelectItem label="Spanish" value="es" />
              <SelectItem label="French" value="fr" />
              <SelectItem label="German" value="de" />
              <SelectItem label="Portuguese" value="pt" />
              <SelectItem label="Chinese" value="zh" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </ExampleSection>

      <ExampleSection
        title="Select with Disabled Items"
        description="Some options in the select are disabled."
      >
        <Select
          selectedValue={priority}
          onValueChange={setPriority}
          variant={variant}
        >
          <SelectTrigger>
            <SelectInput placeholder="Set priority" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="Low" value="low" />
              <SelectItem label="Medium" value="medium" />
              <SelectItem label="High" value="high" />
              <SelectItem label="Critical" value="critical" isDisabled />
            </SelectContent>
          </SelectPortal>
        </Select>
      </ExampleSection>

      <ExampleSection
        title="Disabled Select"
        description="Select with isDisabled prevents the dropdown from opening."
      >
        <Select
          selectedValue="us"
          variant={variant}
          isDisabled
        >
          <SelectTrigger>
            <SelectInput placeholder="Cannot change" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="United States" value="us" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </ExampleSection>
    </View>
  );
}
