import { GetMessagesResponse, LoginResponse } from '../types/chat.types';
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

  public login(email: string, password: string) {
    return this.post<LoginResponse>('/auth/login', {
      body: { email, password },
    });
  }

  public register(name: string, email: string, password: string) {
    return this.post('/auth/register', { body: { name, email, password } });
  }

  public resetPassword(email: string) {
    return this.post('/auth/reset-password', { body: { email } });
  }

  public logout(accessToken: string) {
    return this.post('/auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public addMemberShip(userId: string, role: string) {
    return this.post(`/universe/${this.universeId}/memberships`, {
      body: {
        userId,
        role,
      },
    });
  }

  public searchSessionsByUserId(userId: string) {
    const url = `/sessions/search?universeId=${this.universeId}&endUserId=${userId}`;
    return this.get(url);
  }

  public createSession(userId: string, initialMessage: string) {
    return this.post(`/universe/${this.universeId}`, {
      body: {
        userId,
        endUserMetadata: { message: initialMessage },
      },
    });
  }

  public getMessages(chatroomId: string) {
    return this.get<GetMessagesResponse>(`/chats/chatroom/${chatroomId}`);
  }

  public createMessage(
    sessionId: string,
    chatroomId: string,
    userId: string,
    text: string
  ) {
    return this.post(`/chats/chatroom/${sessionId}`, {
      body: {
        userId,
        command: {
          type: 'SEND_MESSAGE_TO_CHATROOM',
          senderType: 'user',
          senderId: userId,
          chatroomId,
          messages: [text],
        },
      },
    });
  }

  public getChatbots() {
    // If not provide universeId, it will return all chatbots from all universes
    return this.get(`/chatbots?universeId=${this.universeId}`);
  }

  public getChatbotDetails(chatbotId: string) {
    return this.get(`/chatbots/${chatbotId}`);
  }
}

// Note: Instance will be created in instances/ folder
