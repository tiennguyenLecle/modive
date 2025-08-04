import { getTranslations } from 'next-intl/server';

import { ChatApi } from '@/lib/api/server';

import ChatRoom from './ChatRoom.client';

export async function generateMetadata({
  params,
}: {
  params: { chatroomId: string };
}) {
  const t = await getTranslations('chat_page.room');
  const { chatroomId } = params;
  const res = await ChatApi.getMessages(chatroomId);
  return {
    title: 'Kang Lee -hyun', // TODO: Update it to character name
    description: t('metadata.description', { characterName: 'Kang Lee -hyun' }),
  };
}

export default async function ChatRoomPage({
  params,
}: {
  params: { chatroomId: string };
}) {
  const { chatroomId } = params;

  const res = await ChatApi.getMessages(chatroomId);
  console.log(res);

  return (
    <div>
      <ChatRoom messages={res.data} />
    </div>
  );
}
