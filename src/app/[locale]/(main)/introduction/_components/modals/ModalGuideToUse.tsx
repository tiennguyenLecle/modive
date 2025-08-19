'use client';

import React, { useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, ModalHandle } from '@/components';
import { STORAGE } from '@/utils/constants';

export interface ModalGuideToUseHandle {
  open: () => Promise<void>;
  close: () => void;
}

const ModalGuideToUse = React.forwardRef<ModalGuideToUseHandle>((_, ref) => {
  const t = useTranslations('introduction.modal_guide_to_use');

  const internalModalRef = useRef<ModalHandle>(null);
  const promiseActions = useRef<{
    resolve: (value: void | PromiseLike<void>) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        internalModalRef.current?.open();
        return new Promise<void>((resolve, reject) => {
          promiseActions.current = { resolve, reject };
        });
      },
      close: () => {
        internalModalRef.current?.close();
      },
    }),
    []
  );

  const closeCallback = () => {
    promiseActions.current?.reject('Modal closed by user');
  };

  const handleConfirm = () => {
    promiseActions.current?.resolve();
    internalModalRef.current?.close();
  };

  return (
    <Modal
      ref={internalModalRef}
      closeCallback={closeCallback}
      header={<h3 className="text-center uppercase">{t('title')}</h3>}
      footer={
        <div className="">
          <Button variant="primary" className="mb-8" onClick={handleConfirm}>
            {t('agree_and_start')}
          </Button>

          <label className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              onChange={e => {
                if (e.target.checked) {
                  localStorage.setItem(STORAGE.HIDE_GUIDE_TO_USE, 'true');
                } else {
                  localStorage.removeItem(STORAGE.HIDE_GUIDE_TO_USE);
                }
              }}
            />
            <span>{t('do_not_see_again')}</span>
          </label>
        </div>
      }
    >
      <div className="container flex flex-col gap-16 text-center">
        <p>{t('description_1')}</p>
        <p>{t('description_2')}</p>
        <p>{t('description_3')}</p>
        <p>{t('description_4')}</p>
      </div>
    </Modal>
  );
});

ModalGuideToUse.displayName = 'ModalGuideToUse';

export default ModalGuideToUse;
