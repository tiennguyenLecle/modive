'use client';

import React from 'react';
import Image from 'next/image';

import { Close } from '@/assets/icons';
import { Modal } from '@/components';
import { MessageInfoProps } from '@/lib/chatbot-modules';

type PreviewImageModalRef = {
  item: MessageInfoProps;
  close: () => void;
  characterName: string;
};

const PreviewImageModal = React.forwardRef<
  PreviewImageModalRef,
  MessageInfoProps
>(({ item, close, characterName }, ref) => {
  if (!item) return null;
  return (
    <Modal
      open={!!item}
      onCancel={close}
      modalParentClassName="!p-0 rounded-[0] z-[1001] bg-gray-10"
      containerClassName="w-full h-full max-w-full max-h-full rounded-none !bg-gray-10 p-0"
      showCloseButton={false}
      header={
        <div className="flex w-full items-center justify-between gap-12 pt-28">
          <div className="flex max-w-[220px] flex-1 items-center justify-between gap-12 text-white">
            <span className="truncate text-16 font-bold">{characterName}</span>
            <span className="min-w-140 truncate text-12 font-normal">
              {item.createdDate} {item.createdAt}
            </span>
          </div>
          <button
            className="flex size-24 items-center justify-center"
            aria-label="Close"
            onClick={close}
          >
            <Close className="size-16 text-white" />
          </button>
        </div>
      }
    >
      <div className="container flex h-full w-full items-center justify-center">
        <div className="flex items-center justify-center">
          <Image
            src={item?.imageUrl || ''}
            alt={item?.message}
            width={320}
            height={320}
            className="h-auto w-full transition-all duration-300"
          />
        </div>
      </div>
    </Modal>
  );
});

PreviewImageModal.displayName = 'PreviewImageModal';

export default PreviewImageModal;
