import React, { useImperativeHandle, useState } from 'react';
import { Typography } from 'antd';
import { useTranslations } from 'next-intl';

import { CheckFill } from '@/assets/icons';
import { Modal } from '@/components';
import { useRouter } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';

const { Text } = Typography;

type CompleteShoppingCartProps = {};

type CompleteShoppingCartRef = {
  open: () => void;
  close: () => void;
};

const CompleteShoppingCartModal = React.forwardRef<
  CompleteShoppingCartRef,
  CompleteShoppingCartProps
>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const t = useTranslations('goods_page.good_detail.complete_shopping_cart');

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
      zIndex={50}
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
          <button
            className="flex h-40 w-full items-center justify-center gap-8 overflow-hidden whitespace-nowrap rounded-4 border border-gray-70 bg-gray-100 p-12 text-gray-00"
            onClick={() => {
              router.push(ROUTES.SHOPPING_CART);
            }}
          >
            {t('shopping_cart')}
          </button>
          <button
            className="flex h-40 w-full items-center justify-center gap-8 overflow-hidden whitespace-nowrap rounded-4 bg-primary p-12 text-gray-100"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {t('continue_shopping')}
          </button>
        </div>
      }
    >
      <p className="text-center text-14 font-normal -tracking-0.5">
        {t('description')}
      </p>
    </Modal>
  );
});

CompleteShoppingCartModal.displayName = 'CompleteShoppingCartModal';

export default CompleteShoppingCartModal;
