import React, { useState } from 'react';
import { View } from 'react-native';
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
} from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function FormControlExamples() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const boolProps = [isDisabled && 'isDisabled', isInvalid && 'isInvalid', isRequired && 'isRequired'].filter(Boolean);
  useExampleCode(`import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelperText } from '@wireservers-ui/react-natives';
import { Input, InputField } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <FormControl${boolProps.map(p => ` ${p}`).join('')}>
      <FormControlLabel>
        <FormControlLabelText>Email</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField placeholder="Enter your email" />
      </Input>
      <FormControlHelperText>
        We will never share your email.
      </FormControlHelperText>
    </FormControl>
  );
}`, [isDisabled, isInvalid, isRequired]);

  return (
    <View style={{ gap: 24 }}>
      {/* Interactive Example */}
      <ExampleSection
        title="Interactive"
        description="Toggle validation states to see how FormControl responds."
      >
        <View style={{ gap: 4 }}>
          <BooleanPicker label="isDisabled" value={isDisabled} onChange={setIsDisabled} />
          <BooleanPicker label="isInvalid" value={isInvalid} onChange={setIsInvalid} />
          <BooleanPicker label="isRequired" value={isRequired} onChange={setIsRequired} />
        </View>

        <View style={{ marginTop: 12, maxWidth: 400 }}>
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
        </View>
      </ExampleSection>

      {/* Error State */}
      <ExampleSection
        title="Error State"
        description="FormControl with isInvalid set to true shows the error message."
        code={`import { FormControl, FormControlLabel, FormControlLabelText, FormControlErrorMessage, Input, InputField } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
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
  );
}`}
      >
        <View style={{ maxWidth: 400 }}>
          <FormControl isInvalid={password.length > 0 && password.length < 8}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="Enter password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </Input>
            <FormControlErrorMessage>
              Password must be at least 8 characters.
            </FormControlErrorMessage>
          </FormControl>
        </View>
      </ExampleSection>

      {/* Disabled State */}
      <ExampleSection
        title="Disabled State"
        description="FormControl with isDisabled prevents user interaction."
        code={`import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelperText, Input, InputField } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
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
  );
}`}
      >
        <View style={{ maxWidth: 400 }}>
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
        </View>
      </ExampleSection>

      {/* With Helper Text */}
      <ExampleSection
        title="With Helper Text"
        description="FormControl with helper text to guide the user."
        code={`import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelperText, Input, InputField } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
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
  );
}`}
      >
        <View style={{ maxWidth: 400 }}>
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
        </View>
      </ExampleSection>
    </View>
  );
}
