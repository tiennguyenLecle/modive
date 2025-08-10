'use client';

import {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { NextApi } from '@/lib/api';
import { Message, SpeakerType } from '@/lib/api/types/chat.types';
// @ts-ignore
//disable eslin
import {
  ChatboxComposer,
  ChatboxLayout,
  MessageInfoProps,
  MessageList,
  scrollToEnd,
} from '@/lib/chatbot-modules';

import '@/lib/chatbot-modules/dist/styles.css';

import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';

import { messagesAtom } from '@/atoms/messagesAtom';
import { filterMessageConditions } from '@/utils/method';

import { LoadingDots } from './Loading.client';

type ChatbotProps = ComponentProps<'div'> & {
  messages: Message[];
  chatbotName: string;
};

const DEFAULT_IMAGE_URL = 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png';

export default function Chatbot({
  messages: initialMessages,
  chatbotName,
}: ChatbotProps) {
  const { sendMessage } = useSendMessage();
  const [messages, setMessages] = useAtom(messagesAtom);
  const [newMessage, setNewMessage] = useState('');
  const { chatroomId } = useParams();
  const messageListRef = useRef<any>(null);
  const [isPreviousLoading, setIsPreviousLoading] = useState(false);
  const messagesRef = useRef<Message[]>(initialMessages || []);
  const prevLoadMoreRef = useRef<boolean>(false);
  const { data: session } = useSession();

  const hasBeforeMessages = useRef(false);

  useEffect(() => {
    setMessages(initialMessages);
    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollToIndex({
          index: messagesRef.current.length - 1,
          align: 'end',
          behavior: 'instant',
        });
      }
    }, 100);
  }, [initialMessages, setMessages]);

  const handleLoadMore = useCallback(async () => {
    console.log('day nhe');
    if (prevLoadMoreRef.current) return;
    prevLoadMoreRef.current = true;
    setIsPreviousLoading(true);

    const prevMessages = messagesRef?.current?.length;
    const beforeIdx = messagesRef?.current?.[0]?.id;

    const res: any = await NextApi.get(
      `/api/chat/${chatroomId}?direction=before&cursor=${beforeIdx}&limit=20`
    );

    if (res?.data?.length > 0) {
      const newData = [...res.data.reverse(), ...messagesRef?.current];
      setMessages(newData);
      messagesRef.current = newData;
      prevLoadMoreRef.current = false;

      setTimeout(() => {
        (messageListRef as any).current.scrollToIndex({
          index: newData.length - prevMessages,
          align: 'end',
          behavior: 'instant',
        });
        setIsPreviousLoading(false);
      }, 100);
    } else {
      prevLoadMoreRef.current = true;
      hasBeforeMessages.current = true;
      setIsPreviousLoading(false);
    }
  }, [messages, isPreviousLoading]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  }, []);

  const handleMessageText = (message: string) => {
    if (typeof message === 'string' && /\n+/.test(message)) {
      const parts = message?.split(/\n+/)?.filter(Boolean) || [];
      if (parts.length === 0) return [];

      return parts.map(part => {
        const isImage = part.startsWith('::image{id=');

        if (isImage) {
          const imageId = part?.split('{id=')[1]?.split('}')[0];

          return {
            type: 'image',
            imageUrl: DEFAULT_IMAGE_URL,
            message: '',
          };
        }
        return {
          type: 'text',
          message: part,
        };
      });
    }
  };

  const mappedMessages = (
    messages: Message[],
    hasMorePrevious = false
  ): MessageInfoProps[] => {
    const seenIds = new Set<string>();

    // 1) filter + basic map (kèm createdDate để so sánh ngày)
    const base = messages
      .filter(msg => !filterMessageConditions(msg.message, msg.id, seenIds))
      .map(msg => ({
        id: msg.id,
        chatroomId: msg.chatroom_id,
        speakerType: msg.speaker_type ?? 'user',
        speakerId: msg.speaker_id,
        name: msg.speaker_id,
        message:
          msg.id === 'temparareryChatbotItemId' ? <LoadingDots /> : msg.message,
        createdAt: msg.created_at ? dayjs(msg.created_at).format('HH:mm') : '',
        createdDate: msg.created_at
          ? dayjs(msg.created_at).format('YYYY-MM-DD')
          : null,
        avatarUrl: DEFAULT_IMAGE_URL,
        messageArray: handleMessageText(msg.message),
      }));

    // 2) iterate and insert date headers only when appropriate
    const out: MessageInfoProps[] = [];
    for (let i = 0; i < base.length; i++) {
      const current = base[i];
      const prev = base[i - 1]; // undefined nếu i === 0
      const curDate = current.createdDate;
      const prevDate = prev?.createdDate ?? null;

      // Should we insert a system date header before `current`?
      // - If there is a previous item and its date differs → yes.
      // - If there is NO previous (i === 0) AND we DON'T have more older messages (hasMorePrevious === false) → yes.
      // - Otherwise (i === 0 && hasMorePrevious === true) -> NO (we cannot be sure this is the first-of-day).
      const shouldInsertHeader =
        curDate &&
        ((prevDate && prevDate !== curDate) || (!prev && !hasMorePrevious));

      if (shouldInsertHeader) {
        const pretty = dayjs(curDate).format('dddd, MMMM D, YYYY');
        out.push({
          id: `system_date_${curDate}`, // stable id per date
          chatroomId: current.chatroomId,
          speakerType: 'system',
          speakerId: 'system',
          name: 'system',
          message: `---- ${pretty} ----`,
          contentOverride: `---- ${pretty} ----`,
          createdAt: '',
          avatarUrl: '',
          messageArray: [],
          createdDate: curDate,
        });
      }

      out.push(current);
    }

    // 3) remove the temporary createdDate field before returning (optional)
    return out.map(({ createdDate, ...rest }) => rest as MessageInfoProps);
  };

  const messageComponent = useMemo(
    () => (
      <MessageList
        messages={mappedMessages(messages)}
        conversationId={chatroomId as string}
        cache="local"
        onLoadMorePreviousData={handleLoadMore}
        showScrollToEndButton={true}
        className={'px-16'}
        ref={messageListRef}
        isPrevLoading={isPreviousLoading}
        isPrevLoadingComponent={
          <div className="flex h-40 w-full items-center justify-center text-16">
            Loading...
          </div>
        }
      />
    ),
    [handleLoadMore, isPreviousLoading, chatroomId]
  );

  const composerComponent = useMemo(
    () => (
      <ChatboxComposer
        textareaProps={{
          value: newMessage,
          onChange: handleChange,
          autoSize: {
            minRows: 1,
            maxRows: 5,
          },
        }}
        sendButtonComponent={{
          onClick: async () => {
            let lastMessageId = messages[messages.length - 1]?.id;
            const newMessageUser = {
              id: '1',
              chatroom_id: chatroomId as string,
              speaker_type: 'user' as SpeakerType,
              speaker_id: session?.user?.id,
              message: newMessage,
              created_at: dayjs().toISOString(),
            };

            const temparareryChatbotItem = {
              id: 'temparareryChatbotItemId',
              chatroom_id: chatroomId as string,
              speaker_type: 'chatbot' as SpeakerType,
              speaker_id: chatbotName,
              message: 'Thinking',
              created_at: dayjs().toISOString(),
            };

            setMessages((prev: Message[]) => [
              ...prev,
              newMessageUser,
              temparareryChatbotItem,
            ]);
            await sendMessage(newMessage);

            const startTime = Date.now();
            const interval = setInterval(async () => {
              const res: any = await NextApi.get(
                `/api/chat/${chatroomId}?limit=20&direction=after&cursor=${lastMessageId}`
              );
              const newMessages = res?.data ?? [];

              if (newMessages.length >= 2) {
                // Có đủ 2 messages => add ngay
                messagesRef.current = [...messages, ...newMessages];
                setMessages(messagesRef.current);
                setNewMessage('');
                clearInterval(interval);
              } else if (Date.now() - startTime >= 30000) {
                // Hết 30s
                if (newMessages.length === 1) {
                  // Thêm error field
                  const erroredMessage = { ...newMessages[0], error: true };
                  messagesRef.current = [...messages, erroredMessage];
                  setMessages(messagesRef.current);
                }
                // Nếu 0 tin nhắn mới thì không add gì
                clearInterval(interval);
              }
            }, 2000);
          },
          disabled: !newMessage.trim(),
          children: 'Send',
        }}
      />
    ),
    [newMessage, handleChange, sendMessage]
  );

  return (
    <ChatboxLayout
      backgroundColor="var(--color-background)"
      layoutHeight="calc(100dvh - 56px - 48px)" // 56px + 48px: header height
      messageComponent={messageComponent}
      composerComponent={composerComponent}
    />
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
        text: text,
      },
    });
  };

  return { sendMessage };
};
