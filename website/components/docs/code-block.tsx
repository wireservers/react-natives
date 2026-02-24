import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View className="rounded-2xl bg-background-950 overflow-hidden">
      <View className="flex-row justify-between items-center px-4 py-2.5 border-b border-outline-800">
        <Text className="text-xs text-typography-400 font-medium">Code</Text>
        <Pressable onPress={handleCopy}>
          <Text style={{ color: copied ? '#34D399' : '#818CF8', fontSize: 12, fontWeight: '600' }}>
            {copied ? 'Copied!' : 'Copy'}
          </Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text
          className="text-sm text-typography-100 p-4 leading-5"
          style={{ fontFamily: 'monospace' }}
        >
          {code}
        </Text>
      </ScrollView>
    </View>
  );
}
