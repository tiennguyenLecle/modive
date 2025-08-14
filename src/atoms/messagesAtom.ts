import { atom } from 'jotai';

import { Message } from '@/lib/api/types/chat.types';

export const messagesAtom = atom<Message[]>([]);
