import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { useAuth } from '@/lib/authentication/auth-context';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { fetchCharacterDetail } from '@/lib/supabase/swr/character';

import { toggleCharacterLikeAction } from '../_actions/character';

export function useCharacter(characterId: string | null) {
  const supabase = createBrowserSupabase('user');
  const { user } = useAuth();

  const swrKey = characterId ? ['character-detail', characterId] : null;

  const characterDetail = useSWR(swrKey, () =>
    fetchCharacterDetail(supabase, characterId as string, user!.id)
  );

  const toggleLike = useSWRMutation(
    swrKey,
    async () => {
      if (!characterDetail.data) return;

      const { is_liked, total_likes } = characterDetail.data;

      // Optimistic update
      characterDetail.mutate(
        {
          ...characterDetail.data,
          is_liked: !is_liked,
          total_likes: is_liked ? total_likes - 1 : total_likes + 1,
        },
        false
      );

      return toggleCharacterLikeAction(characterId as string, is_liked);
    },
    {
      revalidate: false, // Server action already revalidates the path
    }
  );

  return {
    characterDetail,
    toggleLike,
  };
}
