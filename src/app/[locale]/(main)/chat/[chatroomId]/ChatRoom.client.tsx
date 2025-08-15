'use client';

import { ComponentProps, useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { messagesAtom } from '@/atoms/messagesAtom';
import { ProgressBar } from '@/components';
import { Message } from '@/lib/api/types/chat.types';
import { cx } from '@/utils/method';

import Chatbot from './Chatbot.client';

type ChatRoomProps = ComponentProps<'div'> & {
  messages: Message[];
  chatBotName: string;
  currentUserId: string;
};

export default function ChatRoom({
  messages,
  className,
  chatBotName,
  currentUserId,
  ...props
}: ChatRoomProps) {
  const setMessages = useSetAtom(messagesAtom);

  useEffect(() => {
    return () => {
      setMessages([]);
    };
  }, []);

  return (
    <div className={cx('flex h-full flex-col', className)} {...props}>
      <div className="container flex h-56 items-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">{chatBotName}</h1>
      </div>
      <div className="container flex h-48 items-center border-b border-t border-gray-80">
        <span>Favorability</span>
        <ProgressBar percentage={10} />
      </div>
      <Chatbot
        messages={messages}
        chatbotName={chatBotName}
        currentUserId={currentUserId}
      />
    </div>
  );
}
