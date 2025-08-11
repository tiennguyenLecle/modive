import { getTranslations } from 'next-intl/server';

import { Header } from '@/components';

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

export default function Home() {
  return (
    <>
      <Header showLogoText showSearchIcon showAlarmIcon showCashIcon />
      <main>
        <HomeClient />
      </main>
    </>
  );
}
