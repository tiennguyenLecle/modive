import React, { ComponentProps } from 'react';

import ContentsCard from './ContentsCard';

type ContentsCardListProps = ComponentProps<'div'> & {};

const ContentsCardList = ({ ...rest }: ContentsCardListProps) => {
  return (
    <div
      className="no-scrollbar flex items-start gap-12 overflow-x-auto"
      {...rest}
    >
      <ContentsCard
        title="지붕뚫고 하이킥!"
        bannerImg="https://picsum.photos/seed/4/140/80"
      />
      <ContentsCard
        title="지붕뚫고 하이킥!"
        bannerImg="https://picsum.photos/seed/4/140/80"
      />
      <ContentsCard
        title="지붕뚫고 하이킥!"
        bannerImg="https://picsum.photos/seed/4/140/80"
      />
    </div>
  );
};

export default ContentsCardList;
