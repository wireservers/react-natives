import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { BooleanPicker } from '../variant-picker';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelperText,
  FormControlErrorMessage,
  Input,
  InputField,
} from '@wireservers-ui/react-native-ui';

export default function FormControlExamples() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <View className="gap-6">
      <RNText className="text-xl font-bold text-typography-900">
        FormControl
      </RNText>
      <RNText className="text-sm text-typography-500">
        FormControl provides context for form fields including validation states,
        labels, helper text, and error messages.
      </RNText>

      <View className="gap-2">
        <BooleanPicker
          label="isDisabled"
          value={isDisabled}
          onChange={setIsDisabled}
        />
        <BooleanPicker
          label="isInvalid"
          value={isInvalid}
          onChange={setIsInvalid}
        />
        <BooleanPicker
          label="isRequired"
          value={isRequired}
          onChange={setIsRequired}
        />
      </View>

      <ExampleSection
        title="Basic FormControl"
        description="A form field with label, input, helper text, and error message."
      >
        <FormControl
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isRequired={isRequired}
        >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </Input>
          <FormControlHelperText>
            We will never share your email.
          </FormControlHelperText>
          <FormControlErrorMessage>
            Email is required.
          </FormControlErrorMessage>
        </FormControl>
      </ExampleSection>

      <ExampleSection
        title="Error State"
        description="FormControl with isInvalid set to true shows the error message."
      >
        <FormControl isInvalid>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="Enter password" secureTextEntry />
          </Input>
          <FormControlErrorMessage>
            Password must be at least 8 characters.
          </FormControlErrorMessage>
        </FormControl>
      </ExampleSection>

      <ExampleSection
        title="Disabled State"
        description="FormControl with isDisabled prevents user interaction."
      >
        <FormControl isDisabled>
          <FormControlLabel>
            <FormControlLabelText>Username</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="Cannot edit" value="johndoe" />
          </Input>
          <FormControlHelperText>
            Contact support to change your username.
          </FormControlHelperText>
        </FormControl>
      </ExampleSection>

      <ExampleSection
        title="With Helper Text"
        description="FormControl with helper text to guide the user."
      >
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText>Display Name</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="Choose a display name" />
          </Input>
          <FormControlHelperText>
            This name will be visible to other users.
          </FormControlHelperText>
        </FormControl>
      </ExampleSection>
    </View>
  );
}
