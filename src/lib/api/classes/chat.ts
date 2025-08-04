import { GetMessagesResponse, LoginResponse } from '../types/chat.types';
import { BaseApiClient } from './base';

export class ChatApiClient extends BaseApiClient {
  private universeId: string;
  private chatbotName: string;
  private chatApiId: string;

  constructor() {
    const CHAT_API_BASE_URL = process.env.DIT_API_BASE_URL;
    const CHAT_API_KEY = process.env.X_API_KEY;
    const CHAT_API_ID = process.env.X_API_ID;
    const CHAT_UNIVERSE_ID = process.env.DIT_CHATBOT_UNIVERSE_ID;
    const CHAT_BOT_NAME = process.env.DIT_CHATBOT_NAME;

    if (
      !CHAT_API_BASE_URL ||
      !CHAT_API_KEY ||
      !CHAT_API_ID ||
      !CHAT_UNIVERSE_ID ||
      !CHAT_BOT_NAME
    ) {
      throw new Error('Missing required Chat API environment variables.');
    }

    super(CHAT_API_BASE_URL, {
      'x-api-key': CHAT_API_KEY,
      Accept: 'application/json',
    });

    this.universeId = CHAT_UNIVERSE_ID;
    this.chatbotName = CHAT_BOT_NAME;
    this.chatApiId = CHAT_API_ID;
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

  public logout() {
    return this.post('/auth/logout');
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

  public createSession(userId: string) {
    return this.post(`/v3/universe/${this.universeId}`, {
      body: {
        endUserId: userId,
        endUserMetadata: '',
      },
    });
  }

  /**
   * @param chatroomId - The chatroom id to get the messages from.
   * @param cursor - The message id to get the "limit" forward/backward messages from.
   * @param limit - The number of messages to return.
   * @param direction - Get the messages before/after the cursor.
   */
  public getMessages(
    chatroomId: string,
    cursor?: string,
    limit?: number,
    direction?: 'before' | 'after'
  ) {
    const params = new URLSearchParams();
    if (cursor) params.set('cursor', cursor);
    if (limit) params.set('limit', limit.toString());
    if (direction) params.set('direction', direction);

    return this.get<GetMessagesResponse>(
      `/chats/chatroom/${chatroomId}?${params.toString()}`
    );
  }

  public createMessage(
    sessionId: string,
    chatroomId: string,
    userId: string,
    text: string,
    userName: string,
    gender: string,
    dateOfBirth: string
  ) {
    console.log('Send message payload: ', {
      userId: this.chatApiId,
      command: {
        type: 'SEND_MESSAGE_TO_CHATROOM',
        messages: [text],
        metadata: {},
        senderId: userId,
        chatroomId: `${this.chatbotName}-${userId}`,
        senderType: 'user',
        appContext: {
          username: userName,
          gender,
          dob: dateOfBirth,
        },
      },
    });

    return this.post(`/v3/universe/session/${sessionId}`, {
      body: {
        userId: this.chatApiId,
        command: {
          type: 'SEND_MESSAGE_TO_CHATROOM',
          messages: [text],
          metadata: {},
          senderId: userId,
          chatroomId: `${this.chatbotName}-${userId}`,
          senderType: 'user',
          appContext: {
            username: userName,
            gender,
            dob: dateOfBirth,
          },
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
