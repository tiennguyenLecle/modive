import { SupabaseClient } from '@supabase/supabase-js';

import { CharacterType } from '@/types/character';
import { ChatRoomType } from '@/types/chatroom';
import { WorkType } from '@/types/work';

export const CHARACTER_KEY = {
  detail: (characterId: string) => ['character', characterId],
};

export type ExtendedCharacterType = CharacterType & {
  work: Pick<
    WorkType,
    'id' | 'tags' | 'title' | 'thumbnail_key' | 'bundle_id' | 'universe_id'
  >;
  is_liked: boolean;
  chat_rooms: ChatRoomType[];
};

export const fetchCharacterDetail = async (
  supabase: SupabaseClient,
  characterId: string,
  userId?: string // ID of user to check like
) => {
  const { data, error } = await supabase.functions.invoke(
    'characters/get-by-id',
    {
      body: {
        is_liked_user_id: userId,
        id: characterId,
      },
    }
  );

  if (error) throw error;
  return data.data as ExtendedCharacterType;
};
