import React, { ComponentProps } from 'react';

import { CharacterType } from '@/types/character';
import { cx } from '@/utils/method';

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
  return (
    <div className={cx('flex flex-col bg-white', className)} {...props}>
      {characters.map((character, i) => (
        <CharacterCardItem
          key={character.id}
          character={character}
          onClickItem={itemProps?.onClick}
        />
      ))}
    </div>
  );
};

export default CharacterCardList;
