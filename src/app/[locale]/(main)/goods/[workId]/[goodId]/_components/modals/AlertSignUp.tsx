'use client';

import React, { use, useImperativeHandle, useState } from 'react';
import { Typography } from 'antd';
import { useTranslations } from 'next-intl';

import { CheckFill } from '@/assets/icons';
import { Modal } from '@/components';

const { Text } = Typography;

type AlertSignUpProps = {};

type AlertSignUpRef = {
  open: () => void;
  close: () => void;
};

const AlertSignUpModal = React.forwardRef<AlertSignUpRef, AlertSignUpProps>(
  (_, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations('goods_page.good_detail.alert_sign_up');

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setIsOpen(true);
        },
        close: () => {
          setIsOpen(false);
        },
      }),
      []
    );

    return (
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header={
          <Text className="flex items-center gap-8 text-16 font-semibold text-gray-00">
            <CheckFill width={18} height={18} className={'text-primary'} />
            {t('title')}
          </Text>
        }
        showCloseButton={false}
        footer={
          <div className="flex gap-12">
            <button className="flex h-40 w-full items-center justify-center gap-8 overflow-hidden whitespace-nowrap rounded-4 border border-gray-70 bg-gray-100 p-12 text-gray-00">
              {t('non_member_search')}
            </button>
            <button className="flex h-40 w-full items-center justify-center gap-8 overflow-hidden whitespace-nowrap rounded-4 bg-primary p-12 text-gray-100">
              {t('join_membership')}
            </button>
          </div>
        }
      >
        <p className="text-center text-14 font-normal -tracking-0.5">
          {t('description')}
        </p>
      </Modal>
    );
  }
);

AlertSignUpModal.displayName = 'AlertSignUpModal';

export default AlertSignUpModal;
