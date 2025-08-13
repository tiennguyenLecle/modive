import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';

import { SubContentBlock, useCMSInterface } from '@/lib/context/CMSInterface';

export function SortableItem({
  id,
  blockId,
  subBlock,
  handleOpenModal,
}: {
  id: string;
  blockId: string;
  subBlock: SubContentBlock;
  handleOpenModal: (blockId: string, subId: string) => void;
}) {
  const t = useTranslations('cms.interface');

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const { deleteSubBlock } = useCMSInterface();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex gap-8">
        <Button block onClick={() => handleOpenModal(blockId, subBlock.id)}>
          {t('loadContent')}
        </Button>
        <Button
          {...listeners} // ⬅ Only here — drag starts when pressing this
          style={{ cursor: 'grab' }}
        >
          ⇅
        </Button>
        <Button danger onClick={() => deleteSubBlock(blockId, subBlock.id)}>
          {t('delete')}
        </Button>
      </div>
    </div>
  );
}
