import { getTranslations } from 'next-intl/server';

import { Navigation } from '@/components';
import MenuTab from '@/components/MenuTab';
import { ChatApi } from '@/lib/api/server';
import { auth } from '@/lib/auth';

import ChatView from './ChatView.client';

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = await getTranslations({ namespace: 'chat_page.metadata', locale });
  return {
    title: t('title'),
    description: t('description'),
  };
};

export default async function Home() {
  const t = await getTranslations();
  const session = await auth();
  if (!session?.user?.id) {
    return <div>No session</div>;
  }
  const chatSession: any = await ChatApi.searchSessionsByUserId(
    session.user.id
  );
  const chatBotName = process.env.DIT_CHATBOT_NAME;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-56 items-center justify-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">Chat</h1>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <MenuTab
          tabs={[
            {
              key: 'general',
              label: t('chat.generalization'),
              children: <div>Generalization</div>,
            },
            {
              key: 'chapter',
              label: t('chat.chapter'),
              children: <div>Chapter</div>,
            },
          ]}
          defaultActiveKey="general"
        />
        <ChatView sessions={chatSession.data} chatBotName={chatBotName!} />
      </div>
      <Navigation />
    </div>
  );
}
