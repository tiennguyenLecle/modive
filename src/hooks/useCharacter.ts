import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

import { useAuth } from '@/lib/authentication/auth-context';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  CHARACTER_KEY,
  fetchCharacterDetail,
} from '@/lib/supabase/swr/character';

export const useCharacterDetail = (characterId: string) => {
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const { user } = useAuth();

  const {
    data: characterDetail,
    isLoading,
    error,
  } = useSWR(characterId ? CHARACTER_KEY.detail(characterId) : null, () =>
    fetchCharacterDetail(supabase, characterId, user?.id)
  );
  return { characterDetail, isLoading, error };
};
