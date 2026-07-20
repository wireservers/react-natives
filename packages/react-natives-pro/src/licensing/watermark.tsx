import React from 'react';
import { Text, View } from 'react-native';
import { getLicenseStatus, warnOnce, type LicenseStatus } from './license';

/**
 * Reports the current license state and emits the one-time console warning on first render of
 * an unlicensed Pro component.
 *
 * Deliberately reads module state rather than subscribing to it: `setLicenseKey` is called once
 * at startup, before any Pro component mounts, so there is nothing to react to afterwards.
 */
export function useLicenseStatus(): LicenseStatus {
  const status = getLicenseStatus();
  React.useEffect(() => {
    if (!status.valid) warnOnce(status.reason);
  }, [status]);
  return status;
}

export interface LicenseWatermarkProps {
  /** Label shown in the badge. Defaults to the package name. */
  label?: string;
}

/**
 * Overlay shown on Pro components when no valid license is set.
 *
 * `pointerEvents="none"` is essential — the watermark must never intercept touches. Unlicensed
 * use is nagged, never blocked, so the component underneath stays fully interactive.
 */
export function LicenseWatermark({ label }: LicenseWatermarkProps) {
  return (
    <View
      pointerEvents="none"
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 9999 }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {/* Bottom-right: the top-right corner is where toolbars and action buttons live, and the
          badge would sit directly on top of them. */}
      <View style={{ position: 'absolute', bottom: 8, right: 8 }}>
        <View className="rounded-md border border-warning-400 bg-warning-50 px-2 py-1">
          <Text className="text-[10px] font-semibold text-warning-700">
            {label ?? 'react-natives-pro — unlicensed'}
          </Text>
        </View>
      </View>
    </View>
  );
}

LicenseWatermark.displayName = 'LicenseWatermark';

/**
 * Wraps `children` so an unlicensed build renders the watermark above them.
 * Returns children untouched when licensed, adding no view to the tree.
 */
export function WithLicenseWatermark({ children }: { children: React.ReactNode }) {
  const status = useLicenseStatus();
  if (status.valid) return <>{children}</>;
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {children}
      <LicenseWatermark />
    </View>
  );
}

WithLicenseWatermark.displayName = 'WithLicenseWatermark';
