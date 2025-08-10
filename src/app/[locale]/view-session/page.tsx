import { getTranslations } from 'next-intl/server';

import { Navigation } from '@/components';

import ViewSession from './ViewSession.client';

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
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-56 items-center justify-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">View Session</h1>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto">
        <div> Client Auth State</div>
        <ViewSession />
      </div>
      <Navigation />
    </div>
  );
}
