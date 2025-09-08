import React, { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

import { CharacterType } from '@/types/character';
import { cx } from '@/utils/method';

import Empty from '../Empty';
import CharacterCardItem from './Item';

type CharacterCardListProps = ComponentProps<'div'> & {
  itemProps?: { onClick?: (character: CharacterType) => void };
  characters: CharacterType[];
};

const CharacterCardList = ({
  itemProps,
  characters,
  className,
  ...props
}: CharacterCardListProps) => {
  const t = useTranslations('introduction.characters');

  return characters.length > 0 ? (
    <div className={cx('flex flex-col bg-white px-8', className)} {...props}>
      {characters.map((character, i) => (
        <CharacterCardItem
          key={character.id}
          character={character}
          onClickItem={itemProps?.onClick}
        />
      ))}
    </div>
  ) : (
    <Empty message={t('empty')} className="min-h-200" />
  );
};

export default CharacterCardList;
