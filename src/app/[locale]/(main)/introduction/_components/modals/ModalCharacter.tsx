'use client';

import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Heart } from '@/assets/icons';
import { Button, Modal } from '@/components';
import { useCreateChat } from '@/hooks/useChat';
import { useRouter } from '@/lib/navigation';
import { STORAGE } from '@/utils/constants';
import { cx, getPublicUrl } from '@/utils/method';

import { useCharacter } from '../../_hooks/useCharacter';
import ModalExistChatRoom from './ModalExistChatRoom';
import ModalGuideToUse from './ModalGuideToUse';

type ModalCharacterRef = {
  open: () => void;
  close: () => void;
};

const ModalCharacter = React.forwardRef<ModalCharacterRef>((_, ref) => {
  const t = useTranslations('introduction.modal_character');
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get('character');

  const modalGuideToUseRef =
    useRef<React.ElementRef<typeof ModalGuideToUse>>(null);
  const modalExistChatRoomRef =
    useRef<React.ElementRef<typeof ModalExistChatRoom>>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { characterDetail, toggleLike } = useCharacter(characterId);
  const character = characterDetail.data;
  const createChat = useCreateChat();

  const closeHandler = () => {
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: closeHandler,
  }));

  const removeCharacterId = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('character');
    router.replace(`?${params.toString()}`);
  };

  const redirectToChatRoom = (roomId: string, sessionId: string) => {
    router.push(`/chat/${roomId}/?sessionId=${sessionId}`);
  };

  const createChatHandler = () =>
    createChat
      .trigger({
        bundleId: character?.work.bundle_id!,
        characterId: characterId as string,
      })
      .then(res => {
        redirectToChatRoom(res.room_id, res.session_id);
      });

  const handleConfirm = async () => {
    closeHandler();
    try {
      if (!localStorage.getItem(STORAGE.HIDE_GUIDE_TO_USE)) {
        await modalGuideToUseRef.current?.open();
      }

      if (character?.chat_rooms && character.chat_rooms.length > 0) {
        const { chat_rooms } = character;
        modalGuideToUseRef.current?.close();
        const decision = await modalExistChatRoomRef.current?.open();

        if (decision === 'existing') {
          const { room_id, session_id } = chat_rooms[0];
          redirectToChatRoom(room_id, session_id);
        } else {
          await createChatHandler();
        }
        modalExistChatRoomRef.current?.close();
      } else {
        await createChatHandler();
        modalGuideToUseRef.current?.close();
      }
    } catch (error) {
      console.log('Modal flow cancelled or failed', error);
      removeCharacterId();
    }
  };

  const handleLike = async () => {
    if (!character) return;
    await toggleLike.trigger();
  };

  useEffect(() => {
    if (characterId) {
      setIsOpen(true);
    }
  }, [characterId]);

  return (
    <>
      <Modal
        open={isOpen}
        loading={characterDetail.isLoading}
        onCancel={() => {
          closeHandler();
          removeCharacterId();
        }}
        footer={
          character ? (
            <div className="flex w-full items-center gap-8">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleConfirm}
              >
                {t('start_conversation')}
              </Button>
            </div>
          ) : null
        }
      >
        <div className="container flex flex-col gap-16">
          <div className="relative aspect-square w-full">
            <Image
              src={getPublicUrl(character?.avatar_key)}
              alt={character?.name || 'User avatar'}
              fill
              className="rounded-4"
            />
          </div>
          <div className="flex items-start gap-8">
            <p title={character?.name}>{character?.name}</p>
            <div
              onClick={handleLike}
              className="group ml-auto flex cursor-pointer items-center gap-4"
            >
              <Heart
                className={cx(
                  'size-18 transition-colors duration-200 group-hover:stroke-primary group-hover:text-primary',
                  character?.is_liked
                    ? 'stroke-primary text-primary'
                    : 'text-white'
                )}
              />
              {character?.total_likes === 0
                ? t('like')
                : character?.total_likes}
            </div>
          </div>
          <p>{character?.introduction}</p>
          {character?.quote && (
            <q className="text-center">{character?.quote}</q>
          )}
        </div>
      </Modal>

      <ModalGuideToUse
        ref={modalGuideToUseRef}
        loading={createChat.isMutating}
      />
      <ModalExistChatRoom
        ref={modalExistChatRoomRef}
        loading={createChat.isMutating}
      />
    </>
  );
});

ModalCharacter.displayName = 'ModalCharacter';

export default ModalCharacter;
