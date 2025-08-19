'use client';

import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { Heart } from '@/assets/icons';
import { Button, Modal, ModalHandle } from '@/components';
import { useCharacterDetail } from '@/hooks/useCharacter';
import { STORAGE } from '@/utils/constants';
import { cx, getPublicUrl } from '@/utils/method';

import ModalExistChatRoom, {
  ModalExistChatRoomHandle,
} from './ModalExistChatRoom';
import ModalGuideToUse, { ModalGuideToUseHandle } from './ModalGuideToUse';

const ModalCharacter = React.forwardRef<ModalHandle>((_, ref) => {
  const t = useTranslations('introduction.modal_character');
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get('character');
  const { characterDetail } = useCharacterDetail(characterId as string);

  const internalModalRef = useRef<ModalHandle>(null);
  const modalGuideToUseRef = useRef<ModalGuideToUseHandle>(null);
  const modalExistChatRoomRef = useRef<ModalExistChatRoomHandle>(null);

  const closeCallback = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('character');
    router.replace(`?${params.toString()}`);
  };

  // Use useImperativeHandle to connect the ref passed from the outside
  // to the internal ref. Whenever the parent component uses ref, it will
  // actually interact with `internalModalRef`.
  useImperativeHandle(ref, () => internalModalRef.current!, []);

  const handleConfirm = async () => {
    internalModalRef.current?.close();

    try {
      if (!localStorage.getItem(STORAGE.HIDE_GUIDE_TO_USE)) {
        await modalGuideToUseRef.current?.open();
      }

      if (
        characterDetail?.chat_rooms &&
        characterDetail.chat_rooms.length > 0
      ) {
        const decision = await modalExistChatRoomRef.current?.open();

        if (decision === 'existing') {
          // TODO: Redirect to the appropriate chat room
          alert('TODO: Redirect to the appropriate chat room');
        } else {
          // TODO: Create a new chat room
          alert('TODO: Create a new chat room');
        }
      } else {
        // TODO: Create a new chat room
        alert('TODO: Create a new chat room');
      }
    } catch (error) {
      console.error('Modal flow cancelled or failed', error);
    }
  };

  useEffect(() => {
    if (characterId && characterDetail) {
      internalModalRef.current?.open();
    }
  }, [characterId, characterDetail]);

  return (
    <>
      {characterId && characterDetail && (
        <Modal
          ref={internalModalRef}
          closeCallback={closeCallback}
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
                src={getPublicUrl(characterDetail.avatar_key)}
                alt="character"
                fill
                className="rounded-4"
              />
            </div>
            <div className="flex items-start gap-8">
              <p title={characterDetail.name}>{characterDetail.name}</p>
              <div className="group ml-auto flex cursor-pointer items-center gap-4">
                <Heart
                  className={cx(
                    'size-18 text-white transition-colors duration-200 group-hover:stroke-primary group-hover:text-primary',
                    characterDetail.is_liked && 'stroke-primary text-primary'
                  )}
                />
                {characterDetail.total_likes === 0
                  ? t('like')
                  : characterDetail.total_likes}
              </div>
            </div>
            <p>{characterDetail.introduction}</p>
            {characterDetail.quote && (
              <q className="text-center">{characterDetail.quote}</q>
            )}
          </div>
        </Modal>
      )}

      <ModalGuideToUse ref={modalGuideToUseRef} />
      <ModalExistChatRoom ref={modalExistChatRoomRef} />
    </>
  );
});

ModalCharacter.displayName = 'ModalCharacter';

export default ModalCharacter;
