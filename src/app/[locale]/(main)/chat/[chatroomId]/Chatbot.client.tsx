'use client';

import {
  ComponentProps,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { ThreeDotsLoading } from '@/components';
import { Message } from '@/lib/api/types/chat.types';
import {
  ChatboxLayout,
  MessageInfoProps,
  MessageList,
} from '@/lib/chatbot-modules';

import styles from './ChatRoom.module.scss';
import Composer from './Composer.client';
import {
  useLoadMoreMessages,
  useMessageManagement,
  useSendMessage,
} from './hooks/useChatbot';
import { mapMessagesToInfoProps } from './messageTransformers';

// Types
type ChatbotProps = ComponentProps<'div'> & {
  messages: Message[];
  chatbotName: string;
};

// Main component
const Chatbot = memo(
  ({ messages: initialMessages, chatbotName }: ChatbotProps) => {
    const t = useTranslations('chat_page');
    const { chatroomId } = useParams();
    // ref to message list
    const messageListRef = useRef<any>(null);

    const selectedImageItem = useRef<MessageInfoProps | null>(null);

    const { messages, setMessages, updatedMessagesRef } =
      useMessageManagement(initialMessages);
    const { isPreviousLoading, handleLoadMore } = useLoadMoreMessages(
      chatroomId as string,
      updatedMessagesRef,
      messageListRef
    );
    const { sendMessage } = useSendMessage();

    const prevLoadingComponent = useMemo(() => {
      return (
        <div className="flex h-40 w-full items-center justify-center text-16">
          {t('loading')}
        </div>
      );
    }, []);

    // Update messages when new ones are loaded
    useEffect(() => {
      if (updatedMessagesRef?.current?.length > 0) {
        setMessages(updatedMessagesRef.current);
      }
    }, [updatedMessagesRef?.current, setMessages]);

    const messageComponent = useMemo(
      () => (
        <MessageList
          customMessageComponentProps={{
            imageMessageProps: {
              onClick: (imgItem: MessageInfoProps) => {
                selectedImageItem.current = imgItem;
              },
              preview: {
                toolbarRender: () => {
                  return (
                    <div className="flex w-full items-center justify-between gap-12">
                      <span className="truncate text-16 font-bold">
                        {chatbotName}
                      </span>
                      <span className="min-w-140 truncate text-12 font-normal">
                        {selectedImageItem.current?.createdDate}{' '}
                        {selectedImageItem.current?.createdAt}
                      </span>
                    </div>
                  );
                },
              },
            },
          }}
          messages={mapMessagesToInfoProps(messages)}
          conversationId={chatroomId as string}
          cache="indexed"
          onLoadMorePreviousData={handleLoadMore}
          showScrollToEndButton={true}
          className={'px-16'}
          ref={messageListRef}
          isPrevLoading={isPreviousLoading}
          responseLoadingComponent={<ThreeDotsLoading />}
          prevLoadingComponent={prevLoadingComponent}
        />
      ),
      [handleLoadMore, isPreviousLoading, chatroomId, messages]
    );

    useEffect(() => {
      return () => {
        setMessages([]);
      };
    }, [setMessages]);

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
);
Chatbot.displayName = 'Chatbot';

export default Chatbot;
