import useSWRMutation from 'swr/mutation';

import { deleteChatRoomAction, pinChatRoomAction } from '../_actions/chatroom';

export function usePinChatRoom() {
  return useSWRMutation(
    'my-rooms',
    async (_, { arg }: { arg: { chatroomId: string; is_pinned: boolean } }) => {
      return pinChatRoomAction(arg.chatroomId, arg.is_pinned);
    }
  );
}

export function useDeleteChatRoom() {
  return useSWRMutation(
    'my-rooms',
    async (_, { arg }: { arg: { chatroomId: string } }) => {
      return deleteChatRoomAction(arg.chatroomId);
    }
  );
}
