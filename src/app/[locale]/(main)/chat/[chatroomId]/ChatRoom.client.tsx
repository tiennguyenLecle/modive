'use client';

import { ComponentProps, memo } from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { ArrowRight } from '@/assets/icons';
import { messagesAtom } from '@/atoms/messagesAtom';
import { ProgressBar, Spinner } from '@/components';
import { useRouter } from '@/lib/navigation';
import { ChatRoomType } from '@/types/chatroom';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

import Chatbot from './Chatbot.client';
import { useAffectionScore } from './hooks/useAffectionScore';
import { useFetchMessages } from './hooks/useChatbot';
import { CHAT_CONSTANTS } from './utils/constants';

type ChatRoomProps = ComponentProps<'div'> & {
  chatRoomDetail: ChatRoomType;
};

const ChatRoom = memo(
  ({ className, chatRoomDetail, ...props }: ChatRoomProps) => {
    const router = useRouter();
    const messagesFromAtom = useAtomValue(messagesAtom);
    const affectionScore = useAffectionScore(messagesFromAtom);
    const { chatroomId } = useParams();
    const t = useTranslations('chat_page');

    const { character } = chatRoomDetail;

    const { messages, isLoading } = useFetchMessages(
      chatroomId as string,
      CHAT_CONSTANTS.DEFAULT_MESSAGE_LIMIT
    );

    return (
      <div className={cx('flex h-full flex-col', className)} {...props}>
        <div className="container flex h-56 items-center gap-12 border-b border-t border-gray-80">
          <button
            className="rounded-full h-24 w-24 bg-gray-100"
            onClick={() => {
              router.push(ROUTES.CHAT);
            }}
          >
            <ArrowRight className="rotate-180" />
          </button>
          <h1 className="text-16 font-bold">{character?.name}</h1>
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
        <div className="flex h-[calc(100dvh-56px-48px)] items-center justify-center">
          {isLoading ? (
            <Spinner size={50} />
          ) : (
            <Chatbot messages={messages} chatRoomDetail={chatRoomDetail} />
          )}
        </div>
      </div>
    );
  }
);

ChatRoom.displayName = 'ChatRoom';

export default ChatRoom;
