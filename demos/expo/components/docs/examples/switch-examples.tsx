import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker, BooleanPicker } from '../variant-picker';
import { Switch } from '@wireservers-ui/react-natives';
import type { SwitchSize } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function SwitchExamples() {
  const [size, setSize] = useState<SwitchSize>('md');
  const [isDisabled, setIsDisabled] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  useExampleCode(`import { Switch } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default function Example() {
  const [value, setValue] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Switch
        value={value}
        onToggle={setValue}
        size="${size}"${isDisabled ? '\n        isDisabled' : ''}
      />
      <Text style={{ fontSize: 14, color: '#374151' }}>
        Notifications {value ? 'On' : 'Off'}
      </Text>
    </View>
  );
}`, [size, isDisabled]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Basic Switch"
        description="A simple toggle switch with on/off state."
      >
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <Switch
            size={size}
            isDisabled={isDisabled}
            value={notifications}
            onToggle={setNotifications}
          />
          <RNText style={{ fontSize: 14, color: '#374151' }}>
            Notifications {notifications ? 'On' : 'Off'}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Multiple Switches"
        description="A group of switches for different settings."
        code={`import { Switch } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default function Example() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>Dark Mode</Text>
        <Switch value={darkMode} onToggle={setDarkMode} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>Notifications</Text>
        <Switch value={notifications} onToggle={setNotifications} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>Auto-Save</Text>
        <Switch value={autoSave} onToggle={setAutoSave} />
      </View>
    </View>
  );
}`}
      >
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 14, color: '#374151' }}>Dark Mode</RNText>
            <Switch
              size={size}
              isDisabled={isDisabled}
              value={darkMode}
              onToggle={setDarkMode}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 14, color: '#374151' }}>
              Notifications
            </RNText>
            <Switch
              size={size}
              isDisabled={isDisabled}
              value={notifications}
              onToggle={setNotifications}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <RNText style={{ fontSize: 14, color: '#374151' }}>Auto-Save</RNText>
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
        code={`import { Switch } from '@wireservers-ui/react-natives';
import { View, Text } from 'react-native';

export default function Example() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Switch isDisabled value={true} />
        <Text>Disabled (On)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Switch isDisabled value={false} />
        <Text>Disabled (Off)</Text>
      </View>
    </View>
  );
}`}
      >
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Switch size={size} isDisabled value={true} />
            <RNText style={{ fontSize: 14, color: '#999' }}>
              Disabled (On)
            </RNText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Switch size={size} isDisabled value={false} />
            <RNText style={{ fontSize: 14, color: '#999' }}>
              Disabled (Off)
            </RNText>
          </View>
        </View>
      </ExampleSection>
    </View>
  );
}
