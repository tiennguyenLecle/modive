'use client';

import { ComponentProps, memo, useCallback, useEffect, useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { ArrowRight } from '@/assets/icons';
import { messageCountAtom, messagesAtom } from '@/atoms/messagesAtom';
import { ProgressBar, Spinner } from '@/components';
import { useAuth } from '@/lib/authentication/auth-context';
import { useRouter } from '@/lib/navigation';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  getRoomDetail,
  updateChatroomField,
} from '@/lib/supabase/swr/chatroom';
import { updateNewMsgCountUser } from '@/lib/supabase/swr/users';
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
    const [messageCount, setMessageCount] = useAtom(messageCountAtom);
    const affectionScore = useAffectionScore(messagesFromAtom);
    const { chatroomId } = useParams();
    const t = useTranslations('chat_page');
    const { character } = chatRoomDetail;
    const { user } = useAuth();
    const hasInitialized = useRef(false);

    const { messages, isLoading } = useFetchMessages(
      chatroomId as string,
      CHAT_CONSTANTS.DEFAULT_MESSAGE_LIMIT
    );

    const updateNewMessageCount = useCallback(async () => {
      const supabase = createBrowserSupabase('user');
      const detail = await getRoomDetail(supabase, chatroomId as string);
      if (!detail?.metadata?.new_msg_count) return;

      // new message count = count on Alarm Icon - number of new messages of current chatroom
      const newMsgCount = messageCount
        ? messageCount - detail.metadata.new_msg_count
        : messageCount;
      // Update message count in user metadata
      updateNewMsgCountUser(
        createBrowserSupabase('user'),
        user?.id as string,
        newMsgCount ?? 0
      );
      setMessageCount(newMsgCount ?? 0);
      // Update message count in chatroom
      updateChatroomField(supabase, chatroomId as string, {
        metadata: {
          new_msg_count: 0,
        },
      });
    }, [chatroomId, messageCount, setMessageCount, user?.id]);

    useEffect(() => {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        updateNewMessageCount();
      }
    }, [updateNewMessageCount, messageCount]);

    useEffect(() => {
      return () => {
        if (messages?.length > 0) {
          const lastMessage = messages[messages.length - 1];
          if (!lastMessage) return;

          updateChatroomField(
            createBrowserSupabase('user'),
            chatroomId as string,
            {
              last_accessed_at: lastMessage.created_at,
              last_message: lastMessage.message,
              metadata: {
                new_msg_count: 0,
              },
            }
          );
        }
      };
    }, [chatroomId, messages]);

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
            value={affectionScore && affectionScore > 0 ? affectionScore : 0}
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
