import React, { ComponentProps } from 'react';

import ContentsCardList from '@/components/Recommendation/ContentsCardList';

type RecommendationProps = ComponentProps<'div'> & {};

const RecommendationContainer = ({ ...rest }: RecommendationProps) => {
  return (
    <div className="flex flex-col gap-16 bg-gray-100 py-16" {...rest}>
      <h2 className="flex items-center gap-8 px-16 text-20 font-medium text-gray-00">
        <span className="text-20 font-bold text-primary">모다이브</span>
        맘을 훔치러 왔소
      </h2>
      <div className="pl-16">
        <ContentsCardList />
      </div>
    </div>
  );
};

export default RecommendationContainer;
