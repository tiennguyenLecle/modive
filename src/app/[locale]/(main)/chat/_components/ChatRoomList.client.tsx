'use client';

import React, { ComponentProps, useRef, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import VirtualList from 'rc-virtual-list';

import { Pin } from '@/assets/icons';
import { Badge, Spinner } from '@/components';
import { useMyRoomsInfinite } from '@/hooks/useChat';
import { useDynamicPageSize } from '@/hooks/useDynamicPageSize';
import { useRouter } from '@/lib/navigation';
import { ChatRoomType } from '@/types/chatroom';
import { cx, getPublicUrl } from '@/utils/method';

import styles from './ChatRoomList.module.scss';
import ModalOptions from './modals/ModalOptions.client';
import WorkFilter from './WorkFilter.client';

export default function ChatRoomList() {
  const t = useTranslations('chat_page');
  const modalRef = React.useRef<React.ElementRef<typeof ModalOptions>>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedWorkIds, setSelectedWorkIds] = useState<string[]>([]);

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const virtualListRef = useRef<any>(null);

  // Calculate dynamic page size based on container height
  const { recommendedPageSize } = useDynamicPageSize({
    containerRef: virtualListRef,
    estimatedItemHeight: 92, // Match VirtualList itemHeight
    minPageSize: 5,
    maxPageSize: 30,
    bufferMultiplier: 1.2, // Smaller buffer for more precise loading
  });

  const {
    rooms: chatrooms,
    setSize,
    isValidating,
    isReachingEnd,
    mutate,
  } = useMyRoomsInfinite({
    pageSize: recommendedPageSize,
    type: searchParams.get('key') === 'chapter' ? 'chapter' : 'general',
    workIds: selectedWorkIds,
  });

  // Simple scroll handler for load more
  const handleScroll = (e: any) => {
    if (isReachingEnd || isValidating) return;

    const target = e?.currentTarget as HTMLElement | undefined;
    if (!target) return;

    const threshold = 50; // px from bottom to trigger load more
    const remaining =
      target.scrollHeight - target.scrollTop - target.clientHeight;
    const isNearBottom = remaining < threshold;

    if (isNearBottom) {
      setSize(prev => prev + 1);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {chatrooms.length > 0 && (
        <>
          <WorkFilter
            selectedWorkIds={selectedWorkIds}
            onToggleWork={value => {
              if (selectedWorkIds.includes(value)) {
                setSelectedWorkIds(selectedWorkIds.filter(id => id !== value));
              } else {
                setSelectedWorkIds([...selectedWorkIds, value]);
              }
            }}
          />
          <VirtualList<ChatRoomType>
            ref={virtualListRef}
            data={chatrooms}
            itemHeight={92}
            itemKey="id"
            onScroll={handleScroll}
            className={cx('min-h-0 flex-1', styles.virtualList)}
          >
            {item => (
              <ChatListItem
                key={item.id}
                id={item.id}
                name={item.character.name}
                avatar={getPublicUrl(item.character.avatar_key)}
                time={new Date(item.created_at)}
                lastMessage={item.last_message}
                unreadCount={0}
                isPinned={item.is_pinned}
                onClick={() =>
                  router.push(
                    `/chat/${item.room_id}?sessionId=${item.session_id}`
                  )
                }
                onContextMenu={e => {
                  e.preventDefault();
                  modalRef.current?.open({
                    id: item.id,
                    is_pinned: item.is_pinned,
                  });
                }}
                onTouchStart={() => {
                  longPressTimer.current = setTimeout(() => {
                    modalRef.current?.open({
                      id: item.id,
                      is_pinned: item.is_pinned,
                    });
                  }, 500);
                }}
                onTouchEnd={() => {
                  if (longPressTimer.current) {
                    clearTimeout(longPressTimer.current);
                    longPressTimer.current = null;
                  }
                }}
              />
            )}
          </VirtualList>
        </>
      )}
      {!isValidating && chatrooms.length === 0 && <div>{t('no_rooms')}</div>}
      {isValidating && (
        <div className="flex items-center justify-center p-16">
          <Spinner className="mx-auto" />
        </div>
      )}
      <ModalOptions
        actionCallback={() => {
          mutate();
        }}
        ref={modalRef}
      />
    </div>
  );
}

type ChatListItemProps = ComponentProps<'div'> & {
  id: string;
  name: string;
  avatar: string;
  time: Date;
  lastMessage: string;
  unreadCount: number;
  isPinned: boolean;
};

const ChatListItem = React.forwardRef<HTMLDivElement, ChatListItemProps>(
  (
    { name, avatar, time, lastMessage, unreadCount, isPinned, ...rest },
    ref
  ) => {
    const format = useFormatter();

    return (
      <div
        className="container flex w-full cursor-pointer gap-16 rounded-8 border-b border-gray-90 bg-gray-100 py-16 transition-colors duration-300 hover:bg-gray-90"
        {...rest}
        ref={ref}
      >
        <Image
          src={avatar}
          alt={name}
          width={60}
          height={60}
          className="aspect-square rounded-max bg-gray-80 object-cover"
        />

        <div className="flex flex-1 items-center gap-8">
          <p className="max-w-150 truncate text-16 font-bold text-gray-00">
            {name}
          </p>
          {isPinned && <Pin className="size-18 text-gray-00" />}
        </div>

        {lastMessage && (
          <p className="text-14 font-normal text-gray-50">{lastMessage}</p>
        )}

        <div className="flex w-60 flex-col items-end gap-8 py-4">
          <time
            className="text-12 font-semibold text-gray-50"
            title={format.dateTime(time, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          >
            {format.dateTime(time, {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </time>
          <Badge.CountNode count={unreadCount} />
        </div>
      </div>
    );
  }
);

ChatListItem.displayName = 'ChatListItem';
