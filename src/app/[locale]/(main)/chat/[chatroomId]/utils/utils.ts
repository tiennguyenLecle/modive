/**
 * Handle align of message in chatbox
 * @param speaker_type - The type of speaker
 * @returns The align of message in chatbox
 */
export const handleAlign = (
  speaker_type: string
): 'left' | 'right' | 'center' => {
  switch (speaker_type) {
    case 'user':
      return 'right';
    case 'chatbot':
      return 'left';
    default:
      return 'center';
  }
};

export const DEFAULT_IMAGE_URL =
  'https://vlpmvoapckykpuwtpedn.supabase.co/storage/v1/object/public/medias/characters/character-avatar-1.png';

/**
 * Message content type definitions
 */
export type MessageContent = {
  type: 'text' | 'image' | 'markdown';
  message: string;
  imageUrl?: string;
};

function parseMessage(str: string) {
  // bắt cả alt text và url
  const regex = /!\[(.*?)\]\((https?:\/\/.*?)\)/g;

  let result: any[] = [];
  let lastIndex = 0;

  for (const match of str.matchAll(regex)) {
    const matchText = match[0];
    const alt = match[1]; // alt text nằm trong []
    const url = match[2]; // url trong ()
    const index = match.index ?? 0;

    // text trước image
    if (lastIndex < index) {
      const textPart = str.slice(lastIndex, index).trim();
      if (textPart) {
        result.push({ type: 'markdown', message: textPart });
      }
    }

    // push image kèm alt
    result.push({ type: 'image', imageUrl: url, alt });

    lastIndex = index + matchText.length;
  }

  // text còn lại sau image
  if (lastIndex < str.length) {
    const textPart = str.slice(lastIndex).trim();
    if (textPart) {
      result.push({ type: 'markdown', message: textPart });
    }
  }

  return result;
}

/**
 * Handle message text parsing and conversion
 * @param text - The text of message to split and convert to array of message content
 * @returns Array of message content objects or empty array if invalid
 */
export const handleMessageText = (text: string): MessageContent[] => {
  // Validate input
  if (!text || typeof text !== 'string') {
    return [];
  }

  return parseMessage(text);
};

/**
 * Extract image ID from image reference string
 * @param imageRef - Image reference string (e.g., "::image{id=123}")
 * @returns Extracted image ID or empty string if invalid
 */
export const extractImageId = (imageRef: string): string => {
  try {
    const match = imageRef.match(/::image\{id=([^}]+)\}/);
    return match?.[1] || '';
  } catch (error) {
    console.warn('Failed to extract image ID from:', imageRef, error);
    return '';
  }
};

/**
 * Validate if a string is a valid image reference
 * @param text - Text to validate
 * @returns True if valid image reference
 */
export const isImageReference = (text: string): boolean => {
  return /^::image\{id=[^}]+\}$/.test(text.trim());
};
