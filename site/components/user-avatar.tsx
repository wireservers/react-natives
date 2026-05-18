import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BRAND_COLOR } from '@/constants/brand';
import { useTheme } from '@/context/theme-context';
import { useAuth } from '@/lib/auth-context';
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuSeparator,
  MenuGroup,
  MenuGroupTitle,
} from '@wireservers-ui/react-natives';

const AVATAR_SIZE = 40;

export function UserAvatar() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = colorScheme === 'dark';

  if (isLoading) {
    return (
      <View
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE / 2,
          backgroundColor: isDark ? '#1F2937' : '#E5E7EB',
        }}
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Pressable
        onPress={() => router.navigate('/login' as any)}
        accessibilityLabel="Sign in"
        style={({ pressed }) => ({
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: BRAND_COLOR,
          backgroundColor: pressed ? 'rgba(16,185,129,0.08)' : 'transparent',
        })}
      >
        <Text style={{ color: BRAND_COLOR, fontSize: 13, fontWeight: '700' }}>
          Sign in
        </Text>
      </Pressable>
    );
  }

  return (
    <Menu isOpen={menuOpen} onOpenChange={setMenuOpen}>
      <MenuTrigger>
        <Pressable
          accessibilityLabel={`Open account menu for ${user.name}`}
          style={({ pressed }) => ({
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE / 2,
            backgroundColor: BRAND_COLOR,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: pressed ? 0.96 : 1 }],
            shadowColor: '#000',
            shadowOpacity: pressed ? 0.18 : 0.12,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: pressed ? 4 : 3,
          })}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '800' }}>
            {user.initials}
          </Text>
        </Pressable>
      </MenuTrigger>

      <MenuContent
        className={`w-[280px] rounded-[24px] border p-0 shadow-2xl ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}
      >
        <View className="p-4">
          <View className="flex-row items-center gap-3">
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: BRAND_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>
                {user.initials}
              </Text>
            </View>
            <View className="flex-1">
              <Text
                style={{
                  color: isDark ? '#F8FAFC' : '#111827',
                  fontSize: 15,
                  fontWeight: '700',
                }}
                numberOfLines={1}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  color: isDark ? '#94A3B8' : '#6B7280',
                  fontSize: 13,
                }}
                numberOfLines={1}
              >
                {user.email}
              </Text>
            </View>
          </View>

          <Text
            className="mt-4"
            style={{
              color: isDark ? '#94A3B8' : '#6B7280',
              fontSize: 11,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
            }}
          >
            Profile
          </Text>
        </View>

        <MenuSeparator className={`${isDark ? 'bg-slate-800' : 'bg-slate-100'} h-px`} />

        <MenuItem
          onPress={() => {
            router.navigate('/account' as any);
          }}
          className={`px-4 py-3 ${isDark ? 'hover:bg-slate-900' : 'hover:bg-slate-50'}`}
        >
          <MenuItemText className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Account settings
          </MenuItemText>
        </MenuItem>

        <MenuItem
          onPress={async () => {
            await signOut();
          }}
          className={`px-4 py-3 ${isDark ? 'hover:bg-slate-900' : 'hover:bg-slate-50'}`}
        >
          <MenuItemText className="text-sm font-semibold text-rose-500">
            Sign out
          </MenuItemText>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
