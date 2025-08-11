'use client';

import { memo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';

import { messagesAtom } from '@/atoms/messagesAtom';
import { NextApi } from '@/lib/api';
import { Message, SpeakerType } from '@/lib/api/types/chat.types';
import { ChatboxComposer } from '@/lib/chatbot-modules';

type ComposerProps = {
  chatroomId: string;
  chatbotName: string;
  sendMessage: (text: string) => Promise<void>;
};

const Composer = memo(
  ({ chatroomId, chatbotName, sendMessage }: ComposerProps) => {
    const { data: session } = useSession();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useAtom(messagesAtom);
    const messagesRef = useRef<Message[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewMessage(e.target.value);
    };

    const mockNewMessageUser = {
      id: 'newMessageUserItemId',
      chatroom_id: chatroomId,
      speaker_type: 'user' as SpeakerType,
      speaker_id: session?.user?.id,
      message: newMessage,
      created_at: dayjs().toISOString(),
    };

    const mockResponseChatbotItem = {
      id: 'temparareryChatbotItemId',
      chatroom_id: chatroomId,
      speaker_type: 'chatbot' as SpeakerType,
      speaker_id: chatbotName,
      message: 'Thinking',
      created_at: dayjs().toISOString(),
    };

    return (
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
            if (!newMessage.trim()) return;

            let lastMessageId = messages[messages.length - 1]?.id ?? '';

            setMessages((prev: Message[]) => [
              ...prev,
              mockNewMessageUser,
              mockResponseChatbotItem,
            ]);
            await sendMessage(newMessage);

            const startTime = Date.now();
            const interval = setInterval(async () => {
              const res: any = await NextApi.get(
                `/api/chat/${chatroomId}?limit=20&direction=after&cursor=${lastMessageId}`
              );
              const newMessages = res?.data ?? [];

              if (newMessages.length >= 2) {
                // Got 2 messages => add immediately
                messagesRef.current = [...messages, ...newMessages];
                setMessages(messagesRef.current);
                setNewMessage('');
                clearInterval(interval);
              } else if (Date.now() - startTime >= 30000) {
                // After 30s
                if (newMessages.length === 1) {
                  // Thêm error field - Because we don't receive response from chatbot
                  const erroredMessage = { ...newMessages[0], error: true };
                  messagesRef.current = [...messages, erroredMessage];
                  setMessages(messagesRef.current);
                }

                clearInterval(interval);
              }
            }, 2000);
          },
          disabled: !newMessage.trim(),
          children: 'Send',
        }}
      />
    );
  }
);

Composer.displayName = 'Composer';

export default Composer;
