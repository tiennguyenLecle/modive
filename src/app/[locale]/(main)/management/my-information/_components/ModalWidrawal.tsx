'use client';

import React, { useImperativeHandle, useState } from 'react';
import { useTranslations } from 'next-intl';

import { BaselineError } from '@/assets/icons';
import { Button, Modal } from '@/components';

type ModalWidrawalRef = {
  open: () => void;
  close: () => void;
};

const ModalWidrawal = React.forwardRef<ModalWidrawalRef>((_, ref) => {
  const t = useTranslations('my_information');

  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: closeHandler,
  }));

  const handleConfirm = async () => {
    alert('This feature is coming soon');
    closeHandler();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeHandler}
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
          <Button variant="secondary" className="flex-1" onClick={closeHandler}>
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
