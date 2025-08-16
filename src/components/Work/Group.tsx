import React, { ComponentProps } from 'react';

import { InterfaceType } from '@/types/interface';
import { WorkType } from '@/types/work';

import ContentsCardList from './List';

type WorkGroupProps = ComponentProps<'div'> & {
  groupTitle: string;
  blocks: WorkType[];
};

const WorkGroup = ({ groupTitle, blocks, ...rest }: WorkGroupProps) => {
  return (
    <div className="pb-12 pt-16" {...rest}>
      <h2 className="mb-16 flex items-center gap-8 px-16 text-20 font-medium text-gray-00">
        {/* <span className="text-20 font-bold text-primary">모다이브</span> */}
        {groupTitle}
      </h2>
      <ContentsCardList blocks={blocks} />
    </div>
  );
};

export default WorkGroup;
