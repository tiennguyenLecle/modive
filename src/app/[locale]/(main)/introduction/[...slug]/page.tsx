'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Direction } from '@/assets/icons';
import WeMarriedBanner from '@/assets/images/we-married-banner.png';
import { ChatCard, MenuTab } from '@/components';

const IntroductionDetailPage = () => {
  const t = useTranslations('introduction');

  return (
    <main className="bg-white">
      <Image
        src={WeMarriedBanner}
        alt="We Married"
        priority
        width={360}
        height={232}
        className="aspect-[360/232] h-auto w-full object-cover"
      />
      <div className="flex flex-col gap-13 p-16">
        <h2 className="text-22 font-semibold text-gray-20">We married</h2>
        <div>
          <p className="text-14 font-normal leading-1.66 tracking-0.5 text-gray-00">
            Virtual marriage back in 2025!
          </p>
          <p className="text-14 font-normal leading-1.66 tracking-0.5 text-gray-00">
            Can you have a real heart between business and emotions?
          </p>
          <p className="text-14 font-normal leading-1.66 tracking-0.5 text-gray-00">
            #Virtual marriage #business #private life
          </p>
        </div>
        <button className="flex h-48 w-full items-center justify-center gap-8 rounded-4 bg-primary">
          <p className="text-16 font-bold text-gray-100">
            {t('chapter_entrance')}
          </p>
          <Direction color="white" className="h-16 w-16" />
        </button>
      </div>
      <MenuTab
        tabs={[
          {
            key: 'chat',
            label: t('chat'),
            children: <ChatCard.List />,
          },
          {
            key: 'personalRelationship',
            label: t('personal_relationship'),
            children: <div className="p-16">Story content goes here.</div>,
          },
        ]}
        defaultActiveKey="chat"
      />
    </main>
  );
};

export default IntroductionDetailPage;
