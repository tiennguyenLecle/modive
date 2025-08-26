import { useMemo } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

import { NextApi } from '@/lib/api';
import { useAuth } from '@/lib/authentication/auth-context';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  ChatRoomsResponse,
  fetchChatRooms,
  fetchUserWorks,
} from '@/lib/supabase/swr/chatroom';
import { ChatRoomType } from '@/types/chatroom';

export function useCreateChat() {
  return useSWRMutation(
    '/api/chat',
    async (
      url: string,
      { arg }: { arg: { bundleId: string; characterId: string } }
    ) => {
      return NextApi.post<ChatRoomType>(url, {
        body: {
          bundleId: arg.bundleId,
          characterId: arg.characterId,
        },
      });
    }
  );
}

type UseMyRoomsOptions = {
  pageSize?: number;
  type?: 'general' | 'chapter';
  workIds?: string[];
};

export function useMyRoomsInfinite(options: UseMyRoomsOptions = {}) {
  const { pageSize, workIds, type } = options;

  const supabase = useMemo(() => createBrowserSupabase('user'), []);

  const getKey = (
    pageIndex: number,
    previousPageData: ChatRoomsResponse | null
  ) => {
    if (
      previousPageData &&
      previousPageData.metadata.currentPage >=
        previousPageData.metadata.totalPages
    )
      return null;
    const page = pageIndex + 1;
    return ['my-rooms', page, pageSize, JSON.stringify(workIds), type] as const;
  };

  const { data, ...restInfiniteData } = useSWRInfinite(
    getKey,
    ([, page, limit]) =>
      fetchChatRooms(supabase, {
        page,
        limit,
        work_ids: workIds,
        type,
      }),
    {
      revalidateAll: true,
    }
  );

  const rooms: ChatRoomType[] = data
    ? ([] as ChatRoomType[]).concat(...data.map(item => item.data))
    : [];

  const isReachingEnd =
    data &&
    data[data.length - 1] &&
    data[data.length - 1].metadata.currentPage >=
      data[data.length - 1].metadata.totalPages;

  return {
    rooms,
    isReachingEnd,
    ...restInfiniteData,
  };
}

export function useChatRoomWorks() {
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const { user } = useAuth();

  return useSWR(user?.id ? ['chat-room-works', user.id] : null, () =>
    fetchUserWorks(supabase, user!.id)
  );
}
