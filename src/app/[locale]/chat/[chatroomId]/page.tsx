import { getTranslations } from 'next-intl/server';

import { ChatApi } from '@/lib/api/server';
import { getServerAuth } from '@/lib/authentication/server-auth';

import ChatRoom from './ChatRoom.client';

import '@/styles/variables.css';

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

  const user = await getServerAuth();
  if (!user) {
    return <div>No session</div>;
  }

  return (
    <div>
      <ChatRoom
        currentUserId={user.id}
        messages={res.data ?? []}
        chatBotName={chatBotName!}
      />
    </div>
  );
}
