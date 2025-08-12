import { cache } from 'react';
import { User } from '@supabase/supabase-js';

import { createServerSupabase } from '@/lib/supabase/_factory.server';

export type ServerAuthResult = User | null;

/**
 * Returns server-side auth state similar to useAuth() on client.
 * Uses Supabase server client (per-request) to read session and user.
 */
export const getServerAuth = cache(
  async (kind: 'user' | 'admin' = 'user'): Promise<ServerAuthResult> => {
    const supabase = await createServerSupabase(kind);
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return null;
    }
    return data.user;
  }
);
