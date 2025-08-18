'use client';

import { memo, useCallback } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import {
  AsteristkDisabledIcon,
  AsteristkIcon,
  DirectDisabledIcon,
  DirectIcon,
  TipDisabledIcon,
  TipIcon,
} from '@/assets/icons';
import { ChatboxComposer } from '@/lib/chatbot-modules';
import { formatDateOrTime } from '@/utils/formatTime';

import styles from './ChatRoom.module.scss';
import { useMessageComposition, useMessagePolling } from './hooks/useComposer';

// Types
type ComposerProps = {
  chatroomId: string;
  chatbotName: string;
  sendMessage: (text: string) => Promise<void>;
  isChapterMode: boolean;
};

// Main component
const Composer = memo(
  ({
    chatroomId,
    chatbotName,
    sendMessage,
    isChapterMode = false,
  }: ComposerProps) => {
    const { messages, setMessages, messagesRef, pollForNewMessages } =
      useMessagePolling(chatroomId);
    const {
      newMessage,
      handleChange,
      createMockUserMessage,
      createMockChatbotMessage,
      isDisabled,
    } = useMessageComposition(chatroomId, chatbotName);

    const handleSendMessage = useCallback(async () => {
      if (!newMessage.trim()) return;

      // Store current messages state
      messagesRef.current = [...messages];

      const id = uuidv4();
      const create_at = dayjs().toISOString();

      // Remove temporary messages of chatbot - for the same time - keep only the last one
      messagesRef.current = messagesRef?.current?.filter(
        msg =>
          !(
            msg?.id?.startsWith('temparareryChatbotItemId') &&
            formatDateOrTime(msg.created_at ?? '', 'time') ===
              formatDateOrTime(create_at, 'time')
          )
      );

      // Add temporary messages
      const mockUserMessage = createMockUserMessage(newMessage, id);

      const mockChatbotMessage = createMockChatbotMessage(id);

      messagesRef.current = [
        ...messagesRef.current,
        mockUserMessage,
        mockChatbotMessage,
      ];

      setMessages(messagesRef.current);

      try {
        // Send the actual message
        await sendMessage(newMessage);

        // Start polling for new messages
        await pollForNewMessages(() => {
          setMessages(messagesRef.current);
        });
      } catch (error) {
        console.error('Error sending message:', error);
        // Remove temporary messages on error
        messagesRef.current = messagesRef.current.filter(
          msg =>
            !msg.id.startsWith('temparareryChatbotItemId') &&
            !msg.id.startsWith('newMessageUserItemId')
        );
        setMessages(messagesRef.current);
      }
    }, [newMessage, messages]);

    return (
      <div className={styles.composer}>
        <ChatboxComposer
          beforeComposerOutside={
            <button
              className="chatbox-composer-before-outside"
              disabled={isDisabled}
            >
              {isDisabled ? <TipDisabledIcon /> : <TipIcon />}
            </button>
          }
          textareaProps={{
            value: newMessage,
            onChange: handleChange,
            placeholder: '메시지를 입력하세요',
            autoSize: {
              minRows: 1,
              maxRows: 5,
            },
          }}
          afterComposerInside={
            isChapterMode && (
              <button
                className="chatbox-composer-after-inside"
                disabled={isDisabled}
              >
                {isDisabled ? <AsteristkDisabledIcon /> : <AsteristkIcon />}
              </button>
            )
          }
          sendButtonComponent={{
            onClick: handleSendMessage,
            isDisabled: isDisabled,
            children: isDisabled ? <DirectDisabledIcon /> : <DirectIcon />,
          }}
        />
      </div>
    );
  }
);

Composer.displayName = 'Composer';

export default Composer;
