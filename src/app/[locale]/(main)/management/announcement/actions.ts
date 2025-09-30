'use server';

import { createServerSupabase } from '@/lib/supabase/factory.server';

export const getAnnouncements = async () => {
  const supabase = createServerSupabase('user');
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('status', 'published')
    .order('publication_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
