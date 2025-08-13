/**
 * Handle align of message in chatbox
 * @param speaker_type - The type of speaker
 * @returns The align of message in chatbox
 */
export const handleAlign = (speaker_type: string): 'left' | 'right' | 'center' => {
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
 * Message content type definitions
 */
export type MessageContent = {
  type: 'text' | 'image';
  message: string;
  imageUrl?: string;
};

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

  // Handle text with line breaks
  if (/\n+/.test(text)) {
    const parts = text.split(/\n+/).filter(Boolean);
    
    if (parts.length === 0) return [];

    return parts.map(part => {
      const trimmedPart = part.trim();
      
      // Check if it's an image reference
      if (trimmedPart.startsWith('::image{id=')) {
        const imageId = extractImageId(trimmedPart);
        
        return {
          type: 'image' as const,
          imageUrl: DEFAULT_IMAGE_URL,
          message: '',
        };
      }
      
      return {
        type: 'text' as const,
        message: trimmedPart,
      };
    });
  }

  // Single line message
  return [{
    type: 'text' as const,
    message: text.trim(),
  }];
};

/**
 * Extract image ID from image reference string
 * @param imageRef - Image reference string (e.g., "::image{id=123}")
 * @returns Extracted image ID or empty string if invalid
 */
const extractImageId = (imageRef: string): string => {
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