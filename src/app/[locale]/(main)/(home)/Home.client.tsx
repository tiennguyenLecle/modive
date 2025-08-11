'use client';

import { useTranslations } from 'next-intl';

import Banner2 from '@/assets/images/banner2.svg';
import { Header, Recommendation } from '@/components';

export default function HomeClient() {
  const t = useTranslations();

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
