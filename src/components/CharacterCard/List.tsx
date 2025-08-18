import React, { ComponentProps } from 'react';

import { CharacterType } from '@/types/character';
import { cx } from '@/utils/method';

import CharacterCardItem from './Item';

type CharacterCardListProps = ComponentProps<'div'> & {
  itemProps?: { onClick?: () => void };
  characters: CharacterType[];
};

const CharacterCardList = ({
  itemProps,
  characters,
  className,
  ...props
}: CharacterCardListProps) => {
  return (
    <div className={cx('flex flex-col bg-gray-100', className)} {...props}>
      {characters.map((character, i) => (
        <CharacterCardItem
          key={character.id}
          character={character}
          {...itemProps}
        />
      ))}
    </div>
  );
};

export default CharacterCardList;
