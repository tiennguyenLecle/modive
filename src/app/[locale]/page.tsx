import { getTranslations } from 'next-intl/server';

import Banner2 from '@/assets/images/banner2.svg';
import { Recommendation } from '@/components/Recommendation';

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
  const t = await getTranslations();

  return (
    <div>
      <Banner2 className="aspect-[9/5] w-full" />
      <div className="flex flex-col gap-12 bg-gray-100 py-16">
        <Recommendation.Container />
        <Recommendation.Container />
      </div>
    </div>
  );
}
