'use client';

import React, { useImperativeHandle, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, Spinner } from '@/components';
import CheckboxComponent from '@/components/Checkbox';
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
      header={
        <h3 className="text-center text-14 font-semibold text-gray-00">
          {t('title')}
        </h3>
      }
      footer={
        <div className="flex flex-col gap-12">
          <CheckboxComponent
            onChange={e => {
              if (e.target.checked) {
                localStorage.setItem(STORAGE.HIDE_GUIDE_TO_USE, 'true');
              } else {
                localStorage.removeItem(STORAGE.HIDE_GUIDE_TO_USE);
              }
            }}
            disabled={loading}
          >
            <span className="text-12 font-semibold text-gray-30">
              {t('do_not_see_again')}
            </span>
          </CheckboxComponent>

          <Button
            variant="primary"
            className="mb-8"
            onClick={() => {
              promiseActions.current?.resolve();
            }}
            disabled={loading}
          >
            {loading && <Spinner />}
            <p className="text-16 font-semibold text-gray-100">
              {t('agree_and_start')}
            </p>
          </Button>
        </div>
      }
    >
      <div className="container flex flex-col gap-16 px-16">
        <div className="border-b border-gray-80 p-8">
          <ul className="list-disc pl-12 text-14 font-normal leading-1.66 -tracking-0.4 text-black">
            <li>{t('description_1')}</li>
            <li>{t('description_2')}</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-16">
          <p className="text-center text-14 font-normal leading-1.66 -tracking-0.5 text-black">
            {t('description_3')}
          </p>
          <p className="text-center text-14 font-normal leading-1.66 -tracking-0.5 text-black">
            {t('description_4')}
          </p>
        </div>
      </div>
    </Modal>
  );
});

ModalGuideToUse.displayName = 'ModalGuideToUse';

export default ModalGuideToUse;
