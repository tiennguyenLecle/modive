'use client';

import { ComponentProps } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { ProgressBar } from '@/components';
import { NextApi } from '@/lib/api';
import { Message } from '@/lib/api/types/chat.types';
import { cx } from '@/utils/method';

type ChatRoomProps = ComponentProps<'div'> & {
  messages: Message[];
};

export default function ChatRoom({
  messages,
  className,
  ...props
}: ChatRoomProps) {
  const { sendMessage } = useSendMessage();

  return (
    <div className={cx('flex h-full flex-col', className)} {...props}>
      <div className="container flex h-56 items-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">Kang Lee -hyun</h1>
      </div>
      <div className="container flex h-48 items-center border-b border-t border-gray-80">
        <span>Favorability 1</span>
        <ProgressBar percentage={10} />
      </div>
      <ul className="container flex min-h-0 flex-1 flex-col gap-20 overflow-auto py-16">
        {messages.map(message => (
          <li key={message.id}>
            <span>{message.message}</span>
          </li>
        ))}
      </ul>
      <div className="container">
        <button
          className="rounded-4 bg-primary p-8 text-left text-white"
          onClick={() => {
            sendMessage('Hello, how are you today?');
          }}
        >
          Send example message
        </button>
      </div>
    </div>
  );
}

const useSendMessage = () => {
  const { chatroomId } = useParams();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const sendMessage = async (text: string) => {
    await NextApi.post(`/api/chat/${chatroomId}`, {
      body: {
        sessionId,
        text,
      },
    });
  };

  return { sendMessage };
};
