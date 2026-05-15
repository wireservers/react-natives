import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/theme-context';
import { useAuth } from '@/lib/auth-context';

export default function AccountScreen() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const { user, isAuthenticated, isLoading } = useAuth();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login?redirect=/account' as any);
    }
  }, [isAuthenticated, isLoading, router]);

  const bg = isDark ? '#0f0f0f' : '#F8FAFC';
  const cardBg = isDark ? '#1f1f1f' : '#fff';
  const cardBorder = isDark ? '#3A3A3A' : '#E2E8F0';
  const textColor = isDark ? '#E5E7EB' : '#111827';
  const subText = isDark ? '#9CA3AF' : '#6B7280';

  if (isLoading || !user) {
    return (
      <View style={{ flex: 1, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 24 }}>
      <View
        style={{
          width: '100%',
          maxWidth: 600,
          alignSelf: 'center',
          backgroundColor: cardBg,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: cardBorder,
          padding: 32,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '700', color: textColor, marginBottom: 24 }}>
          Account
        </Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: subText, marginBottom: 4 }}>Name</Text>
          <Text style={{ fontSize: 15, color: textColor }}>{user.name}</Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: subText, marginBottom: 4 }}>Email</Text>
          <Text style={{ fontSize: 15, color: textColor }}>{user.email}</Text>
        </View>

        <View>
          <Text style={{ fontSize: 12, color: subText, marginBottom: 4 }}>Account ID</Text>
          <Text style={{ fontSize: 12, color: subText, fontFamily: 'monospace' }}>{user.id}</Text>
        </View>
      </View>
    </View>
  );
}
