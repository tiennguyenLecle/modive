import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import { type Role } from '@/lib/authentication/auth.types';
import { COOKIE_PREFIX_SB, COOKIE_PREFIX_SB_ADMIN } from '@/utils/constants';

export type NextCookiesAdapter = {
  get: (name: string) => string | undefined;
  set: (name: string, value: string, options: CookieOptions) => void;
};

export function createServerSupabase(
  role: Role,
  cookiesAdapter?: NextCookiesAdapter,
  key: 'anon' | 'service' = 'anon'
): SupabaseClient {
  const cookieName =
    role === 'admin' ? COOKIE_PREFIX_SB_ADMIN : COOKIE_PREFIX_SB;

  // Default adapter uses next/headers cookies store when no adapter is provided
  const adapter: NextCookiesAdapter = cookiesAdapter || {
    get: (name: string) => {
      try {
        return cookies().get(name)?.value;
      } catch {
        return undefined;
      }
    },
    set: (name: string, value: string, options: CookieOptions) => {
      try {
        cookies().set({ name, value, ...options });
      } catch {
        // Ignore if not writable in current context (e.g., Server Component)
      }
    },
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key === 'anon'
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      : process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookieOptions: { name: cookieName },
      cookies: {
        get(name: string) {
          return adapter.get(name);
        },
        set(name: string, value: string, options: CookieOptions) {
          adapter.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          adapter.set(name, '', options);
        },
      },
    }
  );
}
