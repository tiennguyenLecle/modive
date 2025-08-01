import { BaseApiClient } from './base-client';

// --- Specific API Client Classes ---

class ChatApiClient extends BaseApiClient {
  private universeId: string;

  constructor() {
    const chatApiBaseUrl = process.env.DIT_API_BASE_URL;
    const chatApiKey = process.env.X_API_KEY;
    const universeId = process.env.DIT_CHATBOT_UNIVERSAE_ID;

    // Validate environment variables inside the constructor
    if (!chatApiBaseUrl || !chatApiKey || !universeId) {
      throw new Error('Missing required Chat API environment variables.');
    }

    // Call the parent constructor with the validated variables
    super(chatApiBaseUrl, {
      'x-api-key': chatApiKey,
    });

    this.universeId = universeId;
  }

  // --- Utility Methods for Chat API ---

  public searchSessionsByUserId(userId: string) {
    const url = `/sessions/search?universeId=${this.universeId}&userId=${userId}`;
    return this.get(url);
  }

  public createSession(userId: string, initialMessage: string) {
    const url = `/universe/${this.universeId}`;
    const body = {
      userId,
      endUserMetadata: { message: initialMessage },
    };
    return this.post(url, body);
  }

  public getMessages(chatroomId: string) {
    return this.get(`/chats/chatroom/${chatroomId}`);
  }

  public createMessage(chatroomId: string, senderId: string, text: string) {
    const url = `/chats/chatroom/${chatroomId}`;
    const body = { senderId, text };
    return this.post(url, body);
  }
}

// --- Exported Instances ---

/**
 * A singleton instance of the ChatApiClient.
 * Use this for all communications with the external Chat API.
 */
export const chatApi = new ChatApiClient();

/**
 * A generic client for calling our own Next.js API routes (BFF).
 * Use this in Client Components.
 */
export const internalApi = new BaseApiClient('');
