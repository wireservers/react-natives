import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BRAND_COLOR } from '@/constants/brand';
import { useTheme } from '@/context/theme-context';
import { useAuth } from '@/lib/auth-context';

export default function LoginScreen() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const { isAuthenticated, isConfigured, signIn } = useAuth();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (isAuthenticated) {
      router.replace((redirect || '/') as any);
    }
  }, [isAuthenticated, redirect, router]);

  const bg = isDark ? '#0f0f0f' : '#F8FAFC';
  const cardBg = isDark ? '#1f1f1f' : '#fff';
  const cardBorder = isDark ? '#3A3A3A' : '#E2E8F0';
  const textColor = isDark ? '#E5E7EB' : '#111827';
  const subText = isDark ? '#9CA3AF' : '#6B7280';

  return (
    <View style={{ flex: 1, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <View
        style={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: cardBg,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: cardBorder,
          padding: 32,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '700', color: textColor, marginBottom: 8 }}>
          Sign in
        </Text>
        <Text style={{ fontSize: 14, color: subText, marginBottom: 24, lineHeight: 20 }}>
          Use your Wireservers account to continue.
        </Text>

        {!isConfigured && (
          <View
            style={{
              padding: 12,
              borderRadius: 6,
              backgroundColor: isDark ? '#3a2418' : '#FEF3C7',
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 12, color: isDark ? '#FCD34D' : '#92400E' }}>
              Auth is not configured. Set EXPO_PUBLIC_MSAL_CLIENT_ID in .env.
            </Text>
          </View>
        )}

        <Pressable
          onPress={signIn}
          disabled={!isConfigured}
          style={{
            backgroundColor: isConfigured ? BRAND_COLOR : '#9CA3AF',
            paddingVertical: 12,
            borderRadius: 6,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
            Sign in with Microsoft
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
