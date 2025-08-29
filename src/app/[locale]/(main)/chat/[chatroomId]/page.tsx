import { cache } from 'react';
import { getTranslations } from 'next-intl/server';

import { SuspenseComponent } from '@/components';
import { ChatApi } from '@/lib/api/server';
import { redirect } from '@/lib/navigation';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchChatRoomDetail } from '@/lib/supabase/swr/chatroom';
import { ROUTES } from '@/utils/constants';

import ChatRoom from './ChatRoom.client';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { chatroomId: string };
}) {
  const t = await getTranslations('chat_page.room');
  // const { chatroomId } = params;
  // const res = await ChatApi.getMessages(chatroomId);
  return {
    title: 'Kang Lee -hyun', // TODO: Update it to character name
    description: t('metadata.description', { characterName: 'Kang Lee -hyun' }),
  };
}

export default async function ChatRoomPage({
  params,
}: {
  params: { chatroomId: string; locale: string };
}) {
  const { chatroomId, locale } = params;

  const { chatRoomDetail, error } = await _getChatRoomData(chatroomId);

  if (error) {
    redirect({ href: ROUTES.CHAT, locale });
  }

  return (
    <div data-no-navigation>
      <ChatRoom chatRoomDetail={chatRoomDetail!} />
    </div>
  );
}

// Use React cache to ensure only one fetch in the same request
const _getChatRoomData = async (chatroomId: string) => {
  const supabase = createServerSupabase('user');
  try {
    const chatRoomDetail = await fetchChatRoomDetail(supabase, chatroomId);
    return { chatRoomDetail, error: null };
  } catch (error) {
    return { chatRoomDetail: null, error };
  }
};
