'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { CheckActiveCircle } from '@/assets/icons';
import {
  coinsInfoByWorkAtom,
  isConfirmationModalAtom,
} from '@/atoms/chatroomAtom';
import { Button, Modal } from '@/components';
import { useRouter } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

type ModalConfirmationRef = {
  open: () => void;
  close: () => void;
};

const ModalConfirmation = React.forwardRef<ModalConfirmationRef>((_, ref) => {
  const t = useTranslations('modal_confirmation_chat_room');
  const router = useRouter();
  const [confirmationModalInfoAtom, setConfirmationModalInfoAtom] = useAtom(
    isConfirmationModalAtom
  );

  const closeHandler = () => {
    setConfirmationModalInfoAtom({ isOpen: false });
  };

  const handleConfirm = () => {
    setConfirmationModalInfoAtom({ isOpen: false });
    router.push(ROUTES.MANAGEMENT.MY_CASH);
  };

  return (
    <>
      <Modal
        open={confirmationModalInfoAtom?.isOpen}
        onCancel={() => {
          closeHandler();
        }}
        title={
          <div className="flex items-center gap-8 text-14 font-semibold text-gray-00">
            <CheckActiveCircle className="size-18 text-primary" />
            {t('confirmation_title')}
          </div>
        }
        footer={
          <div className="flex w-full items-center gap-8">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleConfirm}
            >
              {t('charge_cash')}
            </Button>
          </div>
        }
      >
        <div
          className={cx(
            'container flex flex-col whitespace-pre-line text-center text-14'
          )}
        >
          {t('confirmation_description')}
        </div>
      </Modal>
    </>
  );
});

ModalConfirmation.displayName = 'ModalConfirmation';

export default ModalConfirmation;
