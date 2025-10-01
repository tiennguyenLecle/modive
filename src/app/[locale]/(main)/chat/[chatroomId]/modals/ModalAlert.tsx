'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { CheckActiveCircle } from '@/assets/icons';
import {
  coinsInfoByWorkAtom,
  isAlertModalAtom,
  isConfirmationModalAtom,
} from '@/atoms/chatroomAtom';
import { Button, Modal } from '@/components';
import { cx } from '@/utils/method';

type ModalAlertRef = {
  open: () => void;
  close: () => void;
};

const ModalAlert = React.forwardRef<ModalAlertRef>((_, ref) => {
  const t = useTranslations('modal_alert_chat_room');
  const [alertModalInfoAtom, setAlertModalInfoAtom] = useAtom(isAlertModalAtom);
  const [, setConfirmationModalInfoAtom] = useAtom(isConfirmationModalAtom);
  const [coinsInfoByWork, setCoinsInfoByWork] = useAtom(coinsInfoByWorkAtom);

  const closeHandler = () => {
    setAlertModalInfoAtom({ isOpen: false, workTitle: '' });
    setCoinsInfoByWork({
      ...coinsInfoByWork,
      is_insufficient: true,
    });
  };

  const handleConfirm = () => {
    setAlertModalInfoAtom({ isOpen: false, workTitle: '' });
    setConfirmationModalInfoAtom({ isOpen: true });
    setCoinsInfoByWork({
      ...coinsInfoByWork,
      is_insufficient: true,
    });
  };

  return (
    <>
      <Modal
        open={alertModalInfoAtom?.isOpen}
        onCancel={() => {
          closeHandler();
        }}
        title={
          <div className="flex items-center gap-8 text-14 font-semibold text-gray-00">
            <CheckActiveCircle className="size-18 text-primary" />
            {t('alert_title')}
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
          {t('alert_description', { workTitle: alertModalInfoAtom?.workTitle })}
        </div>
      </Modal>
    </>
  );
});

ModalAlert.displayName = 'ModalAlert';

export default ModalAlert;
