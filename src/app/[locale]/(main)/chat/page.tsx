import { getTranslations } from 'next-intl/server';

import { Header, MenuTab, SuspenseComponent } from '@/components';
import { ChatApi } from '@/lib/api/server';
import { getServerAuth } from '@/lib/authentication/server-auth';

import ChatView from './ChatView.client';

// import { createServerSupabase } from '@/lib/supabase/factory.server';
// import { fetchMyRooms } from '@/lib/supabase/swr/myrooms';

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

  const mySessions: any = (chatSession as any)?.data?.data ?? [];

  // TODO: Remove this after testing
  // const serverSupabase = createServerSupabase('user');
  // const { data: chatSessions } = await fetchMyRooms(serverSupabase, {
  //   page: 1,
  //   limit: 10,
  //   sort: [],
  //   work_ids: [],
  //   character_ids: [],
  // });

  return <ChatView sessions={mySessions} chatBotName={chatBotName!} />;
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
            },
            {
              key: 'chapter',
              label: t('chapter'),
            },
          ]}
          defaultActiveKey="general"
        />
        <SuspenseComponent>
          <ChatDataLoader />
        </SuspenseComponent>
      </main>
    </>
  );
}
