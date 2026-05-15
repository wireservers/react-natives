import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BRAND_COLOR } from '@/constants/brand';
import { useTheme } from '@/context/theme-context';
import { useAuth } from '@/lib/auth-context';

const AVATAR_SIZE = 36;

export function UserAvatar() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? '#D1D5DB' : '#4B5563';
  const cardBg = isDark ? '#1f1f1f' : '#fff';
  const cardBorder = isDark ? '#3A3A3A' : '#E2E8F0';
  const subTextColor = isDark ? '#9CA3AF' : '#6B7280';

  if (isLoading) {
    return (
      <View
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE / 2,
          backgroundColor: isDark ? '#252525' : '#F1F5F9',
        }}
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Pressable
        onPress={() => router.navigate('/login' as any)}
        accessibilityLabel="Sign in"
        style={{
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: BRAND_COLOR,
        }}
      >
        <Text style={{ color: BRAND_COLOR, fontSize: 13, fontWeight: '600' }}>
          Sign in
        </Text>
      </Pressable>
    );
  }

  return (
    <View>
      <Pressable
        onPress={() => setMenuOpen(true)}
        accessibilityLabel={`Account menu for ${user.name}`}
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE / 2,
          backgroundColor: BRAND_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>
          {user.initials}
        </Text>
      </Pressable>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable
          onPress={() => setMenuOpen(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
        >
          <View
            style={{
              position: 'absolute',
              top: 72,
              right: 20,
              width: 260,
              backgroundColor: cardBg,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: cardBorder,
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 6,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: BRAND_COLOR,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
                  {user.initials}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: textColor, fontSize: 14, fontWeight: '600' }} numberOfLines={1}>
                  {user.name}
                </Text>
                <Text style={{ color: subTextColor, fontSize: 12 }} numberOfLines={1}>
                  {user.email}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => {
                setMenuOpen(false);
                router.navigate('/account' as any);
              }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: textColor, fontSize: 14 }}>Account</Text>
            </Pressable>

            <Pressable
              onPress={async () => {
                setMenuOpen(false);
                await signOut();
              }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: textColor, fontSize: 14 }}>Sign out</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
