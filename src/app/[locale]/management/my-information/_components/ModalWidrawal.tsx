'use client';

import React, { useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { BaselineError } from '@/assets/icons';
import { Button, Modal, ModalHandle } from '@/components';

const ModalWidrawal = React.forwardRef<ModalHandle>((_, ref) => {
  const t = useTranslations('my_information');

  const internalModalRef = useRef<ModalHandle>(null);

  // Use useImperativeHandle to connect the ref passed from the outside
  // to the internal ref. Whenever the parent component uses ref, it will
  // actually interact with `internalModalRef`.
  useImperativeHandle(ref, () => internalModalRef.current!, []);

  const handleClose = () => {
    internalModalRef.current?.close();
  };

  const handleConfirm = async () => {
    alert('This feature is coming soon');
    handleClose();
  };

  return (
    <Modal
      ref={internalModalRef}
      showCloseButton={false}
      header={
        <div className="flex items-center gap-4">
          <BaselineError className="size-18 text-primary" />
          <p className="text-16 font-semibold text-gray-00">
            {t('withdrawal_notification')}
          </p>
        </div>
      }
      footer={
        <div className="flex w-full items-center gap-8">
          <Button variant="secondary" className="flex-1" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleConfirm}>
            {t('check')}
          </Button>
        </div>
      }
    >
      <p className="text-center text-14 font-normal leading-1.66 -tracking-0.5 text-gray-00">
        {t('withdrawal_description')}
      </p>
      <p className="text-center text-14 font-normal leading-1.66 -tracking-0.5 text-gray-00">
        {t('withdrawal_description2')}
      </p>
    </Modal>
  );
});

ModalWidrawal.displayName = 'ModalWidrawal';

export default ModalWidrawal;
