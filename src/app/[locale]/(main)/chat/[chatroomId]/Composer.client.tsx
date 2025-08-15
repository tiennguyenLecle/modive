'use client';

import { memo, useCallback, useRef } from 'react';

import AsteristkDisabledIcon from '@/assets/icons/asterisk-disabled.svg';
import AsteristkIcon from '@/assets/icons/asterisk.svg';
import DirectDisabledIcon from '@/assets/icons/direct-disabled.svg';
import DirectIcon from '@/assets/icons/direct.svg';
import TipDisabledIcon from '@/assets/icons/tip-disabled.svg';
import TipIcon from '@/assets/icons/tip.svg';
import { ChatboxComposer } from '@/lib/chatbot-modules';

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
      clearMessage,
      createMockUserMessage,
      createMockChatbotMessage,
      isDisabled,
    } = useMessageComposition(chatroomId, chatbotName);

    const mockMessageIndex = useRef(1);

    const handleSendMessage = useCallback(async () => {
      if (!newMessage.trim()) return;
      clearMessage();

      // Store current messages state
      messagesRef.current = [...messages];
      const realMessages = messages.filter(
        item =>
          !item.id.startsWith('newMessageUserItemId') &&
          !item.id.startsWith('temparareryChatbotItemId')
      );

      const lastMessageId = realMessages[realMessages.length - 1]?.id ?? '';

      messagesRef.current = messagesRef.current.filter(
        msg => !msg.id.startsWith('temparareryChatbotItemId')
      );

      // Add temporary messages
      const mockUserMessage = createMockUserMessage(
        newMessage,
        mockMessageIndex.current
      );
      const mockChatbotMessage = createMockChatbotMessage(
        mockMessageIndex.current
      );

      messagesRef.current = [
        ...messagesRef.current,
        mockUserMessage,
        mockChatbotMessage,
      ];
      setMessages(messagesRef.current);
      mockMessageIndex.current++;

      try {
        // Send the actual message
        await sendMessage(newMessage);

        // Start polling for new messages
        await pollForNewMessages(lastMessageId, () => {
          // Update messages state with the final result
          setMessages(messagesRef.current);
          clearMessage();
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
    }, [
      newMessage,
      messages,
      sendMessage,
      createMockUserMessage,
      createMockChatbotMessage,
      pollForNewMessages,
      setMessages,
      clearMessage,
    ]);

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
