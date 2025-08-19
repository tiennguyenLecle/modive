import useSWRMutation from 'swr/mutation';

import { NextApi } from '@/lib/api';
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
