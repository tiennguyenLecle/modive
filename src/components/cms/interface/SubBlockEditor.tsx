'use client';

import React from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from '@/components/cms/interface/SortableItem';
import { useCMSInterface } from '@/lib/context/CMSInterface';

export default function SubBlockEditor({
  blockId,
  handleOpenModal,
}: {
  blockId: string;
  handleOpenModal: (blockId: string, subId: string) => void;
}) {
  const { contentBlocks, reorderSubBlocks } = useCMSInterface();
  const block = contentBlocks.find(b => b.id === blockId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = block?.subBlocks.findIndex(s => s.id === active.id) ?? -1;
    const toIndex = block?.subBlocks.findIndex(s => s.id === over.id) ?? -1;

    if (fromIndex >= 0 && toIndex >= 0) {
      reorderSubBlocks(blockId, fromIndex, toIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={block?.subBlocks.map(s => s.id) || []}
        strategy={verticalListSortingStrategy}
      >
        {block?.subBlocks.map(sub => (
          <SortableItem
            key={sub.id}
            id={sub.id}
            blockId={blockId}
            subBlock={sub}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
