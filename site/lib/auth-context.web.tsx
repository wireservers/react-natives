import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  AccountInfo,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { isMsalConfigured, loginRequest, msalConfig } from './msal-config';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

let msalInstance: PublicClientApplication | null = null;
let initPromise: Promise<void> | null = null;

function getMsalInstance() {
  if (!isMsalConfigured) return null;
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
    initPromise = msalInstance
      .initialize()
      .then(() => msalInstance!.handleRedirectPromise())
      .then(() => undefined);
  }
  return msalInstance;
}

function accountToUser(account: AccountInfo | null): AuthUser | null {
  if (!account) return null;
  const name = account.name ?? account.username;
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]!.toUpperCase())
      .join('') || '?';
  return {
    id: account.homeAccountId,
    name,
    email: account.username,
    initials,
  };
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isConfigured: false,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(isMsalConfigured);

  useEffect(() => {
    const instance = getMsalInstance();
    if (!instance || !initPromise) {
      setIsLoading(false);
      return;
    }

    let callbackId: string | null = null;

    initPromise
      .then(() => {
        const accounts = instance.getAllAccounts();
        if (accounts[0]) {
          instance.setActiveAccount(accounts[0]);
          setUser(accountToUser(accounts[0]));
        }
        setIsLoading(false);

        callbackId = instance.addEventCallback((event) => {
          if (
            event.eventType === EventType.LOGIN_SUCCESS &&
            event.payload &&
            'account' in event.payload
          ) {
            const account = (event.payload as { account: AccountInfo }).account;
            instance.setActiveAccount(account);
            setUser(accountToUser(account));
          } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
            setUser(null);
          }
        });
      })
      .catch((err) => {
        console.error('MSAL init failed', err);
        setIsLoading(false);
      });

    return () => {
      if (callbackId) instance.removeEventCallback(callbackId);
    };
  }, []);

  const signIn = useCallback(async () => {
    const instance = getMsalInstance();
    if (!instance) {
      console.warn(
        '[auth] MSAL not configured. Set EXPO_PUBLIC_MSAL_CLIENT_ID in .env.',
      );
      return;
    }
    if (initPromise) await initPromise;
    await instance.loginRedirect(loginRequest);
  }, []);

  const signOut = useCallback(async () => {
    const instance = getMsalInstance();
    if (!instance) return;
    if (initPromise) await initPromise;
    await instance.logoutRedirect();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        isConfigured: isMsalConfigured,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
