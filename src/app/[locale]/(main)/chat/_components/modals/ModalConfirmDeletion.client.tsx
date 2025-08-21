'use client';

import React, { useImperativeHandle, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal } from '@/components';

import { useDeleteChatRoom } from '../../_hooks/useChatRoom';

type ModalConfirmDeletionRef = {
  open: (id: string) => void;
  close: () => void;
};

type ModalConfirmDeletionProps = {
  actionCallback: () => void;
};

const ModalConfirmDeletion = React.forwardRef<
  ModalConfirmDeletionRef,
  ModalConfirmDeletionProps
>(({ actionCallback }, ref) => {
  const t = useTranslations();

  const [chatroomId, setChatroomId] = useState<string | null>(null);
  const { trigger: deleteChatRoom, isMutating: isDeleting } =
    useDeleteChatRoom();

  const closeHandler = () => {
    setChatroomId(null);
  };

  useImperativeHandle(ref, () => ({
    open: chatroom => {
      setChatroomId(chatroom);
    },
    close: closeHandler,
  }));

  const handleConfirmDelete = async () => {
    if (!chatroomId) return;
    await deleteChatRoom(
      { chatroomId: chatroomId },
      {
        onSuccess: () => {
          actionCallback();
          closeHandler();
        },
      }
    );
  };

  return (
    <Modal
      open={!!chatroomId}
      onCancel={closeHandler}
      containerClassName="!w-320 rounded-12"
      title={t('chat_page.modal_options.confirm_deletion_title')}
      footer={
        <div className="flex justify-end gap-8">
          <Button
            variant="secondary"
            onClick={closeHandler}
            disabled={isDeleting}
          >
            {t('general.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            loading={isDeleting}
          >
            {t('general.confirm')}
          </Button>
        </div>
      }
    >
      <div className="container flex flex-col gap-24 text-center">
        <p className="text-16 font-normal text-gray-00">
          {t('chat_page.modal_options.confirm_deletion_description')}
        </p>
      </div>
    </Modal>
  );
});

ModalConfirmDeletion.displayName = 'ModalConfirmDeletion';

export default ModalConfirmDeletion;
