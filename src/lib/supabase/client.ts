import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { COOKIE_PREFIX_SB } from '../../utils/constants';

let browserClient: SupabaseClient | null = null;

export function createSupabaseClient(): SupabaseClient {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: COOKIE_PREFIX_SB,
      },
    }
  );
  return browserClient;
}
