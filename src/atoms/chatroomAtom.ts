import { atom } from 'jotai';

import { ChatRoomType } from '@/types/chatroom';

export const chatroomAtom = atom<ChatRoomType | null>(null);
