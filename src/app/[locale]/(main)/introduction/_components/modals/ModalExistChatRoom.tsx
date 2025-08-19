'use client';

import React, { useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, ModalHandle } from '@/components';

export type ModalExistChatRoomDecision = 'existing' | 'new';

export interface ModalExistChatRoomHandle {
  open: () => Promise<ModalExistChatRoomDecision>;
  close: () => void;
}

const ModalExistChatRoom = React.forwardRef<ModalExistChatRoomHandle>(
  (_, ref) => {
    const t = useTranslations('introduction.modal_existing_chat_room');

    const internalModalRef = useRef<ModalHandle>(null);
    const promiseActions = useRef<{
      resolve: (value: ModalExistChatRoomDecision) => void;
      reject: (reason?: any) => void;
    } | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          internalModalRef.current?.open();
          return new Promise<ModalExistChatRoomDecision>((resolve, reject) => {
            promiseActions.current = { resolve, reject };
          });
        },
        close: () => {
          internalModalRef.current?.close();
        },
      }),
      []
    );

    const closeCallback = () => {
      promiseActions.current?.reject('Modal closed by user');
    };

    const handleConfirm = (decision: ModalExistChatRoomDecision) => {
      promiseActions.current?.resolve(decision);
      internalModalRef.current?.close();
    };

    return (
      <Modal
        ref={internalModalRef}
        closeCallback={closeCallback}
        footer={
          <div className="flex w-full flex-col">
            <Button
              variant="primary"
              className="mb-8"
              onClick={() => handleConfirm('existing')}
            >
              {t('existing_chat_room_movement')}
            </Button>
            <Button variant="secondary" onClick={() => handleConfirm('new')}>
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
  }
);

ModalExistChatRoom.displayName = 'ModalExistChatRoom';

export default ModalExistChatRoom;
