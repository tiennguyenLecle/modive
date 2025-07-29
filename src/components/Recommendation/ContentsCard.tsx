import React, { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type ContentsCardProps = ComponentProps<'div'> & {};

const ContentsCard = ({}: ContentsCardProps) => {
  const t = useTranslations('contentsCard');

  return (
    <div className="flex flex-col gap-12">
      <div className="h-[80px] w-[140px] rounded-4 border border-gray-80 bg-gray-100">
        <Image
          src="https://picsum.photos/seed/4/140/80"
          alt="Contents Card"
          width={140}
          height={80}
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-8">
        <h2 className="text-16 font-semibold text-gray-00">지붕뚫고 하이킥!</h2>
        <div className="flex flex-col gap-4">
          <p className="text-12 font-semibold text-gray-40">
            {t('conversation')}
          </p>
          <div className="avatar-list"></div>
        </div>
      </div>
    </div>
  );
};

export default ContentsCard;
