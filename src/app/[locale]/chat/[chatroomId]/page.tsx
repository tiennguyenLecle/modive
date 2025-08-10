import { getTranslations } from 'next-intl/server';

import { ChatApi } from '@/lib/api/server';

import ChatRoom from './ChatRoom.client';

export const revalidate = 0;

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
  const chatBotName = process.env.DIT_CHATBOT_NAME;

  const res = await ChatApi.getMessages(chatroomId, undefined, 20);

  return (
    <div>
      <ChatRoom messages={res.data} chatBotName={chatBotName!} />
    </div>
  );
}
