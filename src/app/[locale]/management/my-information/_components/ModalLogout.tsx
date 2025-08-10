import React, { useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { Info } from '@/assets/icons';
import { Button, Modal, ModalHandle } from '@/components';
import { useAuth } from '@/lib/authentication/auth-context';

const ModalLogout = React.forwardRef<ModalHandle>((_, ref) => {
  const t = useTranslations('my_information');
  const { signOut } = useAuth();

  const internalModalRef = useRef<ModalHandle>(null);

  // Use useImperativeHandle to connect the ref passed from the outside
  // to the internal ref. Whenever the parent component uses ref, it will
  // actually interact with `internalModalRef`.
  useImperativeHandle(ref, () => internalModalRef.current!, []);

  const handleClose = () => {
    internalModalRef.current?.close();
  };

  const handleConfirm = async () => {
    await signOut().then(() => {
      handleClose();
    });
  };

  return (
    <Modal
      ref={internalModalRef}
      showCloseButton={false}
      header={
        <div className="flex items-center gap-4">
          <Info className="size-18 text-primary" />
          <p className="text-16 font-semibold text-gray-00">
            {t('log_out_notification')}
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
      <p className="flex min-h-46 items-center justify-center px-16 text-center text-14 font-normal leading-1.66 -tracking-0.5 text-gray-00">
        {t('log_out_description')}
      </p>
    </Modal>
  );
});

ModalLogout.displayName = 'ModalLogout';

export default ModalLogout;
