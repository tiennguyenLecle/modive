'use client';

import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { NextApi } from '@/lib/api';
import { Message } from '@/lib/api/types/chat.types';
import {
  ChatboxLayout,
  MessageInfoProps,
  MessageList,
} from '@/lib/chatbot-modules';

import '@/lib/chatbot-modules/dist/styles.css';

import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { messagesAtom } from '@/atoms/messagesAtom';

import { formatDateOrTime } from '@/utils/formatTime';
import { filterMessageConditions } from '@/utils/method';

import styles from './ChatRoom.module.scss';
import Composer from './Composer.client';
import { LoadingDots } from './Loading.client';
import { handleAlign, DEFAULT_IMAGE_URL, handleMessageText } from './utils';


type ChatbotProps = ComponentProps<'div'> & {
  messages: Message[];
  chatbotName: string;
  currentUserId: string;
};



export default function Chatbot({
  messages: initialMessages,
  chatbotName,
}: ChatbotProps) {

  const { sendMessage } = useSendMessage();

  const [messages, setMessages] = useAtom(messagesAtom);

  const { chatroomId } = useParams();

  const [isPreviousLoading, setIsPreviousLoading] = useState(false);

  const prevLoadMoreRef = useRef<boolean>(false);
  // ref to message list
  const messageListRef = useRef<any>(null);
  // check if there are more messages before the current messages
  const noDataRef = useRef(false);

  // updated messages immediately
  const updatedMessagesRef = useRef<Message[]>([]);

  useEffect(() => {
    setMessages(initialMessages);
    updatedMessagesRef.current = [...initialMessages];
  }, [initialMessages, setMessages]);


  const handleLoadMore = useCallback(async () => {
    if (prevLoadMoreRef.current || noDataRef.current) return;

    prevLoadMoreRef.current = true;
    setIsPreviousLoading(true);

    const prevMessages = updatedMessagesRef.current?.length;
    const beforeIdx = updatedMessagesRef.current?.[0]?.id;

    const res: any = await NextApi.get(
      `/api/chat/${chatroomId}?direction=before&cursor=${beforeIdx}&limit=20`
    );

    if (res?.data?.length > 0) {

      updatedMessagesRef.current = [...res.data.reverse(), ...updatedMessagesRef.current];
      setMessages(updatedMessagesRef.current);
      prevLoadMoreRef.current = false;

      setTimeout(() => {
        (messageListRef as any).current.scrollToIndex({
          index: updatedMessagesRef.current.length - prevMessages,
          align: 'end',
          behavior: 'instant',
        });
        setIsPreviousLoading(false);
      }, 100);

    } else {
      prevLoadMoreRef.current = true;
      noDataRef.current = true;
      setIsPreviousLoading(false);
    }
  }, [messages, isPreviousLoading]);


  const mappedMessages = (
    messages: Message[],
    hasMorePrevious = false
  ): MessageInfoProps[] => {
    const seenIds = new Set<string>();

    // filter message and map to message info props

    // create base array
    const base = messages
      // filter message by conditions
      .filter(msg => !filterMessageConditions(msg.message, msg.id, seenIds))
      .map(msg => ({
        id: msg.id,
        chatroomId: msg.chatroom_id,
        speakerType: msg.speaker_type ?? 'user',
        align: handleAlign(msg.speaker_type ?? 'user'),
        speakerId: msg.speaker_id,
        name: msg.speaker_id,
        message: msg.message,
        createdAt: formatDateOrTime(msg.created_at ?? '', 'time'),
        createdDate: msg.created_at
          ? dayjs(msg.created_at).format('YYYY-MM-DD')
          : null,
        avatarUrl: DEFAULT_IMAGE_URL,
        messageArray: msg.id === 'temparareryChatbotItemId' ? [{
            type: 'loading',
            message: 'Loading...',
        }] : handleMessageText(msg.message),
      }));

    const out: MessageInfoProps[] = [];

    // handle to create system item - date header
    for (let i = 0; i < base.length; i++) {
      const current = base[i];
      const prev = base[i - 1];
      const curDate = current.createdDate;
      const prevDate = prev?.createdDate ?? null;

      const shouldInsertHeader =
        curDate &&
        ((prevDate && prevDate !== curDate) || (!prev && !hasMorePrevious));

      if (shouldInsertHeader) {
        const pretty = formatDateOrTime(curDate, 'date');
        out.push({
          id: `system_date_${curDate}`,
          chatroomId: current.chatroomId,
          speakerType: 'system',
          speakerId: 'system',
          name: 'system',
          message: `${pretty}`,
          contentOverride: `${pretty}`,
          createdDate: curDate,
        });
      }

      out.push(current);
    }

    // 3) remove the temporary createdDate field before returning (optional)
    return out.map(({ createdDate, ...rest }) => rest as MessageInfoProps);
  };


  const messageComponent = useMemo(
    () => (
      <MessageList
        messages={mappedMessages(messages)}
        conversationId={chatroomId as string}
        cache="local"
        onLoadMorePreviousData={handleLoadMore}
        showScrollToEndButton={true}
        className={'px-16'}
        ref={messageListRef}
        isPrevLoading={isPreviousLoading}
        responseLoadingComponent={<LoadingDots />}
        prevLoadingComponent={
          <div className="flex h-40 w-full items-center justify-center text-16">
            Loading...
          </div>
        }
      />
    ),
    [handleLoadMore, isPreviousLoading, chatroomId, messages]
  );

  return (
    <ChatboxLayout
      className={styles.chatboxLayout}
      backgroundColor="var(--color-background)"
      layoutHeight="calc(100dvh - 56px - 48px)" // 56px + 48px: header height
      messageComponent={messageComponent}
      composerComponent={
        <Composer
          chatroomId={chatroomId as string}
          chatbotName={chatbotName}
          sendMessage={sendMessage}
          isChapterMode={false}
        />
      }
    />
  );
}

const useSendMessage = () => {
  const { chatroomId } = useParams();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const sendMessage = async (text: string) => {
    await NextApi.post(`/api/chat/${chatroomId}`, {
      body: {
        sessionId,
        text: text,
      },
    });
  };

  return { sendMessage };
};
