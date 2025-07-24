import { getTranslations } from 'next-intl/server';

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
    <div className="container flex flex-1 flex-col items-center justify-center">
      <ChatView />
    </div>
  );
}
