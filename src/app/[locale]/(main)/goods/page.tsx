import { getTranslations } from 'next-intl/server';

import GoodsClient from '@/app/[locale]/(main)/goods/Goods.client';
import { Header } from '@/components';

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = await getTranslations({ namespace: 'goods_page.metadata', locale });
  return {
    title: t('title'),
    description: t('description'),
  };
};

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ namespace: 'goods_page', locale });

  return (
    <>
      <Header
        showLogoText
        showSearchIcon
        showCartIcon
        className="border-b border-gray-80"
      />
      <main className="flex flex-1 flex-col items-center justify-center">
        <GoodsClient />
      </main>
    </>
  );
}
