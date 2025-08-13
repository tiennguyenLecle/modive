'use client';

import { memo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import AsteristkDisabledIcon from '@/assets/icons/asterisk-disabled.svg';
import AsteristkIcon from '@/assets/icons/asterisk.svg';
import DirectDisabledIcon from '@/assets/icons/direct-disabled.svg';
import DirectIcon from '@/assets/icons/direct.svg';
import TipDisabledIcon from '@/assets/icons/tip-disabled.svg';
import TipIcon from '@/assets/icons/tip.svg';
import { messagesAtom } from '@/atoms/messagesAtom';
import { NextApi } from '@/lib/api';
import { Message, SpeakerType } from '@/lib/api/types/chat.types';
import { useAuth } from '@/lib/authentication/auth-context';
import { ChatboxComposer } from '@/lib/chatbot-modules';

import styles from './Composer.module.scss';

type ComposerProps = {
  chatroomId: string;
  chatbotName: string;
  sendMessage: (text: string) => Promise<void>;
  isChapterMode: boolean;
};

const Composer = memo(
  ({
    chatroomId,
    chatbotName,
    sendMessage,
    isChapterMode = false,
  }: ComposerProps) => {
    const { user } = useAuth();
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
      speaker_id: user?.id,
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

    const handleSendMessage = async () => {
      messagesRef.current = [...messages];
      if (!newMessage.trim()) return;

      let lastMessageId =
        messagesRef.current[messagesRef.current.length - 1]?.id ?? '';
      messagesRef.current = [
        ...messagesRef.current,
        mockNewMessageUser,
        mockResponseChatbotItem,
      ];

      setMessages(messagesRef.current);

      await sendMessage(newMessage);

      const startTime = Date.now();
      const interval = setInterval(async () => {
        const res: any = await NextApi.get(
          `/api/chat/${chatroomId}?limit=20&direction=after&cursor=${lastMessageId}`
        );
        const newMessages = res?.data ?? [];

        messagesRef.current = messagesRef.current.filter(
          msg =>
            msg.id !== 'temparareryChatbotItemId' &&
            msg.id !== 'newMessageUserItemId'
        );
        console.log('messagesRef.current', messagesRef.current);

        if (newMessages.length >= 2) {
          // Got 2 messages => add immediately
          messagesRef.current = [...messagesRef.current, ...newMessages];
          setMessages(messagesRef.current);
          clearInterval(interval);
        } else if (Date.now() - startTime >= 30000) {
          // After 30s
          if (newMessages.length === 1) {
            // Thêm error field - Because we don't receive response from chatbot
            const erroredMessage = { ...newMessages[0], error: true };
            messagesRef.current = [...messagesRef.current, erroredMessage];
            setMessages(messagesRef.current);
          }
          clearInterval(interval);
        }
      }, 2000);
    };

    const isDisabled = !newMessage.trim();

    return (
      <div className={`${styles.composer}`}>
        <ChatboxComposer
          beforeComposerOutsideComponent={{
            onClick: () => console.log('Tip'),
            disabled: isDisabled,
            children: isDisabled ? <TipDisabledIcon /> : <TipIcon />,
          }}
          textareaProps={{
            value: newMessage,
            onChange: handleChange,
            placeholder: '메시지를 입력하세요',
            autoSize: {
              minRows: 1,
              maxRows: 5,
            },
          }}
          afterComposerInsideComponent={
            isChapterMode && {
              onClick: () => console.log('Asterisk'),
              disabled: isDisabled,
              children: isDisabled ? (
                <AsteristkDisabledIcon />
              ) : (
                <AsteristkIcon />
              ),
            }
          }
          sendButtonComponent={{
            onClick: handleSendMessage,
            isDisabled: isDisabled,
            children: isDisabled ? <DirectDisabledIcon /> : <DirectIcon />,
          }}
        />
      </div>
    );
  }
);

Composer.displayName = 'Composer';

export default Composer;
