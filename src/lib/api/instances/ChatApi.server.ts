import { ChatApiClient } from '../classes/chat';

/**
 * SERVER-ONLY.
 * Chat API client includes some sensitive data to be used
 * for direct communication with external Chat API.
 *
 * @example
 * // In server components and API routes
 * const sessions = await ChatApi.searchSessionsByUserId('user-123');
 * const newSession = await ChatApi.createSession('user-123', 'Hello!');
 */
export const ChatApi = new ChatApiClient();
