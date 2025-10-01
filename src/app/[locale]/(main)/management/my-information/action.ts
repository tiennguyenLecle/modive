'use server';

import { createServerSupabase } from '@/lib/supabase/factory.server';

export const withdrawMyAccount = async (reason?: string) => {
  const supabase = createServerSupabase('user');
  const { data, error } = await supabase.functions.invoke('users/withdraw', {
    body: {
      reason, // Optional reason for withdrawal, stored in users.withdrawal_reason.
    },
  });

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const, data };
};
