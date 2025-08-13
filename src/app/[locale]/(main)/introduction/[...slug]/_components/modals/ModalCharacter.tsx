'use client';

import React, { useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Heart } from '@/assets/icons';
import { Button, Modal, ModalHandle } from '@/components';
import { STORAGE } from '@/utils/constants';
import { cx } from '@/utils/method';

import ModalExistChatRoom from './ModalExistChatRoom';
import ModalGuideToUse from './ModalGuideToUse';

const ModalCharacter = React.forwardRef<ModalHandle>((_, ref) => {
  const t = useTranslations('introduction.modal_character');

  const internalModalRef = useRef<ModalHandle>(null);
  const modalGuideToUseRef = useRef<ModalHandle>(null);
  const modalExistChatRoomRef = useRef<ModalHandle>(null);

  // Use useImperativeHandle to connect the ref passed from the outside
  // to the internal ref. Whenever the parent component uses ref, it will
  // actually interact with `internalModalRef`.
  useImperativeHandle(ref, () => internalModalRef.current!, []);

  const handleClose = () => {
    internalModalRef.current?.close();
  };

  const handleConfirm = async () => {
    if (!localStorage.getItem(STORAGE.HIDE_GUIDE_TO_USE)) {
      modalGuideToUseRef.current?.open();
    }

    // modalExistChatRoomRef.current?.open();
    handleClose();
  };

  return (
    <>
      <Modal
        ref={internalModalRef}
        footer={
          <div className="flex w-full items-center gap-8">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleConfirm}
            >
              {t('start_conversation')}
            </Button>
          </div>
        }
      >
        <div className="container flex flex-col gap-16">
          <div className="relative aspect-square w-full">
            <Image
              src="https://picsum.photos/seed/1/280 "
              alt="character"
              fill
              className="rounded-4"
            />
          </div>
          <div className="flex items-start gap-8">
            <p title="TODO: character name">
              TODO: character name character name
            </p>
            <div className="ml-auto flex items-center gap-4">
              <Heart
                className={cx(
                  'size-18 text-white'
                  // 'stroke-primary text-primary'
                )}
              />
              85
            </div>
          </div>
          <p>
            (TODO: character information) After finishing middle school in a
            small city, she escapes to a remote mountain area with her father
            who is buried in debt, and later comes to Seoul with her younger
            sister, dedicating all her efforts to her sister Shin-ae.
          </p>
          <q className="text-center">
            (TODO: character quote) I wish time would stop like this.
          </q>
        </div>
      </Modal>

      <ModalGuideToUse ref={modalGuideToUseRef} />
      <ModalExistChatRoom ref={modalExistChatRoomRef} />
    </>
  );
});

ModalCharacter.displayName = 'ModalCharacter';

export default ModalCharacter;
