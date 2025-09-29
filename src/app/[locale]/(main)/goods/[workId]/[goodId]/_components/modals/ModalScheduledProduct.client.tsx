'use client';

import React, { useImperativeHandle, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useFormatter, useTranslations } from 'next-intl';

import { Info } from '@/assets/icons';
import { Button, Modal } from '@/components';

import { useGoodDetailProvider } from '../../_provider/GoodDetailProvider';

type ModalScheduledProductProps = {
  // open: boolean;
  // setOpen: (open: boolean) => void;
  // actionCallback: () => void;
};

type ModalScheduledProductRef = {
  open: () => Promise<void>;
  close: () => void;
};

const ModalScheduledProduct = React.forwardRef<
  ModalScheduledProductRef,
  ModalScheduledProductProps
>((_, ref) => {
  const format = useFormatter();
  const t = useTranslations('goods_page.good_detail');
  const { purchaseNow, goodDetail } = useGoodDetailProvider();
  const [open, setOpen] = useState(false);
  const promiseActions = useRef<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const closeHandler = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      if (
        goodDetail.data &&
        (goodDetail.data.release_date === null ||
          dayjs().isAfter(dayjs(goodDetail.data.release_date)))
      ) {
        console.log(
          `release_date ${dayjs(goodDetail.data.release_date).format('YYYY-MM-DD HH:mm')} is after today ${dayjs().format('YYYY-MM-DD HH:mm')}`
        );
        return Promise.resolve();
      } else {
        setOpen(true);
        return new Promise((resolve, reject) => {
          promiseActions.current = { resolve, reject };
        });
      }
    },
    close: () => {
      promiseActions.current?.reject();
      closeHandler();
    },
  }));

  if (!goodDetail.data) return null;

  const { release_date } = goodDetail.data;

  return (
    <Modal
      open={open}
      zIndex={50}
      onCancel={() => {
        promiseActions.current?.reject();
        closeHandler();
      }}
      containerClassName="!w-320 rounded-12"
      title={t('alarm')}
      header={
        <div className="flex items-center gap-4">
          <Info className="h-18 w-18 text-primary" />
          <span className="text-16 font-semibold text-gray-00">
            {t('alarm')}
          </span>
        </div>
      }
      footer={
        <Button
          variant="primary"
          onClick={() => {
            promiseActions.current?.resolve();
            closeHandler();
          }}
          disabled={purchaseNow.isMutating}
          loading={purchaseNow.isMutating}
        >
          {t('check')}
        </Button>
      }
    >
      <div className="container flex flex-col gap-24 text-center">
        <p className="text-16 font-normal text-gray-00">
          {t('scheduled_product')}
          <br />
          {release_date &&
            t('scheduled_product_description', {
              date: format.dateTime(new Date(release_date), {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }),
            })}
        </p>
      </div>
    </Modal>
  );
});

ModalScheduledProduct.displayName = 'ModalScheduledProduct';

export default ModalScheduledProduct;
