'use client';

import React, { useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, ModalHandle } from '@/components';

const ModalGuideToUse = React.forwardRef<ModalHandle>((_, ref) => {
  const t = useTranslations('introduction.modal_existing_chat_room');

  const internalModalRef = useRef<ModalHandle>(null);

  // Use useImperativeHandle to connect the ref passed from the outside
  // to the internal ref. Whenever the parent component uses ref, it will
  // actually interact with `internalModalRef`.
  useImperativeHandle(ref, () => internalModalRef.current!, []);

  const handleClose = () => {
    internalModalRef.current?.close();
  };

  const handleConfirm = async () => {
    alert('TODO: open existing chat room');
    handleClose();
  };

  return (
    <Modal
      ref={internalModalRef}
      footer={
        <div className="">
          <Button variant="primary" className="mb-8" onClick={handleConfirm}>
            {t('existing_chat_room_movement')}
          </Button>
          <Button variant="secondary" className="mb-8" onClick={handleConfirm}>
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

ModalGuideToUse.displayName = 'ModalGuideToUse';

export default ModalGuideToUse;
