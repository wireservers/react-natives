import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import { Switch } from '@wireservers-ui/react-native-ui';
import type { SwitchSize } from '@wireservers-ui/react-native-ui';

export default function SwitchExamples() {
  const [size, setSize] = useState<SwitchSize>('md');
  const [isDisabled, setIsDisabled] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <View className="gap-6">
      <RNText className="text-xl font-bold text-typography-900">Switch</RNText>
      <RNText className="text-sm text-typography-500">
        Switch is a toggle control for boolean states. It supports size variants
        and disabled state.
      </RNText>

      <View className="gap-2">
        <VariantPicker
          label="Size"
          options={['sm', 'md', 'lg']}
          value={size}
          onChange={(v) => setSize(v as SwitchSize)}
        />
        <BooleanPicker
          label="isDisabled"
          value={isDisabled}
          onChange={setIsDisabled}
        />
      </View>

      <ExampleSection
        title="Basic Switch"
        description="A simple toggle switch with on/off state."
      >
        <View className="flex-row items-center gap-3">
          <Switch
            size={size}
            isDisabled={isDisabled}
            value={notifications}
            onToggle={setNotifications}
          />
          <RNText className="text-sm text-typography-700">
            Notifications {notifications ? 'On' : 'Off'}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Multiple Switches"
        description="A group of switches for different settings."
      >
        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <RNText className="text-sm text-typography-700">Dark Mode</RNText>
            <Switch
              size={size}
              isDisabled={isDisabled}
              value={darkMode}
              onToggle={setDarkMode}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <RNText className="text-sm text-typography-700">
              Notifications
            </RNText>
            <Switch
              size={size}
              isDisabled={isDisabled}
              value={notifications}
              onToggle={setNotifications}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <RNText className="text-sm text-typography-700">Auto-Save</RNText>
            <Switch
              size={size}
              isDisabled={isDisabled}
              value={autoSave}
              onToggle={setAutoSave}
            />
          </View>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Disabled Switch"
        description="Switch with isDisabled prevents user interaction."
      >
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <Switch size={size} isDisabled value={true} />
            <RNText className="text-sm text-typography-400">
              Disabled (On)
            </RNText>
          </View>
          <View className="flex-row items-center gap-3">
            <Switch size={size} isDisabled value={false} />
            <RNText className="text-sm text-typography-400">
              Disabled (Off)
            </RNText>
          </View>
        </View>
      </ExampleSection>
    </View>
  );
}
