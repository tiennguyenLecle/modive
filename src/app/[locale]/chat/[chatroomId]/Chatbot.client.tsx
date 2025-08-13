'use client';

import { ComponentProps, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';

import { Message } from '@/lib/api/types/chat.types';
import { ChatboxLayout, MessageList } from '@/lib/chatbot-modules';

import '@/lib/chatbot-modules/dist/styles.css';

import styles from './ChatRoom.module.scss';
import Composer from './Composer.client';
import {
  useLoadMoreMessages,
  useMessageManagement,
  useSendMessage,
} from './hooks/useChatbot';
import { mapMessagesToInfoProps } from './messageTransformers';
import { ThreeDotsLoading } from '@/components/Loading';


// Types
type ChatbotProps = ComponentProps<'div'> & {
  messages: Message[];
  chatbotName: string;
  currentUserId: string;
};

// Main component
export default function Chatbot({
  messages: initialMessages,
  chatbotName,
}: ChatbotProps) {
  const { chatroomId } = useParams();
  // ref to message list
  const messageListRef = useRef<any>(null);

  const { messages, setMessages, updatedMessagesRef } =
    useMessageManagement(initialMessages);
  const { isPreviousLoading, handleLoadMore } = useLoadMoreMessages(
    chatroomId as string,
    updatedMessagesRef,
    messageListRef
  );
  const { sendMessage } = useSendMessage();

  // Update messages when new ones are loaded
  useEffect(() => {
    if (updatedMessagesRef?.current?.length > 0) {
      setMessages(updatedMessagesRef.current);
    }
  }, [updatedMessagesRef?.current, setMessages]);

  const messageComponent = useMemo(
    () => (
      <MessageList
        messages={mapMessagesToInfoProps(messages)}
        conversationId={chatroomId as string}
        cache="local"
        onLoadMorePreviousData={handleLoadMore}
        showScrollToEndButton={true}
        className={'px-16'}
        ref={messageListRef}
        isPrevLoading={isPreviousLoading}
        responseLoadingComponent={<ThreeDotsLoading />}
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
      layoutHeight="calc(100dvh - 56px - 48px)" // 56px + 48px: header height + 10px: padding top of composer
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
