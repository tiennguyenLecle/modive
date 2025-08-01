import { getTranslations } from 'next-intl/server';

import MenuTab from '@/components/MenuTab';

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

  return (
    <div className="">
      <div className="flex h-56 items-center justify-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">Chat</h1>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <MenuTab
          tabs={[
            {
              key: 'chat',
              label: t('chat.generalization'),
              children: <div>Generalization</div>,
            },
            {
              key: 'chat',
              label: t('chat.chapter'),
              children: <div>Chapter</div>,
            },
          ]}
        />
      </div>
      <ChatView />
    </div>
  );
}
