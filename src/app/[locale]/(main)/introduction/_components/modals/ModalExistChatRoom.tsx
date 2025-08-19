'use client';

import React, { useImperativeHandle, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, Spinner } from '@/components';

export type ModalExistChatRoomDecision = 'existing' | 'new';

interface ModalExistChatRoomHandle {
  open: () => Promise<ModalExistChatRoomDecision>;
  close: () => void;
}

interface ModalExistChatRoomProps {
  loading?: boolean;
}

const ModalExistChatRoom = React.forwardRef<
  ModalExistChatRoomHandle,
  ModalExistChatRoomProps
>(({ loading = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('introduction.modal_existing_chat_room');

  const promiseActions = useRef<{
    resolve: (value: ModalExistChatRoomDecision) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setIsOpen(true);
        return new Promise<ModalExistChatRoomDecision>((resolve, reject) => {
          promiseActions.current = { resolve, reject };
        });
      },
      close: () => {
        setIsOpen(false);
      },
    }),
    []
  );

  const handleConfirm = (decision: ModalExistChatRoomDecision) => {
    promiseActions.current?.resolve(decision);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        promiseActions.current?.reject('Modal closed by user');
      }}
      footer={
        <div className="flex w-full flex-col">
          <Button
            variant="primary"
            className="mb-8"
            onClick={() => handleConfirm('existing')}
            disabled={loading}
          >
            {t('existing_chat_room_movement')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleConfirm('new')}
            disabled={loading}
          >
            {loading && <Spinner />}
            {t('making_a_new_chat_room')}
          </Button>
        </div>
      }
    >
      <div className="container flex flex-col gap-16 text-center">
        <p>{t('description_1')}</p>
        <p>{t('description_2')}</p>
      </div>
    </Modal>
  );
});

ModalExistChatRoom.displayName = 'ModalExistChatRoom';

export default ModalExistChatRoom;
