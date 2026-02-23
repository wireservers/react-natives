import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorMessage,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Textarea,
  TextareaInput,
  Switch,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
} from "@wireservers-ui/components";

export default function FormControlsScreen() {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [bio, setBio] = useState("");
  const [switchOn, setSwitchOn] = useState(true);
  const [switchOff, setSwitchOff] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState<string[]>(["design"]);
  const [radioValue, setRadioValue] = useState("email");
  const [sliderValue, setSliderValue] = useState(40);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <ScrollView
      className="flex-1 bg-background-0"
      contentContainerClassName="p-6 gap-8 pb-24"
    >
      {/* ── FormControl + Input ── */}
      <Text className="text-2xl font-bold text-typography-900">
        FormControl + Input
      </Text>

      <FormControl className="gap-3">
        <FormControlLabel>
          <FormControlLabelText>Full Name</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Your name as it appears on your profile.
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>

      <FormControl isInvalid={errorName.length === 0} className="gap-3">
        <FormControlLabel>
          <FormControlLabelText>Username (error state)</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Enter username"
            value={errorName}
            onChangeText={setErrorName}
          />
        </Input>
        <FormControlError>
          <FormControlErrorMessage>
            Username is required.
          </FormControlErrorMessage>
        </FormControlError>
      </FormControl>

      {/* ── Input Variants ── */}
      <Text className="text-2xl font-bold text-typography-900">
        Input Variants
      </Text>

      <Input variant="outline" className="gap-3">
        <InputField placeholder="Outline variant" />
      </Input>

      <Input variant="filled" className="gap-3">
        <InputField placeholder="Filled variant" />
      </Input>

      <Input variant="underlined" className="gap-3">
        <InputField placeholder="Underlined variant" />
      </Input>

      <Input variant="rounded" className="gap-3">
        <InputField placeholder="Rounded variant" />
      </Input>

      <Input variant="outline">
        <InputSlot className="pl-3">
          <InputIcon name="search" />
        </InputSlot>
        <InputField placeholder="With icon slot" />
      </Input>

      {/* ── Textarea ── */}
      <Text className="text-2xl font-bold text-typography-900">Textarea</Text>

      <FormControl className="gap-3">
        <FormControlLabel>
          <FormControlLabelText>Bio</FormControlLabelText>
        </FormControlLabel>
        <Textarea>
          <TextareaInput
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={setBio}
          />
        </Textarea>
        <FormControlHelper>
          <FormControlHelperText>
            Write a short description about yourself.
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>

      {/* ── Switch ── */}
      <Text className="text-2xl font-bold text-typography-900">Switch</Text>

      <FormControl className="flex-row items-center justify-between gap-3">
        <FormControlLabel>
          <FormControlLabelText>Notifications</FormControlLabelText>
        </FormControlLabel>
        <Switch value={switchOn} onToggle={setSwitchOn} />
      </FormControl>

      <FormControl className="flex-row items-center justify-between gap-3">
        <FormControlLabel>
          <FormControlLabelText>Dark Mode</FormControlLabelText>
        </FormControlLabel>
        <Switch value={switchOff} onToggle={setSwitchOff} />
      </FormControl>

      {/* ── Checkbox ── */}
      <Text className="text-2xl font-bold text-typography-900">Checkbox</Text>

      <CheckboxGroup value={checkboxValues} onChange={setCheckboxValues}>
        <Checkbox value="design" className="gap-3">
          <CheckboxIndicator>
            <CheckboxIcon />
          </CheckboxIndicator>
          <CheckboxLabel>Design</CheckboxLabel>
        </Checkbox>

        <Checkbox value="development" className="gap-3">
          <CheckboxIndicator>
            <CheckboxIcon />
          </CheckboxIndicator>
          <CheckboxLabel>Development</CheckboxLabel>
        </Checkbox>

        <Checkbox value="marketing" className="gap-3">
          <CheckboxIndicator>
            <CheckboxIcon />
          </CheckboxIndicator>
          <CheckboxLabel>Marketing</CheckboxLabel>
        </Checkbox>
      </CheckboxGroup>

      {/* ── Radio ── */}
      <Text className="text-2xl font-bold text-typography-900">Radio</Text>

      <RadioGroup value={radioValue} onChange={setRadioValue}>
        <Radio value="email" className="gap-3">
          <RadioIndicator>
            <RadioIcon />
          </RadioIndicator>
          <RadioLabel>Email</RadioLabel>
        </Radio>

        <Radio value="sms" className="gap-3">
          <RadioIndicator>
            <RadioIcon />
          </RadioIndicator>
          <RadioLabel>SMS</RadioLabel>
        </Radio>

        <Radio value="push" className="gap-3">
          <RadioIndicator>
            <RadioIcon />
          </RadioIndicator>
          <RadioLabel>Push Notification</RadioLabel>
        </Radio>
      </RadioGroup>

      {/* ── Slider ── */}
      <Text className="text-2xl font-bold text-typography-900">Slider</Text>

      <Text className="text-sm text-typography-500">
        Volume: {sliderValue}%
      </Text>
      <Slider
        value={sliderValue}
        onChange={setSliderValue}
        minValue={0}
        maxValue={100}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      {/* ── Select ── */}
      <Text className="text-2xl font-bold text-typography-900">Select</Text>

      <Select
        selectedValue={selectedOption}
        onValueChange={setSelectedOption}
      >
        <SelectTrigger>
          <SelectInput placeholder="Choose a framework" />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem label="React Native" value="react-native" />
            <SelectItem label="Flutter" value="flutter" />
            <SelectItem label="SwiftUI" value="swiftui" />
            <SelectItem label="Jetpack Compose" value="jetpack-compose" />
          </SelectContent>
        </SelectPortal>
      </Select>
    </ScrollView>
  );
}
