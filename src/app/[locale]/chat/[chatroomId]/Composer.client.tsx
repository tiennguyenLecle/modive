'use client';

import { memo, useCallback } from 'react';

import AsteristkDisabledIcon from '@/assets/icons/asterisk-disabled.svg';
import AsteristkIcon from '@/assets/icons/asterisk.svg';
import DirectDisabledIcon from '@/assets/icons/direct-disabled.svg';
import DirectIcon from '@/assets/icons/direct.svg';
import TipDisabledIcon from '@/assets/icons/tip-disabled.svg';
import TipIcon from '@/assets/icons/tip.svg';
import { ChatboxComposer } from '@/lib/chatbot-modules';

import styles from './ChatRoom.module.scss';
import { useMessagePolling, useMessageComposition } from './hooks/useComposer';

// Types
type ComposerProps = {
  chatroomId: string;
  chatbotName: string;
  sendMessage: (text: string) => Promise<void>;
  isChapterMode: boolean;
};

// Main component
const Composer = memo(({
  chatroomId,
  chatbotName,
  sendMessage,
  isChapterMode = false,
}: ComposerProps) => {
  const { messages, setMessages, messagesRef, pollForNewMessages } = useMessagePolling(chatroomId);
  const {
    newMessage,
    handleChange,
    clearMessage,
    createMockUserMessage,
    createMockChatbotMessage,
    isDisabled,
  } = useMessageComposition(chatroomId, chatbotName);

  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;

    // Store current messages state
    messagesRef.current = [...messages];
    const lastMessageId = messagesRef.current[messagesRef.current.length - 1]?.id ?? '';

    // Add temporary messages
    const mockUserMessage = createMockUserMessage(newMessage);
    const mockChatbotMessage = createMockChatbotMessage();
    
    messagesRef.current = [...messagesRef.current, mockUserMessage, mockChatbotMessage];
    setMessages(messagesRef.current);

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
        msg => msg.id !== 'temparareryChatbotItemId' && msg.id !== 'newMessageUserItemId'
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
        beforeComposerOutsideComponent={{
          onClick: () => console.log('Tip'),
          disabled: isDisabled,
          children: isDisabled ? <TipDisabledIcon /> : <TipIcon />,
        }}
        textareaProps={{
          value: newMessage,
          onChange: handleChange,
          placeholder: '메시지를 입력하세요',
          autoSize: {
            minRows: 1,
            maxRows: 5,
          },
        }}
        afterComposerInsideComponent={
          isChapterMode && {
            onClick: () => console.log('Asterisk'),
            disabled: isDisabled,
            children: isDisabled ? (
              <AsteristkDisabledIcon />
            ) : (
              <AsteristkIcon />
            ),
          }
        }
        sendButtonComponent={{
          onClick: handleSendMessage,
          isDisabled: isDisabled,
          children: isDisabled ? <DirectDisabledIcon /> : <DirectIcon />,
        }}
      />
    </div>
  );
});

Composer.displayName = 'Composer';

export default Composer;
