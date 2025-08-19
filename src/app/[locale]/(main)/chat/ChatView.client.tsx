'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import VirtualList from 'rc-virtual-list';

import { formatDateOrTime } from '@/utils/formatTime';

import { DEFAULT_IMAGE_URL } from './[chatroomId]/utils';
import RoomItem, { RoomItemProps } from './RoomItem.client';

interface ChatViewProps {
  sessions: any;
  chatBotName: string;
}

export default function ChatView({
  sessions: chatSessions,
  chatBotName,
}: ChatViewProps) {
  const router = useRouter();
  const t = useTranslations('chat_page');

  const myRooms = useMemo(() => {
    return (
      chatSessions?.map((session: any) => ({
        session_id: session.id,
        ...session.chatrooms.find(
          (chatroom: any) => chatroom.room_name === chatBotName
        ),
      })) ?? []
    );
  }, [chatSessions]);

  const mappedRooms = (items: any) => {
    return items.map((room: any) => ({
      id: room.id,
      name: room.room_name,
      avatar: DEFAULT_IMAGE_URL,
      createdAt: formatDateOrTime(room.last_message_at, 'time'),
      lastMessage: room.last_message,
      unreadCount: 0,
      sessionId: room.session_id,
    }));
  };

  console.log('myRooms', myRooms);
  const onScroll = (e: any) => {
    console.log(e);
  };

  return (
    <div className="container min-h-0 overflow-auto p-4">
      {mappedRooms(myRooms).length > 0 ? (
        <VirtualList
          data={mappedRooms(myRooms)}
          itemHeight={47}
          onScroll={onScroll}
          itemKey="id"
        >
          {(item: RoomItemProps) => (
            <RoomItem
              key={item.id}
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              createdAt={item.createdAt}
              lastMessage={item.lastMessage}
              unreadCount={item.unreadCount}
              sessionId={item.sessionId}
              onClick={() =>
                router.push(`/chat/${item.id}?sessionId=${item.sessionId}`)
              }
            />
          )}
        </VirtualList>
      ) : (
        <div>{t('no_rooms')}</div>
      )}
    </div>
  );
}
