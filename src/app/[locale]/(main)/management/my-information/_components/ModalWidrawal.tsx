'use client';

import React, { useImperativeHandle, useState } from 'react';
import { Checkbox } from 'antd';
import { useTranslations } from 'next-intl';

import { BaselineError } from '@/assets/icons';
import { Button, Modal } from '@/components';
import { useServerAction } from '@/hooks/useServerAction';
import { useAuth } from '@/lib/authentication/auth-context';
import { cx } from '@/utils/method';

import { withdrawMyAccount } from '../action';
import styles from './ModalWithdrawal.module.scss';

type ModalWidrawalRef = {
  open: () => void;
  close: () => void;
};

const ModalWidrawal = React.forwardRef<ModalWidrawalRef>((_, ref) => {
  const t = useTranslations('my_information');
  const withdrawAccount = useServerAction(withdrawMyAccount);
  const { signOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

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
    await withdrawAccount.execute();
    await signOut();
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
        <div className="grid grid-cols-2 gap-8">
          <Button variant="secondary" onClick={closeHandler}>
            {t('cancel')}
          </Button>
          <Button
            variant="primary"
            className={cx(
              '!opacity-100',
              (!isChecked1 || !isChecked2) && '!bg-gray-70'
            )}
            onClick={handleConfirm}
            disabled={!isChecked1 || !isChecked2}
            loading={withdrawAccount.isPending}
          >
            {t('check')}
          </Button>
        </div>
      }
      containerClassName={styles.modalWithdrawal}
    >
      <div className="flex h-46 items-center justify-center px-16">
        <p className="text-center text-14 font-normal leading-1.66 -tracking-0.5 text-gray-00">
          {t('withdrawal_description')}
        </p>
      </div>
      <div className="mx-16 h-1 bg-gray-80" />
      <ul className="list-disc py-8 pl-40 pr-16 text-14 font-normal leading-1.66 -tracking-0.07 text-gray-00">
        <li>
          <span>{t('withdrawal_description2_1')}</span>
          <span className="text-primary underline">
            {t('withdrawal_description2_2')}
          </span>
        </li>
        <li>{t('withdrawal_description3')}</li>
        <li>
          <span className="text-primary underline">
            {t('withdrawal_description4')}
          </span>
        </li>
      </ul>
      <div className="mx-16 h-1 bg-gray-80" />
      <ul className="p-16">
        <li>
          <Checkbox onChange={e => setIsChecked1(e.target.checked)}>
            {t('withdrawal_description5')}
          </Checkbox>
        </li>
        <li>
          <Checkbox onChange={e => setIsChecked2(e.target.checked)}>
            {t('withdrawal_description6')}
          </Checkbox>
        </li>
      </ul>
    </Modal>
  );
});

ModalWidrawal.displayName = 'ModalWidrawal';

export default ModalWidrawal;
