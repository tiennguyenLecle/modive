export type ChatRoomState = {
  db: {
    chatroomId: string;
  };
  id: string;
  type: 'dm' | string;
  state: Record<string, any>;
  messages: string[];
  taskInfo: {
    workers: Record<string, any>;
  };
  appContext: Record<string, any>;
  numMessages: {
    bot: Record<string, any>;
    user: Record<string, number>;
    total?: number | null;
  };
  participants: {
    bots: string[];
    users: string[];
  };
  lastMessageAt: {
    bot: {};
    user: Record<string, string | null>;
    total?: number | null;
  };
  firstMessageAt: {
    bot: {};
    user: Record<string, string | null>;
    total?: number | null;
  };
  numMemoryAnalyzedMessages: {
    total: number;
  };
};
