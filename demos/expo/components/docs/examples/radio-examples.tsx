import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { BooleanPicker } from '../variant-picker';
import {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function RadioExamples() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [plan, setPlan] = useState('monthly');
  const [shipping, setShipping] = useState('standard');
  const [theme, setTheme] = useState('system');

  useExampleCode(`import { RadioGroup, Radio, RadioIndicator, RadioIcon, RadioLabel } from '@wireservers-ui/react-natives';
import { useState } from 'react';

export default function Example() {
  const [value, setValue] = useState('option1');

  return (
    <RadioGroup value={value} onChange={setValue}${isDisabled ? ' isDisabled' : ''}>
      <Radio value="option1">
        <RadioIndicator><RadioIcon /></RadioIndicator>
        <RadioLabel>Option 1</RadioLabel>
      </Radio>
      <Radio value="option2">
        <RadioIndicator><RadioIcon /></RadioIndicator>
        <RadioLabel>Option 2</RadioLabel>
      </Radio>
    </RadioGroup>
  );
}`, [isDisabled]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Basic Radio Group"
        description="Select a subscription plan."
      >
        <BooleanPicker
          label="isDisabled"
          value={isDisabled}
          onChange={setIsDisabled}
        />
        <View style={{ gap: 8 }}>
          <RNText style={{ fontSize: 14, fontWeight: '500', color: '#404040', marginBottom: 4 }}>
            Subscription Plan
          </RNText>
          <RadioGroup
            value={plan}
            onChange={setPlan}
            isDisabled={isDisabled}
          >
            <View style={{ gap: 12 }}>
              <Radio value="monthly">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Monthly - $9.99/mo</RadioLabel>
              </Radio>
              <Radio value="yearly">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Yearly - $99.99/yr</RadioLabel>
              </Radio>
              <Radio value="lifetime">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Lifetime - $299.99</RadioLabel>
              </Radio>
            </View>
          </RadioGroup>
          <RNText style={{ fontSize: 12, color: '#a3a3a3', marginTop: 4 }}>
            Selected: {plan}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Shipping Options"
        description="Radio group for selecting a shipping method."
      >
        <View style={{ gap: 8 }}>
          <RNText style={{ fontSize: 14, fontWeight: '500', color: '#404040', marginBottom: 4 }}>
            Shipping Method
          </RNText>
          <RadioGroup
            value={shipping}
            onChange={setShipping}
            isDisabled={isDisabled}
          >
            <View style={{ gap: 12 }}>
              <Radio value="standard">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Standard (5-7 days)</RadioLabel>
              </Radio>
              <Radio value="express">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Express (2-3 days)</RadioLabel>
              </Radio>
              <Radio value="overnight">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Overnight (1 day)</RadioLabel>
              </Radio>
            </View>
          </RadioGroup>
          <RNText style={{ fontSize: 12, color: '#a3a3a3', marginTop: 4 }}>
            Selected: {shipping}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Theme Selection"
        description="Radio group for selecting a UI theme preference."
      >
        <RadioGroup
          value={theme}
          onChange={setTheme}
          isDisabled={isDisabled}
        >
          <View style={{ gap: 12 }}>
            <Radio value="light">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Light</RadioLabel>
            </Radio>
            <Radio value="dark">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Dark</RadioLabel>
            </Radio>
            <Radio value="system">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>System Default</RadioLabel>
            </Radio>
          </View>
        </RadioGroup>
      </ExampleSection>
    </View>
  );
}
