import { getTranslations } from 'next-intl/server';

import { Header } from '@/components';

// import { createServerSupabase } from '@/lib/supabase/factory.server';
// import { fetchInterface } from '@/lib/supabase/swr/interface';

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

export default async function Home() {
  // const supabase = createServerSupabase('user');
  // const interfaceData = await fetchInterface(supabase);
  return (
    <>
      <Header showLogoText showSearchIcon showAlarmIcon showCashIcon />
      <main>
        <HomeClient /> {/* fallbackData={interfaceData} */}
      </main>
    </>
  );
}
