'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { createSupabaseClient } from '@/lib/supabase/client';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthContextValue = {
  status: AuthStatus;
  session: any | null;
  user: any | null;
  signInWithProvider: (
    provider: 'google' | string,
    redirectTo?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [data, setData] = useState<
    Pick<AuthContextValue, 'status' | 'session' | 'user'>
  >({
    status: 'loading',
    session: null,
    user: null,
  });

  useEffect(() => {
    let isActive = true;
    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!isActive) return;
      setData({
        status: data.session ? 'authenticated' : 'unauthenticated',
        session: data.session ?? null,
        user: data.session?.user ?? null,
      });
    }
    init();
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setData({
          status: newSession ? 'authenticated' : 'unauthenticated',
          session: newSession ?? null,
          user: newSession?.user ?? null,
        });
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
    const redirect =
      redirectTo ||
      `${window.location.origin}/api/auth/callback?redirect=${encodeURIComponent('/')}`;
    await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: { redirectTo: redirect },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextValue = {
    ...data,
    signInWithProvider,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
