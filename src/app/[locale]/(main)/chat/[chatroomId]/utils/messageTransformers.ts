import dayjs from 'dayjs';

import { Message } from '@/lib/api/types/chat.types';
import { MessageInfoProps } from '@/lib/chatbot-modules';
import { formatDateOrTime } from '@/utils/formatTime';
import { filterMessageConditions } from '@/utils/method';

import { DEFAULT_IMAGE_URL, handleAlign, handleMessageText } from './utils';

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

// preload image and return object with image info
const preloadImageInfo = (item: any): Promise<any> => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const isHorizontal = img.width > img.height;
      resolve({
        ...item,
        isHorizontal,
        imageHeight: isHorizontal ? 120 : 160,
      });
    };
    img.onerror = () => {
      resolve({
        ...item,
        isHorizontal: false,
        imageHeight: 160,
      });
    };
    img.src = item.imageUrl;
  });
};

// Preload images for all image items in messageArray
const preloadMessageImages = async (message: any): Promise<any> => {
  if (!message.messageArray || message.messageArray.length === 0) {
    return message;
  }

  try {
    // Process each item in messageArray
    const updatedMessageArray = await Promise.all(
      message.messageArray.map(async (item: any) => {
        if (item.type === 'image' && item.imageUrl) {
          try {
            // Preload this specific image item
            const preloadedItem = await preloadImageInfo(item);
            return preloadedItem;
          } catch (error) {
            console.error('Error preloading image:', item.imageUrl, error);
            // Return original item if preloading fails
            return item;
          }
        }
        // Return non-image items as-is
        return item;
      })
    );

    // Return message with updated messageArray
    return {
      ...message,
      messageArray: updatedMessageArray,
    };
  } catch (error) {
    console.error('Error in preloadMessageImages:', error);
    // Return original message if processing fails
    return message;
  }
};

/**
 * Transform a Message to MessageInfoProps
 */
export const transformMessageToInfoProps = (
  msg: Message
): MessageInfoProps => ({
  id: msg.id,
  chatroomId: msg.chatroom_id,
  speakerType: msg.speaker_type ?? 'user',
  align: handleAlign(msg.speaker_type ?? 'user'),
  speakerId: msg.speaker_id,
  name: msg.speaker_id,
  message: '',
  createdAt: formatDateOrTime(msg.created_at ?? '', 'time'),
  createdDate: msg.created_at
    ? dayjs(msg.created_at).format('YYYY-MM-DD')
    : null,
  avatarUrl: DEFAULT_IMAGE_URL,
  messageArray: msg.id.startsWith('temparareryChatbotItemId')
    ? [{ type: 'loading', message: 'Loading...' }]
    : handleMessageText(msg.message),
});

/**
 * Map messages to MessageInfoProps with date headers
 */
export const mapMessagesToInfoProps = async (
  messages: Message[],
  hasMorePrevious = false
) => {
  const seenIds = new Set<string>();

  // Filter and transform messages
  const base = messages
    .filter(msg => !filterMessageConditions(msg?.message, msg?.id, seenIds))
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

  const withImages = await Promise.all(
    result.map(async message => {
      // Check if messageArray contains any image items
      const hasImages = message.messageArray?.some(
        (itemByType: any) => itemByType.type === 'image' && itemByType.imageUrl
      );

      if (hasImages) {
        // Preload images and update messageArray
        const updatedMessage = await preloadMessageImages(message);
        return updatedMessage;
      }

      return message;
    })
  );

  return withImages.map(({ createdDate, ...rest }: any) => ({
    ...rest,
    createdDate: createdDate
      ? dayjs(createdDate).format('YYYY.MM.DD')
      : undefined,
  }));
};
