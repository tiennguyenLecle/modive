import { atom } from 'jotai';

import { Message } from '@/lib/api/types/chat.types';
import { ChatRoomType } from '@/types/chatroom';

export const messagesAtom = atom<Message[]>([]);
export const messageCountAtom = atom<number>(0);
export const roomListAtom = atom<ChatRoomType[]>([]);
