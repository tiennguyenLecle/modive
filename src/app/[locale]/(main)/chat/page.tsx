import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { Header, MenuTab } from '@/components';
import { ChatApi } from '@/lib/api/server';
import { getServerAuth } from '@/lib/authentication/server-auth';

import Loading from '../../loading';
import ChatView from './ChatView.client';

// Async component for chat data
async function ChatDataLoader() {
  const user = await getServerAuth();
  if (!user) {
    return <div>No session</div>;
  }

  const [chatSession, chatBotName] = await Promise.all([
    ChatApi.searchSessionsByUserId(user.id),
    Promise.resolve(process.env.DIT_CHATBOT_NAME),
  ]);

  // TODO: Remove this after testing
  const newChatSession =
    (chatSession as any)?.data?.data?.length < 4
      ? await ChatApi.createSession(user.id)
      : null;

  return (
    <ChatView sessions={(chatSession as any).data} chatBotName={chatBotName!} />
  );
}

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

export const revalidate = 0;

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ namespace: 'chat_page', locale });

  return (
    <>
      <Header pageTitle={t('metadata.title')} />
      <main>
        <MenuTab
          tabs={[
            {
              key: 'general',
              label: t('generalization'),
              children: <div>Generalization</div>,
            },
            {
              key: 'chapter',
              label: t('chapter'),
              children: <div>Chapter</div>,
            },
          ]}
          defaultActiveKey="general"
        />
        <Suspense fallback={<Loading />}>
          <ChatDataLoader />
        </Suspense>
      </main>
    </>
  );
}
