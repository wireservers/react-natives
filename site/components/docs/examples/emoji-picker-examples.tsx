import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { EmojiPicker, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function EmojiPickerExamples() {
  const [emoji, setEmoji] = React.useState('💡');

  useExampleCode(`import { EmojiPicker } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <EmojiPicker
      label="Icon"
      value="💡"
      options={['💡', '🏠', '🚗', '🍽️']}
      onChange={() => {}}
    />
  );
}`);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Emoji Grid" description="Select or clear a compact emoji icon.">
        <EmojiPicker
          label="Category icon"
          value={emoji}
          options={['💡', '🏠', '🚗', '🍽️', '🛒', '💳', '✈️', '🎁']}
          onChange={setEmoji}
        />
        <Text size="sm" className="text-typography-500">
          Selected: {emoji || 'none'}
        </Text>
      </ExampleSection>
    </View>
  );
}
