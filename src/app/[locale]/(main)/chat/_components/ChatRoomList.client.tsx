'use client';

import React, { ComponentProps, useRef, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import VirtualList from 'rc-virtual-list';

import { NavChat, Pin } from '@/assets/icons';
import { roomListAtom } from '@/atoms/messagesAtom';
import { Badge, Spinner } from '@/components';
import { useMyRoomsInfinite } from '@/hooks/useChat';
import { useDynamicPageSize } from '@/hooks/useDynamicPageSize';
import { useRouter } from '@/lib/navigation';
import { ChatRoomType } from '@/types/chatroom';
import { formatDateOrTime } from '@/utils/formatTime';
import { cx, getPublicUrl } from '@/utils/method';

import styles from './ChatRoomList.module.scss';
import ModalOptions from './modals/ModalOptions.client';
import WorkFilter from './WorkFilter.client';

export default function ChatRoomList({ user }: { user: User }) {
  const t = useTranslations('chat_page');
  const modalRef = React.useRef<React.ElementRef<typeof ModalOptions>>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsKey =
    searchParams.get('key') === 'chapter' ? 'chapter' : 'general';

  const [selectedWorkIds, setSelectedWorkIds] = useState<string[] | null>(null);

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const virtualListRef = useRef<any>(null);
  const [roomsAtom] = useAtom(roomListAtom);

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
    isLoading,
    isReachingEnd,
    mutate,
  } = useMyRoomsInfinite({
    pageSize: recommendedPageSize,
    type: searchParamsKey,
    workIds: selectedWorkIds ?? undefined,
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
            setSelectedWorkIds={setSelectedWorkIds}
          />
          <VirtualList<ChatRoomType>
            ref={virtualListRef}
            data={roomsAtom}
            itemHeight={92}
            itemKey="id"
            onScroll={handleScroll}
            className={cx(
              'min-h-0 flex-1 transition-opacity duration-300',
              styles.virtualList,
              isLoading && isValidating && 'opacity-50'
            )}
          >
            {item => (
              <ChatListItem
                key={item.id}
                id={item.id}
                name={item.character.name}
                avatar={getPublicUrl(item.character.avatar_key)}
                time={formatDateOrTime(
                  item.last_accessed_at ?? item.created_at,
                  'time'
                )}
                lastMessage={item.last_message}
                unreadCount={item?.metadata?.new_msg_count ?? 0}
                isPinned={item.is_pinned}
                onClick={async () => {
                  NProgress.start();
                  router.push(
                    `/chat/${item.room_id}?sessionId=${item.session_id}`
                  );
                }}
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
      {!isValidating && chatrooms.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-12 bg-gray-90 text-gray-70">
          <NavChat className="size-48" />
          <p className="text-14 font-semibold text-gray-60">
            {searchParamsKey === 'general'
              ? t('no_generalization')
              : t('no_chapter')}
          </p>
        </div>
      )}
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
  time: string;
  lastMessage: string;
  unreadCount: number;
  isPinned: boolean;
};

const ChatListItem = React.forwardRef<HTMLDivElement, ChatListItemProps>(
  (
    { name, avatar, time, lastMessage, unreadCount, isPinned, ...rest },
    ref
  ) => {
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
          className="aspect-square h-60 w-60 rounded-max bg-gray-80 object-cover"
          priority
        />
        <div className="min-w-0 flex-1 leading-normal">
          <div className="mb-8 flex items-center gap-8">
            <p className="truncate text-16 font-bold text-gray-00">{name}</p>
            {isPinned && <Pin className="size-18 shrink-0 text-gray-00" />}
          </div>
          {lastMessage && (
            <p className="line-clamp-2 text-14 font-normal text-gray-50">
              {lastMessage}
            </p>
          )}
        </div>

        <div className="flex w-60 shrink-0 flex-col items-end gap-8 py-4">
          <time className="text-12 font-semibold text-gray-50" title={time}>
            {time}
          </time>
          <Badge.CountNode count={unreadCount} />
        </div>
      </div>
    );
  }
);

ChatListItem.displayName = 'ChatListItem';
