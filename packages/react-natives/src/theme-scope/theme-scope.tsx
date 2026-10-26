import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import type { ThemeScopeBridgeProps, ThemeScopeProps } from './types';

const ThemeScopeContext = React.createContext<StyleProp<ViewStyle>>(undefined);

/** Returns the theme variables of the nearest ThemeScope(s), outermost first. */
export function useThemeScopeVars(): StyleProp<ViewStyle> {
  return React.useContext(ThemeScopeContext);
}

/**
 * Applies theme variables to a subtree. Unlike setting `vars()` on a plain View,
 * the variables also reach content that modal-based components portal out of
 * the tree (RN Modal renders into `document.body` on web).
 */
export const ThemeScope = React.forwardRef<
  React.ElementRef<typeof View>,
  ThemeScopeProps
>(({ vars, style, ...props }, ref) => {
  const parentVars = useThemeScopeVars();
  const scopeVars = React.useMemo<StyleProp<ViewStyle>>(
    () => (parentVars ? [parentVars, vars] : vars),
    [parentVars, vars],
  );

  return (
    <ThemeScopeContext.Provider value={scopeVars}>
      <View ref={ref} style={[vars, style]} {...props} />
    </ThemeScopeContext.Provider>
  );
});

ThemeScope.displayName = 'ThemeScope';

/**
 * Re-applies the enclosing ThemeScope's variables. Used as the root child of
 * RN Modal so portaled content inherits the theme. Renders children unchanged
 * when there is no ThemeScope.
 */
export function ThemeScopeBridge({ children }: ThemeScopeBridgeProps) {
  const scopeVars = useThemeScopeVars();
  if (!scopeVars) return <>{children}</>;

  return (
    <View style={[{ flex: 1 }, scopeVars]} pointerEvents="box-none">
      {children}
    </View>
  );
}

ThemeScopeBridge.displayName = 'ThemeScopeBridge';
