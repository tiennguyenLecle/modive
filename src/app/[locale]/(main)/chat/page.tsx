import { User } from '@supabase/supabase-js';
import { getTranslations } from 'next-intl/server';

import { Header } from '@/components';
import { createServerSupabase } from '@/lib/supabase/factory.server';

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
  const supabase = createServerSupabase('user');
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header
        pageTitle={t('metadata.title')}
        className="border-b border-gray-80"
      />
      <main className="flex flex-col">
        <ChatView user={user as User} />
      </main>
    </>
  );
}
