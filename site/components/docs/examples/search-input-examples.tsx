import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { SearchInput, SearchInputField, SearchInputIcon, SearchInputClearButton } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function SearchInputExamples() {
  const [size, setSize] = useState<string>('md');
  const [query, setQuery] = useState('');

  useExampleCode(`import { SearchInput, SearchInputField, SearchInputIcon, SearchInputClearButton } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <SearchInput size="${size}">
      <SearchInputIcon />
      <SearchInputField placeholder="Search..." />
      <SearchInputClearButton />
    </SearchInput>
  );
}`, [size]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="A search input with clear button.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, maxWidth: 320 }}>
          <SearchInput size={size as any}>
            <SearchInputIcon />
            <SearchInputField placeholder="Search..." />
            <SearchInputClearButton />
          </SearchInput>
        </View>
      </ExampleSection>
    </View>
  );
}
