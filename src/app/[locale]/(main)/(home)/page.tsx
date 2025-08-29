import { getTranslations } from 'next-intl/server';

import { Header } from '@/components';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchInterface } from '@/lib/supabase/swr/interface';

import HomeClient from './Home.client';

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = await getTranslations({ namespace: 'home_page.metadata', locale });
  return {
    title: t('title'),
    description: t('description'),
  };
};

// Cache for 2 minutes (120 seconds) - faster updates for better UX
export const revalidate = 120;

export default async function Home() {
  return (
    <>
      <Header showLogoText showSearchIcon showAlarmIcon showCashIcon />
      <main>
        <HomePageContent />
      </main>
    </>
  );
}

// Separate component for data fetching to enable streaming
async function HomePageContent() {
  const supabase = createServerSupabase('user');
  const interfaceData = await fetchInterface(supabase);

  return <HomeClient interfaceData={interfaceData} />;
}
