'use client';

import { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';

import { ArrowRight } from '@/assets/icons';
import { ProgressBar } from '@/components';
import { Message } from '@/lib/api/types/chat.types';
import { cx } from '@/utils/method';

import Chatbot from './Chatbot.client';

type ChatRoomProps = ComponentProps<'div'> & {
  messages: Message[];
  chatBotName: string;
};

export default function ChatRoom({
  messages,
  className,
  chatBotName,
  ...props
}: ChatRoomProps) {
  const router = useRouter();

  return (
    <div className={cx('flex h-full flex-col', className)} {...props}>
      <div className="container flex h-56 items-center gap-12 border-b border-t border-gray-80">
        <button
          className="rounded-full h-24 w-24 bg-gray-100"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowRight className="rotate-180" />
        </button>
        <h1 className="text-16 font-bold">{chatBotName}</h1>
      </div>
      <div className="container flex h-48 items-center border-b border-t border-gray-80">
        <span>Favorability</span>
        <ProgressBar percentage={10} />
      </div>
      <Chatbot messages={messages} chatbotName={chatBotName} />
    </div>
  );
}
