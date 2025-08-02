import { BaseApiClient } from './base';

export class ChatApiClient extends BaseApiClient {
  private universeId: string;

  constructor() {
    const CHAT_API_BASE_URL = process.env.DIT_API_BASE_URL;
    const CHAT_API_KEY = process.env.X_API_KEY;
    const CHAT_UNIVERSE_ID = process.env.DIT_CHATBOT_UNIVERSE_ID;

    if (!CHAT_API_BASE_URL || !CHAT_API_KEY || !CHAT_UNIVERSE_ID) {
      throw new Error('Missing required Chat API environment variables.');
    }

    super(CHAT_API_BASE_URL, {
      'x-api-key': CHAT_API_KEY,
      Accept: 'application/json',
    });

    this.universeId = CHAT_UNIVERSE_ID;
  }

  // --- Utility Methods for Chat API ---
  public searchSessionsByUserId(userId: string) {
    const url = `/sessions/search?universeId=${this.universeId}&endUserId=${userId}`;
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

// Note: Instance will be created in instances/ folder
