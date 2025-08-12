/**
 * Handle align of message in chatbox
 * @param speaker_type - The type of speaker
 * @returns The align of message in chatbox
 */
export const handleAlign = (speaker_type: string) => {
    switch (speaker_type) {
      case 'user':
        return 'right';
      case 'chatbot':
        return 'left';
      default:
        return 'center';
    }
};

export const DEFAULT_IMAGE_URL = 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png';

/**
 * Handle message text
 * @param text - The text of message - using to split text and coverts to array of message
 * @returns The message text
 */
export const handleMessageText = (text: string) => {
  // handle text message
  if (typeof text === 'string' && /\n+/.test(text)) {
    const parts = text?.split(/\n+/)?.filter(Boolean) || [];
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