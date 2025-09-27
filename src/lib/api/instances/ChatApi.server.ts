import { ChatApiClient } from '../classes/chat';

/**
 * SERVER-ONLY.
 * Chat API client includes some sensitive data to be used
 * for direct communication with external Chat API.
 */
export const ChatApi = new ChatApiClient();
