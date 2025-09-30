import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Info } from '@/assets/icons';
import { Button, Modal } from '@/components';

type ModalNotOldEnoughRef = {
  open: () => void;
  close: () => void;
};

const ModalNotOldEnough = forwardRef<ModalNotOldEnoughRef>((_, ref) => {
  const t = useTranslations('join_membership.modal_not_old_enough');
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

  return (
    <Modal
      open={isOpen}
      header={
        <div className="flex items-center space-x-4">
          <Info className="inline-block size-18 text-primary" />
          <span className="text-16 font-semibold text-gray-00">
            {t('alarm')}
          </span>
        </div>
      }
      onCancel={() => closeHandler()}
      footer={
        <div className="flex gap-8">
          <Button variant="secondary" onClick={closeHandler}>
            {t('cancellation')}
          </Button>
          <Button variant="primary" onClick={closeHandler}>
            {t('check')}
          </Button>
        </div>
      }
      zIndex={100}
    >
      <div className="whitespace-pre-wrap px-16 text-center">
        {t('description')}
      </div>
    </Modal>
  );
});

export default ModalNotOldEnough;
