'use client';

import { ComponentProps } from 'react';

import { ProgressBar } from '@/components';
import { Message } from '@/lib/api/types/chat.types';
import { cx } from '@/utils/method';

// import Chatbot from './Chatbot.client';

type ChatRoomProps = ComponentProps<'div'> & {
  messages: Message[];
};

export default function ChatRoom({
  messages,
  className,
  ...props
}: ChatRoomProps) {
  return (
    <div className={cx('flex h-full flex-col', className)} {...props}>
      <div className="container flex h-56 items-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">Kang Lee -hyun</h1>
      </div>
      <div className="container flex h-48 items-center border-b border-t border-gray-80">
        <span>Favorability 1</span>
        <ProgressBar percentage={10} />
      </div>
      {/* <Chatbot messages={messages} /> */}
    </div>
  );
}
