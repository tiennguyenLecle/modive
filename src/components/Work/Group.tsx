import { ComponentProps } from 'react';

import { WorkType } from '@/types/work';
import { getPublicUrl } from '@/utils/method';

import WorkItem from './Item';

type WorkGroupProps = ComponentProps<'div'> & {
  groupTitle: string;
  blocks: WorkType[];
  onItemClick?: (workId: string) => void;
};

const WorkGroup = ({
  groupTitle,
  blocks,
  onItemClick,
  ...rest
}: WorkGroupProps) => {
  return (
    <div className="pb-12 pt-16" {...rest}>
      <h2 className="mb-16 flex items-center gap-8 px-16 text-20 font-medium text-gray-00">
        {/* <span className="text-20 font-bold text-primary">모다이브</span> */}
        {groupTitle}
      </h2>
      <div
        className="no-scrollbar flex items-start gap-4 overflow-x-auto pl-12"
        {...rest}
      >
        {blocks.map(block => (
          <WorkItem
            key={block.id}
            title={block.title}
            bannerImg={getPublicUrl(block.thumbnail_key)}
            characters={block.characters}
            onClick={() => {
              onItemClick?.(block.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkGroup;
