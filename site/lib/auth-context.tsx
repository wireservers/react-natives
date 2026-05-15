import React, { createContext, useContext } from 'react';

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

const stub: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isConfigured: false,
  signIn: async () => {},
  signOut: async () => {},
};

const AuthContext = createContext<AuthContextValue>(stub);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={stub}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
