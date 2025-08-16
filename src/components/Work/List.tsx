import { ComponentProps } from 'react';

import { WorkType } from '@/types/work';
import { getPublicUrl } from '@/utils/method';

import ContentsCard from './Item';

type WorkListProps = ComponentProps<'div'> & {
  blocks: WorkType[];
};

const WorkList = ({ blocks, ...rest }: WorkListProps) => {
  return (
    <div
      className="no-scrollbar flex items-start gap-4 overflow-x-auto pl-12"
      {...rest}
    >
      {blocks.map(block => (
        <ContentsCard
          key={block.id}
          title={block.title}
          bannerImg={getPublicUrl(block.thumbnail_key)}
          characters={block.characters}
        />
      ))}
    </div>
  );
};

export default WorkList;
