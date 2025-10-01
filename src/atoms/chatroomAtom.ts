import { atom } from 'jotai';

import { ChatRoomType } from '@/types/chatroom';

export const chatroomAtom = atom<ChatRoomType | null>(null);

type CoinsInfoByWorkType = {
  message_count: number;
  free_quota: number;
  work_id: string;
  is_insufficient: boolean;
};

export const coinsInfoByWorkAtom = atom<CoinsInfoByWorkType>({
  message_count: 0,
  free_quota: 0,
  work_id: '',
  is_insufficient: false,
});

export const isAlertModalAtom = atom<{
  isOpen: boolean;
  workTitle: string;
}>({
  isOpen: false,
  workTitle: '',
});

export const isConfirmationModalAtom = atom<{
  isOpen: boolean;
}>({
  isOpen: false,
});

export const isAlertAvailableCashModalAtom = atom<{
  isOpen: boolean;
}>({
  isOpen: false,
});
