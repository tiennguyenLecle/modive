import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { messagesAtom } from '@/atoms/messagesAtom';
import { NextApi } from '@/lib/api';
import { Message } from '@/lib/api/types/chat.types';
import { buildQueryString, QueryParams } from '@/utils/urlBuilder';

import {
  CHAT_CONSTANTS,
  CHAT_DIRECTIONS,
  ChatDirection,
} from '../utils/constants';
import { useMessageLoadingState } from './useChatState';

// Types
interface ChatQueryParams extends QueryParams {
  limit?: number;
  direction?: ChatDirection;
  cursor?: string;
}

interface ChatApiResponse {
  data: Message[];
}

/**
 * Hook for managing message state and updates
 */
export const useMessageManagement = (initialMessages: Message[]) => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const updatedMessagesRef = useRef<Message[]>([]);

  useEffect(() => {
    if (initialMessages.length === 0) {
      return;
    }

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
  const {
    isLoadingMore,
    hasMoreMessages,
    startLoadingMore,
    stopLoadingMore,
    setNoMoreMessages,
  } = useMessageLoadingState();

  const prevLoadMoreRef = useRef<boolean>(false);

  const handleLoadMore = async (): Promise<boolean> => {
    if (prevLoadMoreRef.current || !hasMoreMessages) return false;

    prevLoadMoreRef.current = true;
    startLoadingMore();

    try {
      const beforeIdx = updatedMessagesRef.current?.[0]?.id;
      if (!beforeIdx) {
        stopLoadingMore();
        prevLoadMoreRef.current = false;
        return false;
      }

      const queryParams: ChatQueryParams = {
        direction: CHAT_DIRECTIONS.BEFORE,
        cursor: beforeIdx,
        limit: CHAT_CONSTANTS.LOAD_MORE_LIMIT,
      };

      const res = await NextApi.get<ChatApiResponse>(
        `/api/chat/${chatroomId}${buildQueryString(queryParams)}`
      );

      if (res?.data?.length > 0) {
        // Update messages - Virtuoso will automatically maintain scroll position
        updatedMessagesRef.current = [
          ...res.data.reverse(),
          ...updatedMessagesRef.current,
        ];

        prevLoadMoreRef.current = false;
        stopLoadingMore();
        return true;
      } else {
        prevLoadMoreRef.current = true;
        setNoMoreMessages();
        stopLoadingMore();
        return false;
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
      stopLoadingMore();
      prevLoadMoreRef.current = false;
      return false;
    }
  };

  return {
    isPreviousLoading: isLoadingMore,
    hasMoreMessages,
    handleLoadMore,
  };
};

/**
 * Hook for sending messages
 */
export const useSendMessage = () => {
  const { chatroomId } = useParams();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const sendMessage = useCallback(
    async (text: string): Promise<void> => {
      if (!chatroomId) {
        throw new Error('Chatroom ID is required');
      }

      if (!sessionId) {
        throw new Error('Session ID is required');
      }

      try {
        await NextApi.post(`/api/chat/${chatroomId}`, {
          body: {
            sessionId,
            text,
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

/**
 * Hook for fetching messages with proper query parameter handling
 */
export const useFetchMessages = (
  chatroomId: string,
  limit: number = CHAT_CONSTANTS.DEFAULT_MESSAGE_LIMIT,
  direction?: ChatDirection,
  cursor?: string
) => {
  const queryParams: ChatQueryParams = { limit, direction, cursor };

  const { data, isLoading, error } = useSWR<ChatApiResponse>(
    ['chat-room-messages', chatroomId, limit, cursor, direction],
    () =>
      NextApi.get<ChatApiResponse>(
        `/api/chat/${chatroomId}${buildQueryString(queryParams)}`
      ),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    data,
    isLoading,
    error,
    messages: data?.data ?? [],
  };
};
