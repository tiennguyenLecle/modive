'use client';

import React, { useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, ModalHandle } from '@/components';

const ModalGuideToUse = React.forwardRef<ModalHandle>((_, ref) => {
  const t = useTranslations('introduction.modal_guide_to_use');

  const internalModalRef = useRef<ModalHandle>(null);

  // Use useImperativeHandle to connect the ref passed from the outside
  // to the internal ref. Whenever the parent component uses ref, it will
  // actually interact with `internalModalRef`.
  useImperativeHandle(ref, () => internalModalRef.current!, []);

  const handleClose = () => {
    internalModalRef.current?.close();
  };

  const handleConfirm = async () => {
    alert('TODO: start a conversation');
    handleClose();
  };

  return (
    <Modal
      ref={internalModalRef}
      header={<h3 className="text-center uppercase">{t('title')}</h3>}
      footer={
        <div className="">
          <Button variant="primary" className="mb-8" onClick={handleConfirm}>
            {t('agree_and_start')}
          </Button>

          <label className="flex items-center justify-center gap-4">
            <input type="checkbox" />
            <span>{t('do_not_see_again')}</span>
          </label>
        </div>
      }
    >
      <div className="container flex flex-col gap-16 text-center">
        <p>{t('description_1')}</p>
        <p>{t('description_2')}</p>
        <p>{t('description_3')}</p>
        <p>{t('description_4')}</p>
      </div>
    </Modal>
  );
});

ModalGuideToUse.displayName = 'ModalGuideToUse';

export default ModalGuideToUse;
