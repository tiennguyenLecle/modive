'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import { type Role } from '@/lib/authentication/auth.types';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { ROUTES } from '@/utils/constants';

import { NextApi } from '../api';

type AuthContextValue = {
  user: User | null;
  signInWithProvider: (
    provider: 'google' | string,
    redirectTo?: string
  ) => Promise<void>;
  signInWithCredential: (
    email: string,
    password: string,
    redirectTo?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
  role: Role;
};

export function AuthProvider({ children, role }: AuthProviderProps) {
  const router = useRouter();
  const supabase = useMemo(() => createBrowserSupabase(role), [role]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isActive = true;
    async function init() {
      const { data, error } = await supabase.auth.getSession();
      if (!isActive) return;
      if (error || !data.session) {
        setUser(null);
      } else {
        setUser(data.session.user);
      }
    }
    init();
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!newSession) {
          setUser(null);
        } else {
          setUser(newSession.user);
        }
      }
    );
    return () => {
      isActive = false;
      sub.subscription?.unsubscribe();
    };
  }, [supabase]);

  const signInWithProvider = async (
    provider: 'google' | string,
    redirectTo?: string
  ) => {
    const defaultRedirectPath =
      role === 'admin' ? ROUTES.CMS.DATA_MANAGEMENT.CONTENT : ROUTES.HOME;

    const redirect =
      redirectTo ||
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/${role}/callback?redirect=${encodeURIComponent(defaultRedirectPath)}`;

    console.log('signInWithProvider', redirect);

    await supabase.auth.signInWithOAuth({
      provider: provider as any,
      // Redirect to the Next auth callback route to sync the session with the server
      // Then back to the defaultRedirectPath for the browser
      options: { redirectTo: redirect },
    });
  };

  const signInWithCredential = async (
    email: string,
    password: string,
    redirectTo?: string
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    const redirectPath =
      redirectTo ||
      (role === 'admin' ? ROUTES.CMS.DATA_MANAGEMENT.CONTENT : ROUTES.HOME);
    router.push(redirectPath);
  };

  const signOut = async () => {
    await supabase.auth.signOut().then(() => {
      router.push(role === 'admin' ? ROUTES.CMS.LOGIN : ROUTES.HOME);
    });
  };

  const value: AuthContextValue = {
    user,
    signInWithProvider,
    signInWithCredential,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
