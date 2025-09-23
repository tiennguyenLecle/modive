'use client';

import { Minus, Plus } from '@/assets/icons';
import Button from '@/components/Button';

export default function AddItem({
  itemCount,
  onAdd,
  onRemove,
  isDisabledAddButton,
  isDisabledRemoveButton,
}: {
  itemCount: number;
  onAdd: () => void;
  onRemove: () => void;
  isDisabledAddButton: boolean;
  isDisabledRemoveButton: boolean;
}) {
  return (
    <div className="flex flex-row gap-8">
      <Button
        variant="secondary"
        className="h-[28rem] min-w-[28rem] rounded-max !p-0 text-20 disabled:border-gray-80 disabled:bg-gray-80 disabled:text-gray-30"
        disabled={isDisabledAddButton}
        onClick={() => {
          onAdd();
        }}
      >
        <Plus className="text-14 text-gray-00" width={14} height={14} />
      </Button>
      <span className="min-w-40 px-12 py-4 text-center text-14 font-bold text-gray-30">
        {itemCount}
      </span>
      <Button
        variant="secondary"
        className="h-[28rem] min-w-[28rem] rounded-max !p-0 text-20 disabled:border-gray-80 disabled:bg-gray-80 disabled:text-gray-30"
        disabled={isDisabledRemoveButton}
        onClick={() => {
          onRemove();
        }}
      >
        <Minus className="text-14 text-gray-00" />
      </Button>
    </div>
  );
}
