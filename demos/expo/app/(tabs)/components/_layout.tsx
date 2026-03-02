import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Platform, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Sidebar } from '@/components/docs/sidebar';
import { BRAND_COLOR } from '@wireservers-ui/react-natives';
import { DOC_BG } from '@/constants/theme';

const WIDE_BREAKPOINT = 768;
const HEADER_HEIGHT = 75; // 72px header + 3px gradient bar

export default function DocsLayout() {
  const { width, height: windowHeight } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close drawer when resizing to wide
  useEffect(() => {
    if (isWide) setSidebarOpen(false);
  }, [isWide]);

  const hamburgerHeight = isWide ? 0 : 44;
  // On web, explicitly constrain the stack height to prevent ScrollView from
  // expanding to content size (which breaks scrolling). This bypasses any
  // intermediate flex containers that don't properly constrain height.
  const stackHeight =
    Platform.OS === 'web' && windowHeight > 0
      ? windowHeight - HEADER_HEIGHT - hamburgerHeight
      : undefined;

  return (
    <View style={{ flex: 1, backgroundColor: DOC_BG }}>
      <View style={{ flex: 1, width: '100%', maxWidth: 1504, alignSelf: 'center', flexDirection: 'row' }}>
        {/* Sidebar — always visible on wide screens */}
        {isWide && <Sidebar />}

        {/* Main content */}
        <View style={{ flex: 1 }}>
          {/* Hamburger bar — narrow screens only */}
          {!isWide && (
            <View
              style={{
                height: 44,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#E5E7EB',
                backgroundColor: '#fff',
              }}
            >
              <Pressable
                onPress={() => setSidebarOpen((prev) => !prev)}
                style={{ padding: 4 }}
              >
                <MaterialCommunityIcons
                  name={sidebarOpen ? 'close' : 'menu'}
                  size={22}
                  color="#374151"
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginLeft: 12,
                }}
              >
                Components
              </Text>
            </View>
          )}

          <View
            style={
              stackHeight != null
                ? { height: stackHeight }
                : { flex: 1 }
            }
          >
            <Stack
              screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: BRAND_COLOR,
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="[slug]" options={{ title: '' }} />
            </Stack>
          </View>
        </View>
      </View>

      {/* Overlay sidebar drawer — narrow screens only */}
      {!isWide && sidebarOpen && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flexDirection: 'row',
            zIndex: 50,
          }}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
            onPress={() => setSidebarOpen(false)}
          />
        </View>
      )}
    </View>
  );
}
