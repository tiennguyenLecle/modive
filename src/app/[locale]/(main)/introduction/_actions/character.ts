'use server';

import { revalidatePath } from 'next/cache';

import { createServerSupabase } from '@/lib/supabase/factory.server';

export async function toggleCharacterLikeAction(
  characterId: string,
  currentLike: boolean
) {
  const supabase = createServerSupabase('user');
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  if (currentLike) {
    // User has liked, so dislike
    await supabase
      .from('character_likes')
      .delete()
      .match({ character_id: characterId, user_id: user.id });
  } else {
    // Not liked yet, so like
    await supabase
      .from('character_likes')
      .insert({ character_id: characterId, user_id: user.id });
  }

  revalidatePath('/introduction');
  return {
    is_liked: !currentLike,
  };
}
