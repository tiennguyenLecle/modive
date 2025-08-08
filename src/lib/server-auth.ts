import { SupabaseClient } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export type ServerAuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type ServerAuthResult = {
  status: ServerAuthStatus;
  session: any | null;
  user: { id: string; email?: string | null } | null;
  supabase: SupabaseClient;
};

/**
 * Returns server-side auth state similar to useAuth() on client.
 * Uses Supabase server client (per-request) to read session and user.
 */
export async function getServerAuth(): Promise<ServerAuthResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return { status: 'unauthenticated', session: null, user: null, supabase };
  }
  const session = data.session ?? null;
  if (!session) {
    return { status: 'unauthenticated', session: null, user: null, supabase };
  }
  const user = session.user
    ? { id: session.user.id, email: session.user.email }
    : null;
  return { status: 'authenticated', session, user, supabase };
}
