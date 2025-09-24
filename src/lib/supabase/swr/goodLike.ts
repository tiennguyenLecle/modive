import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/types/supabase';

export type GoodLikeType = Database['public']['Tables']['good_likes']['Row'];

// add like
export const addGoodLike = async (
  supabase: SupabaseClient,
  goodId: string,
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from('good_likes')
    .insert({ good_id: goodId, user_id: userId });

  if (error) throw error;
};

// remove like
export const removeGoodLike = async (
  supabase: SupabaseClient,
  goodId: string,
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from('good_likes')
    .delete()
    .eq('good_id', goodId)
    .eq('user_id', userId);

  if (error) throw error;
};
