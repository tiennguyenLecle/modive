import { useMemo } from 'react';

import { Message } from '@/lib/api/types/chat.types';

const AFFECTION_SCORE_REGEX = /<affection_score>(\d+)<\/affection_score>/;

const extractAffectionScore = (messageText: string): number | null => {
  const match = AFFECTION_SCORE_REGEX.exec(messageText);
  return match ? Number(match[1]) : null;
};

export const useAffectionScore = (messages: Message[]): number | null => {
  return useMemo(() => {
    const lastChatbotMessage = messages.findLast(
      msg => msg.speaker_type === 'chatbot'
    );

    if (lastChatbotMessage) {
      const messageText = lastChatbotMessage.v2_data?.message?.parts?.[0]?.text;
      if (messageText) {
        return extractAffectionScore(messageText);
      }
    }

    return null;
  }, [messages]);
};
