import React, { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type ContentsCardProps = ComponentProps<'div'> & {
  title: string;
  bannerImg: string;
  characters?: { image: string; name: string }[];
};

const ContentsCard = ({
  title,
  bannerImg,
  characters,
  ...rest
}: ContentsCardProps) => {
  const t = useTranslations('contentsCard');

  return (
    <div className="flex flex-col gap-12" {...rest}>
      <div className="h-80 w-140 overflow-hidden rounded-4 border border-gray-80 bg-gray-100">
        <Image
          src={bannerImg}
          alt="Contents Card"
          width={140}
          height={80}
          className="aspect-[7/4] object-fill"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-8">
        <h2 className="text-16 font-semibold text-gray-00"></h2>
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
