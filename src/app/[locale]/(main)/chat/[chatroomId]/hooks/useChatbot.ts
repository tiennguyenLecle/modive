import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';

import { messagesAtom } from '@/atoms/messagesAtom';
import { NextApi } from '@/lib/api';
import { Message } from '@/lib/api/types/chat.types';

/**
 * Hook for managing message state and updates
 */
export const useMessageManagement = (initialMessages: Message[]) => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const updatedMessagesRef = useRef<Message[]>([]);

  useEffect(() => {
    setMessages(initialMessages);
    updatedMessagesRef.current = [...initialMessages];
  }, [initialMessages, setMessages]);

  return { messages, setMessages, updatedMessagesRef };
};

/**
 * Hook for loading more previous messages
 */
export const useLoadMoreMessages = (
  chatroomId: string,
  updatedMessagesRef: React.MutableRefObject<Message[]>,
  messageListRef: React.MutableRefObject<any>
) => {
  const [isPreviousLoading, setIsPreviousLoading] = useState(false);
  const prevLoadMoreRef = useRef<boolean>(false);
  const noDataRef = useRef(false);

  const handleLoadMore = async () => {
    if (prevLoadMoreRef.current || noDataRef.current) return;

    prevLoadMoreRef.current = true;
    setIsPreviousLoading(true);

    const beforeIdx = updatedMessagesRef.current?.[0]?.id;

    try {
      const res: any = await NextApi.get(
        `/api/chat/${chatroomId}?direction=before&cursor=${beforeIdx}&limit=20`
      );

      if (res?.data?.length > 0) {
        // Update messages - Virtuoso will automatically maintain scroll position
        updatedMessagesRef.current = [
          ...res.data.reverse(),
          ...updatedMessagesRef.current,
        ];

        prevLoadMoreRef.current = false;
        setIsPreviousLoading(false);
        return true;
      } else {
        prevLoadMoreRef.current = true;
        noDataRef.current = true;
        setIsPreviousLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
      setIsPreviousLoading(false);
      prevLoadMoreRef.current = false;
      return false;
    }
  };

  return { isPreviousLoading, handleLoadMore };
};

/**
 * Hook for sending messages
 */
export const useSendMessage = () => {
  const { chatroomId } = useParams();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const sendMessage = useCallback(
    async (text: string) => {
      try {
        await NextApi.post(`/api/chat/${chatroomId}`, {
          body: {
            sessionId,
            text: text,
          },
        });
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    },
    [chatroomId, sessionId]
  );

  return { sendMessage };
};
