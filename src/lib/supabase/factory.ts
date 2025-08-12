import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { type Role } from '@/lib/authentication/auth.types';
import { COOKIE_PREFIX_SB, COOKIE_PREFIX_SB_ADMIN } from '@/utils/constants';

let browserClient: SupabaseClient | null = null;

/**
 * Create a browser Supabase client with a dynamic cookie prefix.
 */
export function createBrowserSupabase(role: Role): SupabaseClient {
  if (browserClient) return browserClient;
  const cookieName =
    role === 'admin' ? COOKIE_PREFIX_SB_ADMIN : COOKIE_PREFIX_SB;
  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { name: cookieName },
    }
  );
  return browserClient;
}
