import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { messagesAtom } from '@/atoms/messagesAtom';
import { NextApi } from '@/lib/api';
import { Message, SpeakerType } from '@/lib/api/types/chat.types';
import { useAuth } from '@/lib/authentication/auth-context';
import { formatDateOrTime } from '@/utils/formatTime';

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

let newMesssageChatbotIds: string[] = [];

/**
 * Hook for managing message polling and updates
 */
let itemsOfNewMessagesIds: string[] = [];

export const useMessagePolling = (chatroomId: string) => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const messagesRef = useRef<Message[]>([]);

  function mergeMessages(
    current: Message[],
    newMessages: Message[]
  ): Message[] {
    if (!newMessages?.length) return current;
    let updated = [...current];

    // Tách loading
    const loadingAll = current?.filter(m =>
      m.id.startsWith('temparareryChatbotItemId')
    );
    const latestLoading = loadingAll.at(-1);

    updated = current?.filter(
      m => !m.id.startsWith('temparareryChatbotItemId')
    );

    for (const nm of newMessages) {
      const idx = updated?.findIndex(
        m =>
          m.id === nm.id ||
          (m.message === nm.message &&
            formatDateOrTime(m.created_at ?? '', 'time') ===
              formatDateOrTime(nm.created_at ?? '', 'time') &&
            m.speaker_type === 'user')
      );

      if (idx !== -1) {
        updated[idx] = nm;
      } else {
        updated.push(nm);
      }
    }

    if (latestLoading) updated.push(latestLoading);

    return updated;
  }

  const pollForNewMessages = useCallback(
    (onComplete: (newMessages: Message[]) => void) => {
      const itemsOfNewMessages = messagesRef.current?.filter((msg: Message) =>
        msg?.id?.startsWith('newMessageUserItemId')
      );

      itemsOfNewMessagesIds = [
        ...itemsOfNewMessagesIds,
        ...itemsOfNewMessages?.map(msg => msg.id),
      ]?.filter((id, index, self) => self.indexOf(id) === index);

      const startTime = Date.now();
      let stopped = false;

      const poll = async (): Promise<boolean> => {
        try {
          const lastMessageId =
            messagesRef.current
              .filter(
                msg =>
                  !msg?.id?.startsWith('newMessageUserItemId') &&
                  !msg?.id?.startsWith('temparareryChatbotItemId')
              )
              .at(-1)?.id ?? '';

          const res: any = await NextApi.get(
            `/api/chat/${chatroomId}?limit=${MESSAGE_LIMIT}&direction=after&cursor=${lastMessageId}`
          );
          const newMessages = res?.data ?? [];

          if (newMessages.length > 0) {
            messagesRef.current = mergeMessages(
              messagesRef.current,
              newMessages
            );

            newMessages.forEach((m: Message) => {
              if (
                m.speaker_type === 'chatbot' &&
                !newMesssageChatbotIds.find(id => id === m?.id)
              ) {
                newMesssageChatbotIds.push(m.id);
              }
            });

            setMessages(messagesRef.current);
            onComplete(newMessages);
          }

          if (
            Date.now() - startTime >= TIMEOUT_DURATION ||
            newMesssageChatbotIds?.length === itemsOfNewMessagesIds?.length
          ) {
            messagesRef.current = messagesRef.current?.filter(
              msg => !msg?.id?.startsWith('temparareryChatbotItemId')
            );
            setMessages(messagesRef.current);

            newMesssageChatbotIds = [];
            itemsOfNewMessagesIds = [];
            return true;
          }

          return false; // tiếp tục poll
        } catch (err) {
          console.error('Error polling for messages:', err);
          onComplete([]);
          return true;
        }
      };

      const loop = async () => {
        if (stopped) {
          return;
        }
        const shouldStop = await poll();
        if (!shouldStop) {
          setTimeout(loop, POLLING_INTERVAL);
        }
      };

      loop();

      return () => {
        stopped = true;
      };
    },
    [chatroomId, setMessages]
  );

  return {
    messages,
    setMessages,
    messagesRef,
    pollForNewMessages,
  };
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
    (message: string, id: string): MockMessage => ({
      id: `newMessageUserItemId-${id}`,
      chatroom_id: chatroomId,
      speaker_type: 'user',
      speaker_id: user?.id,
      message,
      created_at: dayjs().toISOString(),
    }),
    [chatroomId, user?.id]
  );

  const createMockChatbotMessage = useCallback(
    (id: string): MockMessage => ({
      id: `temparareryChatbotItemId-${id}`,
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
