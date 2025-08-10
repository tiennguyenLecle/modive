'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import { createSupabaseClient } from '@/lib/supabase/client';
import { ROUTES } from '@/utils/constants';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthContextValue = {
  user: User | null;
  signInWithProvider: (
    provider: 'google' | string,
    redirectTo?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseClient(), []);
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
    router.push(ROUTES.HOME);
  };

  const value: AuthContextValue = {
    user,
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
