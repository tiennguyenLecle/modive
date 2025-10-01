'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { CheckActiveCircle } from '@/assets/icons';
import {
  coinsInfoByWorkAtom,
  isAlertAvailableCashModalAtom,
} from '@/atoms/chatroomAtom';
import { Button, Modal } from '@/components';
import { cx } from '@/utils/method';

type ModalAlertAvailableCashRef = {
  open: () => void;
  close: () => void;
};

const ModalAlertAvailableCash = React.forwardRef<ModalAlertAvailableCashRef>(
  (_, ref) => {
    const t = useTranslations('modal_alert_available_cash_chat_room');
    const [
      alertAvailableCashModalInfoAtom,
      setAlertAvailableCashModalInfoAtom,
    ] = useAtom(isAlertAvailableCashModalAtom);
    const [coinsInfoByWork, setCoinsInfoByWork] = useAtom(coinsInfoByWorkAtom);

    const closeHandler = () => {
      handleConfirm();
    };

    const handleConfirm = () => {
      setAlertAvailableCashModalInfoAtom({ isOpen: false });
      setCoinsInfoByWork({
        ...coinsInfoByWork,
        is_insufficient: false,
      });
    };

    return (
      <>
        <Modal
          open={alertAvailableCashModalInfoAtom?.isOpen}
          onCancel={() => {
            closeHandler();
          }}
          title={
            <div className="flex items-center gap-8 text-14 font-semibold text-gray-00">
              <CheckActiveCircle className="size-18 text-primary" />
              {t('available_cash_title')}
            </div>
          }
          footer={
            <div className="flex w-full items-center gap-8">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleConfirm}
              >
                {t('continue')}
              </Button>
            </div>
          }
        >
          <div
            className={cx(
              'container flex flex-col whitespace-pre-line text-center text-14'
            )}
          >
            {t('available_cash_description')}
          </div>
        </Modal>
      </>
    );
  }
);

ModalAlertAvailableCash.displayName = 'ModalAlertAvailableCash';

export default ModalAlertAvailableCash;
