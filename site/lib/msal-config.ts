import { Platform } from 'react-native';
import type { Configuration, RedirectRequest } from '@azure/msal-browser';

const clientId = process.env.EXPO_PUBLIC_MSAL_CLIENT_ID ?? '';
const tenantId = process.env.EXPO_PUBLIC_MSAL_TENANT_ID ?? 'common';
const redirectUriEnv = process.env.EXPO_PUBLIC_MSAL_REDIRECT_URI ?? '';
const postLogoutEnv = process.env.EXPO_PUBLIC_MSAL_POST_LOGOUT_REDIRECT_URI ?? '';

function resolveRedirectUri(fallback: string) {
  if (fallback) return fallback;
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: resolveRedirectUri(redirectUriEnv),
    postLogoutRedirectUri: resolveRedirectUri(postLogoutEnv || redirectUriEnv),
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: RedirectRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
};

export const isMsalConfigured = clientId.length > 0;
