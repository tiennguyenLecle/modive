'use client';

import React, { useImperativeHandle, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Pin, Trash } from '@/assets/icons';
import { Modal } from '@/components';

type ModalOptionsRef = {
  open: (chatroomId: string) => void;
  close: () => void;
};

const ModalOptions = React.forwardRef<ModalOptionsRef>((_, ref) => {
  const t = useTranslations('chat_page.modal_options');
  const [chatroomId, setChatroomId] = useState<string | null>(null);

  const closeHandler = () => {
    setChatroomId(null);
  };

  useImperativeHandle(ref, () => ({
    open: (chatroomId: string) => {
      setChatroomId(chatroomId);
    },
    close: closeHandler,
  }));

  return (
    <Modal
      open={!!chatroomId}
      onCancel={closeHandler}
      showCloseButton={false}
      showHeader={false}
      showFooter={false}
      containerClassName="!w-200 rounded-12"
    >
      <div className="flex w-full flex-col">
        <button
          className="flex h-48 items-center gap-8 px-16 py-4"
          onClick={closeHandler}
        >
          <Pin className="size-18 text-gray-00" />
          <p className="text-16 font-normal text-gray-00">{t('top_fixing')}</p>
        </button>
        <hr />
        <button
          className="flex h-48 items-center gap-8 px-16 py-4"
          onClick={closeHandler}
        >
          <Trash className="size-18 text-gray-00" />
          <p className="text-16 font-normal text-gray-00">{t('deletion')}</p>
        </button>
      </div>
    </Modal>
  );
});

ModalOptions.displayName = 'ModalOptions';

export default ModalOptions;
