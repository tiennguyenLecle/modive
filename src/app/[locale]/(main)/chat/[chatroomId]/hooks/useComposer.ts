import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { messagesAtom } from '@/atoms/messagesAtom';
import { NextApi } from '@/lib/api';
import { Message, SpeakerType } from '@/lib/api/types/chat.types';
import { useAuth } from '@/lib/authentication/auth-context';

// Types
export type MockMessage = {
  id: string;
  chatroom_id: string;
  speaker_type: SpeakerType;
  speaker_id: string | undefined;
  message: string;
  created_at: string;
};

// Constants
const POLLING_INTERVAL = 1000;
const TIMEOUT_DURATION = 30000;
const MESSAGE_LIMIT = 20;

/**
 * Hook for managing message polling and updates
 */
export const useMessagePolling = (chatroomId: string) => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const messagesRef = useRef<Message[]>([]);

  const pollForNewMessages = useCallback(
    async (
      lastMessageId: string,
      onComplete: (newMessages: Message[]) => void
    ) => {
      // Count the number of new messages which user sent
      const countNewMessages = messagesRef?.current?.filter(msg =>
        msg.id.startsWith('newMessageUserItemId')
      ).length;

      const startTime = Date.now();

      const poll = async () => {
        try {
          const res: any = await NextApi.get(
            `/api/chat/${chatroomId}?limit=${MESSAGE_LIMIT}&direction=after&cursor=${lastMessageId}`
          );
          const newMessages = res?.data ?? [];

          if (newMessages.length >= countNewMessages * 2) {
            // Got both user and chatbot messages
            messagesRef.current = [...messagesRef.current, ...newMessages];
            messagesRef.current = messagesRef.current
              .filter(msg => !msg.id.startsWith('newMessageUserItemId')) // xoá hết user msg
              .filter(
                (msg, idx, arr) =>
                  !msg.id.startsWith('temparareryChatbotItemId') ||
                  idx === arr.length - 1
              );

            setMessages(messagesRef.current);
            onComplete(newMessages);
            return true; // Stop polling
          } else if (Date.now() - startTime >= TIMEOUT_DURATION) {
            // Timeout reached
            if (newMessages.length === countNewMessages) {
              const erroredMessage = { ...newMessages[0], error: true };
              messagesRef.current = [...messagesRef.current, erroredMessage];
              messagesRef.current = messagesRef.current.filter(
                msg => !msg.id.startsWith('temparareryChatbotItemId')
              );
              setMessages(messagesRef.current);
            }
            onComplete(newMessages);
            return true; // Stop polling
          }

          return false; // Continue polling
        } catch (error) {
          console.error('Error polling for messages:', error);
          onComplete([]);
          return true; // Stop polling on error
        }
      };

      // Initial poll
      const shouldStop = await poll();
      if (shouldStop) return;

      // Continue polling
      const interval = setInterval(async () => {
        const shouldStop = await poll();
        if (shouldStop) {
          clearInterval(interval);
        }
      }, POLLING_INTERVAL);

      // Cleanup on unmount
      return () => clearInterval(interval);
    },
    [chatroomId, setMessages]
  );

  return { messages, setMessages, messagesRef, pollForNewMessages };
};

/**
 * Hook for managing message composition and input
 */
export const useMessageComposition = (
  chatroomId: string,
  chatbotName: string
) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  const createMockUserMessage = useCallback(
    (message: string, index: number): MockMessage => ({
      id: `newMessageUserItemId-${index}`,
      chatroom_id: chatroomId,
      speaker_type: 'user',
      speaker_id: user?.id,
      message,
      created_at: dayjs().toISOString(),
    }),
    [chatroomId, user?.id]
  );

  const createMockChatbotMessage = useCallback(
    (index: number): MockMessage => ({
      id: `temparareryChatbotItemId-${index}`,
      chatroom_id: chatroomId,
      speaker_type: 'chatbot',
      speaker_id: chatbotName,
      message: 'Thinking',
      created_at: dayjs().toISOString(),
    }),
    [chatroomId, chatbotName]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewMessage(e.target.value);
    },
    []
  );

  const clearMessage = useCallback(() => {
    setNewMessage('');
  }, []);

  return {
    newMessage,
    handleChange,
    clearMessage,
    createMockUserMessage,
    createMockChatbotMessage,
    isDisabled: !newMessage.trim(),
  };
};
