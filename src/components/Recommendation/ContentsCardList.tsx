import React, { ComponentProps } from 'react';

import ContentsCard from '@/components/Recommendation/ContentsCard';

type ContentsCardListProps = ComponentProps<'div'> & {};

const ContentsCardList = ({ ...rest }: ContentsCardListProps) => {
  return (
    <div
      className="no-scrollbar flex items-start gap-12 overflow-x-auto"
      {...rest}
    >
      <ContentsCard />
      <ContentsCard />
      <ContentsCard />
    </div>
  );
};

export default ContentsCardList;
