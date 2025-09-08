'use client';

import React, { useImperativeHandle, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Heart } from '@/assets/icons';
import { Button, Modal, ProgressBar, Slider, Spinner } from '@/components';
import { useCreateChat } from '@/hooks/useChat';
import { useRouter } from '@/lib/navigation';
import { ExtendedCharacterType } from '@/lib/supabase/swr/character';
import { CharacterType } from '@/types/character';
import { STORAGE } from '@/utils/constants';
import { cx, getPublicUrl } from '@/utils/method';

import { useCharacter } from '../../_hooks/useCharacter';
import ModalExistChatRoom from './ModalExistChatRoom';
import ModalGuideToUse from './ModalGuideToUse';

type ModalCharacterRef = {
  open: (character: CharacterType) => void;
  close: () => void;
};

const ModalCharacter = React.forwardRef<ModalCharacterRef>((_, ref) => {
  const t = useTranslations('introduction.modal_character');
  const router = useRouter();

  const modalGuideToUseRef =
    useRef<React.ElementRef<typeof ModalGuideToUse>>(null);
  const modalExistChatRoomRef =
    useRef<React.ElementRef<typeof ModalExistChatRoom>>(null);

  const [characterId, setCharacterId] = useState<string | null>(null);
  const optimisticDataRef = useRef<ExtendedCharacterType | null>(null);
  const { characterDetail, toggleLike } = useCharacter(characterId);
  const character = characterDetail.data || optimisticDataRef.current;

  const closeHandler = () => {
    setCharacterId(null);
    optimisticDataRef.current = null;
  };

  useImperativeHandle(ref, () => ({
    open: character => {
      console.log('character:', character);
      optimisticDataRef.current = character as ExtendedCharacterType;
      setCharacterId(character.id);
    },
    close: closeHandler,
  }));

  const removeCharacterId = () => {
    setCharacterId(null);
    optimisticDataRef.current = null;
  };

  const redirectToChatRoom = (roomId: string, sessionId: string) => {
    router.push(`/chat/${roomId}/?sessionId=${sessionId}`);
  };

  const createChat = useCreateChat();
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
    await toggleLike.trigger();
  };

  return (
    <>
      <Modal
        open={!!characterId}
        onCancel={() => {
          closeHandler();
          removeCharacterId();
        }}
        title={t('introduction')}
        footer={
          <div className="flex w-full items-center gap-8">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleConfirm}
              disabled={characterDetail.isLoading}
            >
              {t('start_conversation')}
            </Button>
          </div>
        }
      >
        <div className={cx('container flex flex-col')}>
          <div className="relative mx-auto mb-12 aspect-square w-3/4">
            <Image
              src={getPublicUrl(character?.avatar_key)}
              alt={character?.name || 'User avatar'}
              fill
              className="rounded-8 object-cover"
            />
          </div>

          <div className="mb-8 flex h-40 items-center gap-8">
            <p title={character?.name} className="text-20 font-medium">
              {character?.name}
            </p>
            {characterDetail.isLoading ? (
              <Spinner className="ml-auto" size={24} />
            ) : (
              <div
                onClick={handleLike}
                className="group ml-auto flex cursor-pointer items-center gap-4 text-12 text-gray-30"
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
            )}
          </div>
          <div className="mb-8 flex items-center gap-8">
            <p className="flex-1 whitespace-nowrap text-14 font-semibold text-primary">
              {t('favorability')}
            </p>
            <ProgressBar value={character?.chat_rooms?.[0]?.intimacy || 0} />
          </div>
          <p className="mb-16 text-14 font-normal leading-1.66 -tracking-0.5 text-gray-00">
            {character?.introduction}
          </p>
          {character?.quote && (
            <>
              <p className="mb-12 text-14 font-semibold text-gray-00">
                {t('portrait')}
              </p>
              <p className="text-gray-16 mb-16 whitespace-pre-line rounded-8 bg-gray-90 p-8 text-center text-14 font-semibold leading-1.7 -tracking-0.07">
                {character?.quote}
              </p>
            </>
          )}

          <div className="my-12 border-t border-gray-80" />

          <p className="mb-12 text-14 font-semibold text-gray-00">
            {t('selectWhenEntering')}
          </p>
          <Slider
            defaultValue={1}
            min={1}
            max={16}
            marks={{
              1: t('round', { value: 1 }),
              16: t('round', { value: 16 }),
            }}
            tooltip={value => (value ? t('round', { value }) : value)}
            className="mb-16"
          />
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
