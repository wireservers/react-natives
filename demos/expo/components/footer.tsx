import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Linking, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

function FooterLink({ label, url, route }: { label: string; url?: string; route?: string }) {
  const router = useRouter();
  const [tipVisible, setTipVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasDestination = !!(url || route);

  const onPress = url
    ? () => Linking.openURL(url)
    : route
    ? () => router.navigate(route as any)
    : () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setTipVisible(true);
        timerRef.current = setTimeout(() => setTipVisible(false), 1800);
      };

  return (
    <View style={{ position: 'relative', marginBottom: 8 }}>
      {tipVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            backgroundColor: '#F9FAFB',
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
            zIndex: 100,
          }}
        >
          <Text style={{ color: '#111827', fontSize: 12, fontWeight: '600', whiteSpace: 'nowrap' } as any}>
            {label} coming soon
          </Text>
          <View
            style={{
              position: 'absolute',
              bottom: -4,
              left: 12,
              width: 8,
              height: 8,
              backgroundColor: '#F9FAFB',
              transform: [{ rotate: '45deg' }],
            }}
          />
        </View>
      )}
      <Pressable onPress={onPress}>
        <Text style={{ color: hasDestination ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)', fontSize: 14 }}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

export function Footer() {
  const { width } = useWindowDimensions();
  const isWide = width >= 640;

  return (
    <View style={{ backgroundColor: '#1F2937', marginTop: 'auto' }}>
      <View style={{ width: '100%', maxWidth: 1680, alignSelf: 'center', paddingHorizontal: isWide ? 48 : 24, paddingTop: 40, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
          <View style={{ flex: 1, minWidth: 160 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 10 }}>
              React-Natives
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 20 }}>
              A comprehensive React Native component library. Created by WireServers-UI.
            </Text>
          </View>
          <View style={{ flex: 1, minWidth: 120 }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 12 }}>
              Documentation
            </Text>
            <FooterLink label="Getting Started" route="/components" />
            <FooterLink label="Components" route="/components" />
            <FooterLink label="Theming" route="/theming" />
          </View>
          <View style={{ flex: 1, minWidth: 120 }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 12 }}>
              Community
            </Text>
            <FooterLink label="GitHub" url="https://github.com/wireservers/wireservers-ui" />
            <FooterLink label="Discord" />
            <FooterLink label="Twitter" />
            <FooterLink label="Blog" />
          </View>
          <View style={{ flex: 1, minWidth: 120 }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 12 }}>
              Support
            </Text>
            <FooterLink label="FAQ" />
            <FooterLink label="Contact" />
            <FooterLink label="Contributing" url="https://github.com/wireservers/wireservers-ui/blob/main/CONTRIBUTING.md" />
            <FooterLink label="License" url="https://github.com/wireservers/wireservers-ui/blob/main/LICENSE" />
          </View>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 20, alignItems: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            © 2026 React-Natives. Powered by WireServers-UI.
          </Text>
        </View>
      </View>
    </View>
  );
}
