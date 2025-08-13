import dayjs from 'dayjs';

import { Message } from '@/lib/api/types/chat.types';
import { MessageInfoProps } from '@/lib/chatbot-modules';
import { formatDateOrTime } from '@/utils/formatTime';
import { filterMessageConditions } from '@/utils/method';
import { handleAlign, DEFAULT_IMAGE_URL, handleMessageText } from './utils';

/**
 * Create a date header message for the chat
 */
export const createDateHeader = (date: string): MessageInfoProps => ({
  id: `system_date_${date}`,
  chatroomId: '',
  speakerType: 'system',
  speakerId: 'system',
  name: 'system',
  message: formatDateOrTime(date, 'date'),
  contentOverride: formatDateOrTime(date, 'date'),
  createdDate: date,
});

/**
 * Transform a Message to MessageInfoProps
 */
export const transformMessageToInfoProps = (msg: Message): MessageInfoProps => ({
  id: msg.id,
  chatroomId: msg.chatroom_id,
  speakerType: msg.speaker_type ?? 'user',
  align: handleAlign(msg.speaker_type ?? 'user'),
  speakerId: msg.speaker_id,
  name: msg.speaker_id,
  message: msg.message,
  createdAt: formatDateOrTime(msg.created_at ?? '', 'time'),
  createdDate: msg.created_at
    ? dayjs(msg.created_at).format('YYYY-MM-DD')
    : null,
  avatarUrl: DEFAULT_IMAGE_URL,
  messageArray: msg.id === 'temparareryChatbotItemId' 
    ? [{ type: 'loading', message: 'Loading...' }] 
    : handleMessageText(msg.message),
});

/**
 * Map messages to MessageInfoProps with date headers
 */
export const mapMessagesToInfoProps = (
  messages: Message[],
  hasMorePrevious = false
): MessageInfoProps[] => {
  const seenIds = new Set<string>();
  
  // Filter and transform messages
  const base = messages
    .filter(msg => !filterMessageConditions(msg.message, msg.id, seenIds))
    .map(transformMessageToInfoProps);

  const result: MessageInfoProps[] = [];

  // Insert date headers and messages
  for (let i = 0; i < base.length; i++) {
    const current = base[i];
    const prev = base[i - 1];
    const curDate = current.createdDate;
    const prevDate = prev?.createdDate ?? null;

    const shouldInsertHeader =
      curDate &&
      ((prevDate && prevDate !== curDate) || (!prev && !hasMorePrevious));

    if (shouldInsertHeader) {
      result.push(createDateHeader(curDate));
    }

    result.push(current);
  }

  // Remove temporary createdDate field
  return result.map(({ createdDate, ...rest }) => rest as MessageInfoProps);
}; 