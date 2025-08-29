/**
 * Constants for chat functionality
 */

export const CHAT_CONSTANTS = {
  DEFAULT_MESSAGE_LIMIT: 20,
  LOAD_MORE_LIMIT: 20,
} as const;

export const CHAT_DIRECTIONS = {
  BEFORE: 'before',
  AFTER: 'after',
} as const;

export type ChatDirection =
  (typeof CHAT_DIRECTIONS)[keyof typeof CHAT_DIRECTIONS];
