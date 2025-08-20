import { SupabaseClient } from '@supabase/supabase-js';

import { ChatRoomType } from '@/types/chatroom';

export type ChatRoomsResponse = {
  data: ChatRoomType[];
  metadata: {
    total: number;
    totalPages: number;
    currentPage: number;
  };
};

export type FetchChatRoomsQuery = {
  page?: number;
  limit?: number;
  work_ids?: string[];
  type?: 'general' | 'chapter';
  user_id?: string;
};

export async function fetchChatRooms(
  supabase: SupabaseClient,
  query: FetchChatRoomsQuery
) {
  const { page = 1, limit = 10, work_ids, type, user_id } = query;

  const offset = (page - 1) * limit;

  let queryBuilder = supabase.from('chat_rooms').select(
    `
      *,
      work:works!chat_rooms_work_id_works_id_fk (
        bundle_id,
        universe_id
      ),
      character:characters!chat_rooms_character_id_characters_id_fk (
        avatar_key,
        bot_id,
        id,
        name
      )
    `,
    { count: 'exact' }
  );

  if (user_id) {
    queryBuilder = queryBuilder.eq('user_id', user_id);
  }

  // Filter by work_ids (array)
  if (work_ids && work_ids.length > 0) {
    queryBuilder = queryBuilder.in('work_id', work_ids);
  }

  // Filter by type
  if (type) {
    queryBuilder = queryBuilder.eq('type', type);
  }

  // Sort by pinned_at (pinned rooms lên đầu), then by created_at (latest first)
  queryBuilder = queryBuilder
    .order('pinned_at', { ascending: false })
    .order('created_at', { ascending: false });

  // Pagination
  queryBuilder = queryBuilder.range(offset, offset + limit - 1);

  const { data, error, count } = await queryBuilder;

  if (error) throw error;

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);
  const currentPage = page;

  return {
    data: data as unknown as ChatRoomType[],
    metadata: {
      total,
      totalPages,
      currentPage,
    },
  } as ChatRoomsResponse;
}
