import { getTranslations } from 'next-intl/server';

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
      <Header pageTitle={t('metadata.title')} />
      <main className="container flex flex-1 flex-col items-center justify-center">
        <h1 className="mb-4 text-20 font-bold">Goods Page</h1>
      </main>
    </>
  );
}
