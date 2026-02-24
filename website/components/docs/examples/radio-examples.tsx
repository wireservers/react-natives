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
} from '@wireservers-ui/react-native-ui';

export default function RadioExamples() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [plan, setPlan] = useState('monthly');
  const [shipping, setShipping] = useState('standard');
  const [theme, setTheme] = useState('system');

  return (
    <View className="gap-6">
      <RNText className="text-xl font-bold text-typography-900">Radio</RNText>
      <RNText className="text-sm text-typography-500">
        Radio buttons allow users to select a single option from a set.
        RadioGroup manages the selection state across multiple Radio components.
      </RNText>

      <View className="gap-2">
        <BooleanPicker
          label="isDisabled"
          value={isDisabled}
          onChange={setIsDisabled}
        />
      </View>

      <ExampleSection
        title="Basic Radio Group"
        description="Select a subscription plan."
      >
        <View className="gap-2">
          <RNText className="text-sm font-medium text-typography-700 mb-1">
            Subscription Plan
          </RNText>
          <RadioGroup
            value={plan}
            onChange={setPlan}
            isDisabled={isDisabled}
          >
            <View className="gap-3">
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
          <RNText className="text-xs text-typography-400 mt-1">
            Selected: {plan}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Shipping Options"
        description="Radio group for selecting a shipping method."
      >
        <View className="gap-2">
          <RNText className="text-sm font-medium text-typography-700 mb-1">
            Shipping Method
          </RNText>
          <RadioGroup
            value={shipping}
            onChange={setShipping}
            isDisabled={isDisabled}
          >
            <View className="gap-3">
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
          <RNText className="text-xs text-typography-400 mt-1">
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
          <View className="gap-3">
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
