import React, { ComponentProps } from 'react';

import { cx } from '@/utils/method';

import CharacterCardItem from './Item';

type CharacterCardListProps = ComponentProps<'div'> & {
  itemProps?: ComponentProps<typeof CharacterCardItem>;
};

const CharacterCardList = ({
  itemProps,
  className,
  ...props
}: CharacterCardListProps) => {
  return (
    <div className={cx('flex flex-col bg-gray-100', className)} {...props}>
      {Array.from({ length: 4 }).map((_, i) => (
        <CharacterCardItem key={i} {...itemProps} />
      ))}
    </div>
  );
};

export default CharacterCardList;
