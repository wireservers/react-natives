import React from 'react';
import { View, Text, Pressable, Image, useWindowDimensions, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BRAND_COLOR, BRAND_COLOR_DARK, BRAND_GRADIENT } from '@wireservers-ui/react-natives';
import { useTheme } from '@/context/theme-context';
import { useCustomTheme } from '@/context/custom-theme-context';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Components', path: '/components' },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const { colorScheme, toggleColorScheme } = useTheme();
  const { toggleSettings } = useCustomTheme();
  const isDark = colorScheme === 'dark';

  const bgColor = isDark ? '#1a1a1a' : '#fff';
  const borderColor = isDark ? '#333' : '#E5E7EB';
  const textColor = isDark ? '#D1D5DB' : '#4B5563';

  return (
    <View>
      {/* Main header bar */}
      <View style={{ backgroundColor: bgColor, borderBottomWidth: 1, borderBottomColor: borderColor }}>
      <View
        style={{
          width: '100%',
          maxWidth: 1680,
          alignSelf: 'center',
          paddingHorizontal: 20,
          height: 72,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Logo + brand name */}
        <Pressable
          onPress={() => router.push('/' as any)}
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, gap: 10 }}
        >
          <Image
            source={require('../assets/images/react-natives-icon-square-1024.png')}
            style={{ width: 44, height: 44 }}
            resizeMode="contain"
          />
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: isDark ? BRAND_COLOR : BRAND_COLOR_DARK,
                letterSpacing: 1.2,
                fontStyle: 'italic',
              }}
            >
              REACT-NATIVES
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: BRAND_COLOR,
                letterSpacing: 2,
                marginTop: 1,
                fontStyle: 'italic',
              }}
            >
              WIRED FOR SPEED
            </Text>
          </View>
        </Pressable>

        {/* Nav links — wide screens only */}
        {isWide && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24, marginLeft: 32 }}>
            {NAV_LINKS.map((link) => {
              const isActive =
                link.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.path);
              return (
                <Pressable
                  key={link.label}
                  onPress={() => router.navigate(link.path as any)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: isActive ? BRAND_COLOR : textColor,
                    }}
                  >
                    {link.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Right side — theme toggle + GitHub icon + Get Started button */}
        <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {/* Theme settings */}
          <Pressable onPress={toggleSettings}>
            <MaterialCommunityIcons name="palette-outline" size={22} color={textColor} />
          </Pressable>

          {/* Light/Dark toggle */}
          <Pressable onPress={toggleColorScheme}>
            <MaterialCommunityIcons
              name={isDark ? 'weather-sunny' : 'weather-night'}
              size={22}
              color={textColor}
            />
          </Pressable>

          {/* GitHub icon */}
          <Pressable
            onPress={() => Linking.openURL('https://github.com/wireservers/wireservers-ui')}
          >
            <MaterialCommunityIcons name="github" size={24} color={textColor} />
          </Pressable>

          {/* Get Started button */}
          <Pressable
            onPress={() => router.navigate('/components' as any)}
            style={{
              backgroundColor: BRAND_COLOR,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
              Get Started
            </Text>
          </Pressable>
        </View>
      </View>
      </View>

      {/* Gradient accent bar */}
      <LinearGradient
        colors={[...BRAND_GRADIENT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 3 }}
      />
    </View>
  );
}
