import { SupabaseClient } from '@supabase/supabase-js';

export async function fetchMyRooms(
  supabase: SupabaseClient,
  query: {
    page: number;
    limit: number;
    sort: { field: string; ascending: boolean }[];
    work_ids: string[];
    character_ids: string[];
  }
) {
  const {
    page = 1,
    limit = 10,
    sort = [],
    work_ids = [],
    character_ids = [],
  } = query;
  const { data, error } = await supabase.functions.invoke(
    'chat-rooms/get-my-rooms',
    {
      body: {
        page,
        limit,
        sort,
        work_ids,
        character_ids,
      },
    }
  );
  if (error) throw error;
  return data;
}
