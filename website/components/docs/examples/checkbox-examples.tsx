import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { BooleanPicker } from '../variant-picker';
import {
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function CheckboxExamples() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [groupValues, setGroupValues] = useState<string[]>(['email']);
  const [toppings, setToppings] = useState<string[]>([]);
  const [singleChecked, setSingleChecked] = useState(false);

  useExampleCode(`import { CheckboxGroup, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [selected, setSelected] = useState(['email']);

  return (
    <CheckboxGroup value={selected} onChange={setSelected}${isDisabled ? ' isDisabled' : ''}>
      <Checkbox value="email">
        <CheckboxIndicator><CheckboxIcon /></CheckboxIndicator>
        <CheckboxLabel>Email</CheckboxLabel>
      </Checkbox>
      <Checkbox value="sms">
        <CheckboxIndicator><CheckboxIcon /></CheckboxIndicator>
        <CheckboxLabel>SMS</CheckboxLabel>
      </Checkbox>
    </CheckboxGroup>
  );
}`, [isDisabled]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Checkbox Group"
        description="A group of checkboxes for selecting notification preferences."
      >
        <BooleanPicker
          label="isDisabled"
          value={isDisabled}
          onChange={setIsDisabled}
        />

        <View style={{ gap: 8 }}>
          <RNText style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 4 }}>
            Notification Channels
          </RNText>
          <CheckboxGroup
            value={groupValues}
            onChange={setGroupValues}
            isDisabled={isDisabled}
          >
            <View style={{ gap: 12 }}>
              <Checkbox value="email">
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>Email</CheckboxLabel>
              </Checkbox>
              <Checkbox value="sms">
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>SMS</CheckboxLabel>
              </Checkbox>
              <Checkbox value="push">
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>Push Notifications</CheckboxLabel>
              </Checkbox>
            </View>
          </CheckboxGroup>
          <RNText style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
            Selected: {groupValues.length > 0 ? groupValues.join(', ') : 'none'}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Individual Checkbox"
        description="A standalone checkbox for a single boolean option."
        code={`import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox value="terms" isChecked={checked} onChange={setChecked}>
      <CheckboxIndicator>
        <CheckboxIcon />
      </CheckboxIndicator>
      <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
    </Checkbox>
  );
}`}
      >
        <Checkbox
          value="terms"
          isChecked={singleChecked}
          onChange={setSingleChecked}
          isDisabled={isDisabled}
        >
          <CheckboxIndicator>
            <CheckboxIcon />
          </CheckboxIndicator>
          <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
        </Checkbox>
      </ExampleSection>

      <ExampleSection
        title="Multi-Select Group"
        description="Checkbox group for selecting pizza toppings."
        code={`import { CheckboxGroup, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [toppings, setToppings] = useState([]);

  return (
    <CheckboxGroup value={toppings} onChange={setToppings}>
      <Checkbox value="pepperoni">
        <CheckboxIndicator><CheckboxIcon /></CheckboxIndicator>
        <CheckboxLabel>Pepperoni</CheckboxLabel>
      </Checkbox>
      <Checkbox value="mushrooms">
        <CheckboxIndicator><CheckboxIcon /></CheckboxIndicator>
        <CheckboxLabel>Mushrooms</CheckboxLabel>
      </Checkbox>
      <Checkbox value="olives">
        <CheckboxIndicator><CheckboxIcon /></CheckboxIndicator>
        <CheckboxLabel>Olives</CheckboxLabel>
      </Checkbox>
    </CheckboxGroup>
  );
}`}
      >
        <View style={{ gap: 8 }}>
          <RNText style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 4 }}>
            Choose Toppings
          </RNText>
          <CheckboxGroup
            value={toppings}
            onChange={setToppings}
            isDisabled={isDisabled}
          >
            <View style={{ gap: 12 }}>
              <Checkbox value="pepperoni">
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>Pepperoni</CheckboxLabel>
              </Checkbox>
              <Checkbox value="mushrooms">
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>Mushrooms</CheckboxLabel>
              </Checkbox>
              <Checkbox value="olives">
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>Olives</CheckboxLabel>
              </Checkbox>
              <Checkbox value="onions">
                <CheckboxIndicator>
                  <CheckboxIcon />
                </CheckboxIndicator>
                <CheckboxLabel>Onions</CheckboxLabel>
              </Checkbox>
            </View>
          </CheckboxGroup>
          <RNText style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
            Selected: {toppings.length > 0 ? toppings.join(', ') : 'none'}
          </RNText>
        </View>
      </ExampleSection>
    </View>
  );
}
