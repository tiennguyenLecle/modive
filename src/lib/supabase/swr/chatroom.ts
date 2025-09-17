import { SupabaseClient } from '@supabase/supabase-js';

import { ChatRoomType } from '@/types/chatroom';
import { WorkType } from '@/types/work';

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

  // Step 1: Query to filter and count chat rooms
  let filterQueryBuilder = supabase
    .from('chat_rooms')
    .select('id', { count: 'exact' });

  if (user_id) {
    filterQueryBuilder = filterQueryBuilder.eq('user_id', user_id);
  }

  if (work_ids && work_ids.length > 0) {
    filterQueryBuilder = filterQueryBuilder.in('work_id', work_ids);
  }

  if (type) {
    filterQueryBuilder = filterQueryBuilder.eq('type', type);
  }

  // Sort to get the correct order
  filterQueryBuilder = filterQueryBuilder
    .order('is_pinned', { ascending: false })
    .order('pinned_at', { ascending: false })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const {
    data: filteredIds,
    error: filterError,
    count,
  } = await filterQueryBuilder;

  if (filterError) throw filterError;

  if (!filteredIds || filteredIds.length === 0) {
    return {
      data: [],
      metadata: {
        total: count || 0,
        totalPages: 0,
        currentPage: page,
      },
    } as ChatRoomsResponse;
  }

  // Step 2: Query details for filtered IDs
  const chatRoomIds = filteredIds.map(room => room.id);

  const { data, error } = await supabase
    .from('chat_rooms')
    .select(
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
      `
    )
    .in('id', chatRoomIds)
    .order('is_pinned', { ascending: false })
    .order('pinned_at', { ascending: false })
    .order('created_at', { ascending: false });

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

/**
 * Get list of works related to user through chatrooms
 * Optimize: Filter work_ids first, unique, then select details
 */

type UserWorksResponse = Pick<WorkType, 'id' | 'title'>[];

export async function fetchUserWorks(
  supabase: SupabaseClient,
  user_id: string
): Promise<UserWorksResponse> {
  // Step 1: Filter work_ids related to user
  const { data: chatRoomsData, error: chatRoomsError } = await supabase
    .from('chat_rooms')
    .select('work_id')
    .eq('user_id', user_id)
    .not('work_id', 'is', null);

  if (chatRoomsError) throw chatRoomsError;

  if (!chatRoomsData || chatRoomsData.length === 0) return [];

  // Step 2: Filter unique work_ids
  const workIds = Array.from(
    new Set(chatRoomsData.map(room => room.work_id).filter(Boolean))
  );

  if (workIds.length === 0) return [];

  // Step 3: Select details only for unique work_ids
  const { data: worksData, error: worksError } = await supabase
    .from('works')
    .select('id, title')
    .in('id', workIds)
    .order('title');

  if (worksError) throw worksError;

  return worksData as unknown as UserWorksResponse;
}

export async function fetchChatRoomDetail(
  supabase: SupabaseClient,
  chatroomId?: string
) {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select(
      `*,
      work:works!chat_rooms_work_id_works_id_fk (
        bundle_id,
        universe_id
      ),
      character:characters!chat_rooms_character_id_characters_id_fk (
        avatar_key,
        bot_id,
        id,
        name
      )`
    )
    .eq('room_id', chatroomId || '70a63523-2221-4e60-a434-52b879ed6166')
    .single();
  if (error) throw error;
  return data as unknown as ChatRoomType;
}

/**
 * Get detailed information about a specific chat room
 * @param supabase - Supabase client instance
 * @param chatroomId - The ID of the chat room to fetch
 * @returns Promise<ChatRoomType> - The chat room details with related work and character data
 * @throws Error if chatroomId is not provided or if the room is not found
 */
export async function getRoomDetail(
  supabase: SupabaseClient,
  chatroomId: string
): Promise<ChatRoomType> {
  if (!chatroomId) {
    throw new Error('Chatroom ID is required');
  }

  const { data, error } = await supabase
    .from('chat_rooms')
    .select(
      `*,
      work:works!chat_rooms_work_id_works_id_fk (
        bundle_id,
        universe_id
      ),
      character:characters!chat_rooms_character_id_characters_id_fk (
        avatar_key,
        bot_id,
        id,
        name
      )`
    )
    .eq('room_id', chatroomId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error(`Chat room with ID ${chatroomId} not found`);
    }
    throw error;
  }

  return data as unknown as ChatRoomType;
}

/**
 * Update multiple fields in a chatroom
 */
export async function updateChatroomField(
  supabase: SupabaseClient,
  chatroomId: string,
  fields: {
    last_accessed_at?: string;
    last_message?: string;
    metadata?: Record<string, any>;
  }
) {
  const { data, error } = await supabase
    .from('chat_rooms')
    .update(fields)
    .eq('room_id', chatroomId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
