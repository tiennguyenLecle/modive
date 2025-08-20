'use client';

import { ComponentProps } from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { ArrowRight } from '@/assets/icons';
import { messagesAtom } from '@/atoms/messagesAtom';
import { ProgressBar } from '@/components';
import { Message } from '@/lib/api/types/chat.types';
import { cx } from '@/utils/method';

import Chatbot from './Chatbot.client';
import { useAffectionScore } from './hooks/useAffectionScore';

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
  const messagesFromAtom = useAtomValue(messagesAtom);
  const affectionScore = useAffectionScore(messagesFromAtom);
  const t = useTranslations('chat_page');

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
      <div className="container flex h-[48px] items-center gap-[16px] border-b border-t border-gray-80">
        <ProgressBar
          label={t('room.intimacy')}
          value={affectionScore ?? 0}
          fillColor={{
            from: '#FF627B',
            to: '#FFB559',
          }}
        />
      </div>
      <Chatbot messages={messages} chatbotName={chatBotName} />
    </div>
  );
}
