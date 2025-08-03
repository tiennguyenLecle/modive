import { getTranslations } from 'next-intl/server';

import { Navigation } from '@/components';
import MenuTab from '@/components/MenuTab';
import { ChatApi } from '@/lib/api/server';

import ChatView from './ChatView';

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

  // let res;
  // try {
  //   // Attempt to log in to the external chat API
  //   res = await ChatApi.login('tien3107@yopmail.com', 'Tien3107@1');
  // } catch (error) {
  //   // If the API call fails (e.g., wrong credentials, server down),
  //   // log the error for debugging on the server side and set `res` to null.
  //   // This prevents the page from crashing and allows the UI to handle the error state.
  //   console.error(
  //     '[ChatPage] Failed to log in to external chat API:',
  //     JSON.stringify(error)
  //   );
  //   res = null;
  // }

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
        <ChatView data={'abc'} />
      </div>
      <Navigation />
    </div>
  );
}
