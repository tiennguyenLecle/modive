import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Header, MenuTab } from '@/components';
import { ChatApi } from '@/lib/api/server';
import { getServerAuth } from '@/lib/authentication/server-auth';

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

export const revalidate = 0;

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ namespace: 'chat_page', locale });
  const user = await getServerAuth();
  if (!user) {
    return <div>No session</div>;
  }
  const chatSession: any = await ChatApi.searchSessionsByUserId(user.id);
  const chatBotName = process.env.DIT_CHATBOT_NAME;
  // TODO: Remove this after testing
  const newChatSession =
    chatSession?.data?.data?.length < 4
      ? await ChatApi.createSession(user.id)
      : null;

  console.log('chatSession?.data?.length', chatSession?.data?.data?.length);

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
        <ChatView sessions={chatSession.data} chatBotName={chatBotName!} />
      </main>
    </>
  );
}
