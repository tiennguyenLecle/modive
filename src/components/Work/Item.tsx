import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { CharacterType } from '@/types/character';
import { cx, getPublicUrl } from '@/utils/method';

type ContentsCardProps = ComponentProps<'div'> & {
  title: string;
  bannerImg: string;
  characters?: CharacterType[];
};

const WorkItem = ({
  title,
  bannerImg,
  characters,
  ...rest
}: ContentsCardProps) => {
  const t = useTranslations('contentsCard');

  return (
    <div
      className="transition-color cursor-pointer rounded-4 p-4 duration-200 hover:bg-gray-90"
      {...rest}
    >
      <div className="mb-12 h-80 w-140 overflow-hidden rounded-4 border border-gray-80 bg-gray-100">
        <Image
          src={bannerImg}
          alt="Contents Card"
          width={140}
          height={80}
          className="aspect-[7/4] object-fill"
          loading="lazy"
        />
      </div>
      <h2 className="mb-8 text-16 font-semibold text-gray-00">{title}</h2>
      <p className="mb-4 text-12 font-semibold text-gray-40">
        {t('conversation')}
      </p>
      <div className="avatar-list flex items-center">
        {characters?.map((character, index) => (
          <div
            key={character.id}
            className={cx(
              'overflow-hidden rounded-max border border-white',
              index !== 0 && '-ml-4'
            )}
            style={{
              boxShadow: '0 2rem 3rem 0 rgba(0, 0, 0, 0.25)',
            }}
          >
            <Image
              src={getPublicUrl(character.avatar_key)}
              alt={character.name}
              width={24}
              height={24}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkItem;
