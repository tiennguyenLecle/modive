'use client';

import React, { ComponentProps, use } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import PinIcon from '@/assets/icons/pin.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { Badge } from '@/components/Badge';
import Modal, { ModalHandle } from '@/components/Modal';

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
  const modalRef = React.useRef<ModalHandle>(null);
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
              <PinIcon className="size-18 text-gray-00" />
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

      <Modal
        ref={modalRef}
        showCloseButton={false}
        showHeader={false}
        showFooter={false}
        containerClassName="!w-200"
      >
        <div className="flex w-full flex-col">
          <div
            className="flex h-48 items-center gap-8 px-16 py-4"
            onClick={() => modalRef.current?.close()}
          >
            <PinIcon className="size-18 text-gray-00" />
            <p className="text-16 font-normal text-gray-00">
              {t('top_fixing')}
            </p>
          </div>
          <hr />
          <div
            className="flex h-48 items-center gap-8 px-16 py-4"
            onClick={() => modalRef.current?.close()}
          >
            <TrashIcon className="size-18 text-gray-00" />
            <p className="text-16 font-normal text-gray-00">{t('deletion')}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatListItem;
