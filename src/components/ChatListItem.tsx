'use client';

import React, { ComponentProps, useImperativeHandle, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Pin, Trash } from '@/assets/icons';
import { Badge, Modal } from '@/components';

type ChatListItemProps = ComponentProps<'div'> & {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description?: string;
  time?: string;
  count?: number;
};

const ChatListItem: React.FC<ChatListItemProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  time,
  count,
  ...rest
}) => {
  const modalRef = React.useRef<React.ElementRef<typeof ModalOptions>>(null);
  const t = useTranslations('chat_list_item');

  return (
    <>
      <div
        className="flex w-full items-center gap-16 border-b border-gray-90 bg-gray-100 py-16"
        {...rest}
      >
        <div className="flex size-60 items-center justify-center overflow-hidden rounded-max bg-gray-80">
          <Image
            src={imageSrc}
            alt={imageAlt || 'User Avatar'}
            width={60}
            height={60}
            className="aspect-square object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <div className="flex items-center gap-8">
            <p className="max-w-150 truncate text-16 font-bold text-gray-00">
              {title}
            </p>
            <div
              className="flex size-24 items-center justify-center"
              onClick={() => modalRef.current?.open()}
            >
              <Pin className="size-18 text-gray-00" />
            </div>
          </div>

          {description && (
            <p className="text-14 font-normal text-gray-50">{description}</p>
          )}
        </div>

        <div className="flex w-60 flex-col items-end gap-8 py-4">
          <p className="text-12 font-semibold text-gray-50">{time}</p>
          <Badge.CountNode count={count} />
        </div>
      </div>
      <ModalOptions ref={modalRef} />
    </>
  );
};

export default ChatListItem;

type ModalOptionsRef = {
  open: () => void;
  close: () => void;
};

const ModalOptions = React.forwardRef<ModalOptionsRef>((_, ref) => {
  const t = useTranslations('chat_list_item');
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: closeHandler,
  }));

  return (
    <Modal
      open={isOpen}
      onCancel={closeHandler}
      showCloseButton={false}
      showHeader={false}
      showFooter={false}
      containerClassName="!w-200"
    >
      <div className="flex w-full flex-col">
        <div
          className="flex h-48 items-center gap-8 px-16 py-4"
          onClick={closeHandler}
        >
          <Pin className="size-18 text-gray-00" />
          <p className="text-16 font-normal text-gray-00">{t('top_fixing')}</p>
        </div>
        <hr />
        <div
          className="flex h-48 items-center gap-8 px-16 py-4"
          onClick={closeHandler}
        >
          <Trash className="size-18 text-gray-00" />
          <p className="text-16 font-normal text-gray-00">{t('deletion')}</p>
        </div>
      </div>
    </Modal>
  );
});

ModalOptions.displayName = 'ModalOptions';
