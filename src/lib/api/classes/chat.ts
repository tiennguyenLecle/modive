import {
  CreateSessionResponse,
  GetMessagesResponse,
  LoginResponse,
} from '../types/response';
import { BaseApiClient } from './base';

export class ChatApiClient extends BaseApiClient {
  private chatApiId: string;

  constructor() {
    const CHAT_API_BASE_URL = process.env.DIT_API_BASE_URL;
    const CHAT_API_KEY = process.env.X_API_KEY;
    const CHAT_API_ID = process.env.X_API_ID;

    if (!CHAT_API_BASE_URL || !CHAT_API_KEY || !CHAT_API_ID) {
      throw new Error('Missing required Chat API environment variables.');
    }

    super(CHAT_API_BASE_URL, {
      'x-api-key': CHAT_API_KEY,
      Accept: 'application/json',
    });

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

  public addMemberShip(params: {
    userId: string;
    role: string;
    universeId: string;
  }) {
    const { userId, role, universeId } = params;
    return this.post(`/universe/${universeId}/memberships`, {
      body: {
        userId,
        role,
      },
    });
  }

  public searchSessionsByUserId(params: {
    universeId: string;
    userId: string;
  }) {
    const { universeId, userId } = params;
    const url = `/sessions/search?universeId=${universeId}&endUserId=${userId}`;
    return this.get(url);
  }

  public createSession(userId: string, bundleId?: string) {
    return this.post<CreateSessionResponse>(`/v3/universe/${bundleId}`, {
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

  public createMessage(params: {
    sessionId: string;
    chatbotName: string;
    userId: string;
    text: string;
    userName: string;
    gender: string;
    dateOfBirth: string;
  }) {
    const {
      sessionId,
      chatbotName,
      userId,
      text,
      userName,
      gender,
      dateOfBirth,
    } = params;
    return this.post(`/v3/universe/session/${sessionId}`, {
      body: {
        userId: this.chatApiId,
        command: {
          type: 'SEND_MESSAGE_TO_CHATROOM',
          messages: [text],
          metadata: {},
          senderId: userId,
          chatroomId: `${chatbotName}-${userId}`,
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

  public getChatbots(params: { universeId?: string }) {
    const { universeId } = params;
    // If not provide universeId, it will return all chatbots from all universes
    return this.get(`/chatbots?universeId=${universeId}`);
  }

  public getChatbotDetails(params: { chatbotId: string }) {
    const { chatbotId } = params;
    return this.get(`/chatbots/${chatbotId}`);
  }
}

// Note: Instance will be created in instances/ folder
