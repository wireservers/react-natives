import { Stack } from 'expo-router';
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Sidebar } from '@/components/docs/sidebar';

const WIDE_BREAKPOINT = 768;

export default function DocsLayout() {
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {/* Sidebar — visible on wide screens */}
      {isWide && <Sidebar />}

      {/* Main content */}
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#4F46E5',
            headerBackTitle: 'Back',
            headerShadowVisible: false,
            headerShown: !isWide,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="[slug]"
            options={{
              title: '',
            }}
          />
        </Stack>
      </View>
    </View>
  );
}
