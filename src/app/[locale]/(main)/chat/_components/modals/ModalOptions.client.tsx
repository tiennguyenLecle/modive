'use client';

import React, { useImperativeHandle, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Pin, Trash } from '@/assets/icons';
import { Modal } from '@/components';
import { ChatRoomType } from '@/types/chatroom';

import { usePinChatRoom } from '../../_hooks/useChatRoom';
import ModalConfirmDeletion from './ModalConfirmDeletion.client';

type ModalOptionsRef = {
  open: (chatroom: Pick<ChatRoomType, 'id' | 'is_pinned'>) => void;
  close: () => void;
};

type ModalOptionsProps = {
  actionCallback: () => void;
};

const ModalOptions = React.forwardRef<ModalOptionsRef, ModalOptionsProps>(
  ({ actionCallback }, ref) => {
    const t = useTranslations('chat_page.modal_options');
    const modalConfirmDeletionRef =
      useRef<React.ElementRef<typeof ModalConfirmDeletion>>(null);
    const [chatroom, setChatroom] = useState<Pick<
      ChatRoomType,
      'id' | 'is_pinned'
    > | null>(null);

    const { trigger: pinChatRoom, isMutating: isPinning } = usePinChatRoom();

    const closeHandler = () => {
      setChatroom(null);
    };

    useImperativeHandle(ref, () => ({
      open: chatroom => {
        setChatroom(chatroom);
      },
      close: closeHandler,
    }));

    const handlePin = async () => {
      if (!chatroom) return;
      await pinChatRoom(
        { chatroomId: chatroom.id, is_pinned: chatroom.is_pinned },
        {
          onSuccess: () => {
            actionCallback();
            closeHandler();
          },
        }
      );
    };

    return (
      <>
        <Modal
          open={!!chatroom}
          onCancel={closeHandler}
          showCloseButton={false}
          showHeader={false}
          showFooter={false}
          containerClassName="!w-200 !rounded-12"
        >
          <div className="flex w-full flex-col">
            <button
              className="flex h-48 items-center gap-8 px-16 py-4"
              onClick={handlePin}
              disabled={isPinning}
            >
              <Pin className="size-18 text-gray-00" />
              <p className="text-16 font-normal text-gray-00">
                {chatroom?.is_pinned ? t('un_top_fixing') : t('top_fixing')}
              </p>
            </button>
            <button
              className="flex h-48 items-center gap-8 px-16 py-4"
              onClick={() => {
                modalConfirmDeletionRef.current?.open(chatroom!.id);
                closeHandler();
              }}
            >
              <Trash className="size-18 text-gray-00" />
              <p className="text-16 font-normal text-gray-00">
                {t('deletion')}
              </p>
            </button>
          </div>
        </Modal>
        <ModalConfirmDeletion
          actionCallback={actionCallback}
          ref={modalConfirmDeletionRef}
        />
      </>
    );
  }
);

ModalOptions.displayName = 'ModalOptions';

export default ModalOptions;
