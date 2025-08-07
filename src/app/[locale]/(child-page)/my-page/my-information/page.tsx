'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import BaselineErrorIcon from '@/assets/icons/baseline-error.svg';
import InfoIcon from '@/assets/icons/info.svg';
import KakaoTalk from '@/assets/icons/kakao-talk.svg';
import PencilIcon from '@/assets/icons/pencil.svg';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Modal, { ModalHandle } from '@/components/Modal';

const MyInformation = () => {
  const t = useTranslations('my_information');
  const withdrawalModalRef = React.useRef<ModalHandle>(null);
  const logOutModalRef = React.useRef<ModalHandle>(null);

  return (
    <>
      <Header
        className="mx-auto w-[360rem]"
        pageTitle={t('my_infomation')}
        showBackButton
      />
      <div className="flex h-full flex-col justify-between bg-gray-90 pb-24">
        <div className="flex flex-col bg-white px-16">
          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">{t('nickname')}</p>
            <div className="flex gap-8">
              <p className="text-14 font-semibold text-gray-00">User 123</p>
              <div className="flex size-24 items-center justify-center rounded-8 border border-gray-70">
                <PencilIcon className="size-14 text-gray-40" />
              </div>
            </div>
          </div>

          <div className="flex h-60 items-center justify-between border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('social_login')}
            </p>
            <div className="flex items-center gap-8">
              <KakaoTalk className="size-20 rounded-5" />
              <p className="text-14 font-semibold text-gray-00">{t('kakao')}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-12">
          <p
            className="text-16 font-normal text-gray-40"
            onClick={() => logOutModalRef.current?.open()}
          >
            {t('logout')}
          </p>
          <div className="h-12 w-1 bg-gray-03" />
          <p
            className="text-16 font-normal text-gray-40"
            onClick={() => withdrawalModalRef.current?.open()}
          >
            {t('withdrawal')}
          </p>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <Modal
        ref={withdrawalModalRef}
        showCloseButton={false}
        header={
          <div className="flex items-center gap-4">
            <BaselineErrorIcon className="size-18 text-primary" />
            <p className="text-16 font-semibold text-gray-00">
              {t('withdrawal_notification')}
            </p>
          </div>
        }
        footer={
          <div className="flex w-full items-center gap-8">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => withdrawalModalRef.current?.close()}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                // Handle withdrawal confirmation logic here
                withdrawalModalRef.current?.close();
              }}
            >
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

      {/* Log out Modal */}
      <Modal
        ref={logOutModalRef}
        showCloseButton={false}
        header={
          <div className="flex items-center gap-4">
            <InfoIcon className="size-18 text-primary" />
            <p className="text-16 font-semibold text-gray-00">
              {t('log_out_notification')}
            </p>
          </div>
        }
        footer={
          <div className="flex w-full items-center gap-8">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => logOutModalRef.current?.close()}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                logOutModalRef.current?.close();
              }}
            >
              {t('check')}
            </Button>
          </div>
        }
      >
        <p className="flex min-h-46 items-center justify-center px-16 text-center text-14 font-normal leading-1.66 -tracking-0.5 text-gray-00">
          {t('log_out_description')}
        </p>
      </Modal>
    </>
  );
};

export default MyInformation;
