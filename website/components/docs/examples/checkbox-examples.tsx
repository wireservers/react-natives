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
} from '@wireservers-ui/react-native-ui';

export default function CheckboxExamples() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [groupValues, setGroupValues] = useState<string[]>(['email']);
  const [toppings, setToppings] = useState<string[]>([]);
  const [singleChecked, setSingleChecked] = useState(false);

  return (
    <View className="gap-6">
      <RNText className="text-xl font-bold text-typography-900">
        Checkbox
      </RNText>
      <RNText className="text-sm text-typography-500">
        Checkbox allows users to select one or more options from a set.
        CheckboxGroup manages a collection of checkboxes with shared state.
      </RNText>

      <View className="gap-2">
        <BooleanPicker
          label="isDisabled"
          value={isDisabled}
          onChange={setIsDisabled}
        />
      </View>

      <ExampleSection
        title="Checkbox Group"
        description="A group of checkboxes for selecting notification preferences."
      >
        <View className="gap-2">
          <RNText className="text-sm font-medium text-typography-700 mb-1">
            Notification Channels
          </RNText>
          <CheckboxGroup
            value={groupValues}
            onChange={setGroupValues}
            isDisabled={isDisabled}
          >
            <View className="gap-3">
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
          <RNText className="text-xs text-typography-400 mt-1">
            Selected: {groupValues.length > 0 ? groupValues.join(', ') : 'none'}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Individual Checkbox"
        description="A standalone checkbox for a single boolean option."
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
      >
        <View className="gap-2">
          <RNText className="text-sm font-medium text-typography-700 mb-1">
            Choose Toppings
          </RNText>
          <CheckboxGroup
            value={toppings}
            onChange={setToppings}
            isDisabled={isDisabled}
          >
            <View className="gap-3">
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
          <RNText className="text-xs text-typography-400 mt-1">
            Selected: {toppings.length > 0 ? toppings.join(', ') : 'none'}
          </RNText>
        </View>
      </ExampleSection>
    </View>
  );
}
