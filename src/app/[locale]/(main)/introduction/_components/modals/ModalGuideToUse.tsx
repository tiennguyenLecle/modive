'use client';

import React, { useImperativeHandle, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, Spinner } from '@/components';
import { STORAGE } from '@/utils/constants';

interface ModalGuideToUseHandle {
  open: () => Promise<void>;
  close: () => void;
}

interface ModalGuideToUseProps {
  loading?: boolean;
}

const ModalGuideToUse = React.forwardRef<
  ModalGuideToUseHandle,
  ModalGuideToUseProps
>(({ loading = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('introduction.modal_guide_to_use');

  const promiseActions = useRef<{
    resolve: (value: void | PromiseLike<void>) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setIsOpen(true);
        return new Promise<void>((resolve, reject) => {
          promiseActions.current = { resolve, reject };
        });
      },
      close: () => {
        console.log('modal guide to use closed');
        setIsOpen(false);
      },
    }),
    []
  );

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        promiseActions.current?.reject();
      }}
      header={<h3 className="text-center uppercase">{t('title')}</h3>}
      footer={
        <div>
          <Button
            variant="primary"
            className="mb-8"
            onClick={() => {
              promiseActions.current?.resolve();
            }}
            disabled={loading}
          >
            {loading && <Spinner />}
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
              disabled={loading}
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
