'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/authentication/auth-context';
import { Link } from '@/lib/navigation';

// Define a more specific type for the expected data prop
interface ChatViewProps {
  sessions: any;
  chatBotName: string;
}

export default function ChatView({
  sessions: chatSessions,
  chatBotName,
}: ChatViewProps) {
  const router = useRouter();

  return (
    <div className="container min-h-0 overflow-auto p-4">
      <h2 className="text-22 font-semibold">User sessions</h2>

      <div>
        <div>{chatSessions.data.length}</div>
        <ul className="flex flex-col gap-16">
          {chatSessions.data.map((session: any) => (
            <li key={session.id}>
              <div>Session: {session.id}</div>
              {session.chatrooms.map((chatroom: any) => {
                if (chatroom.room_name !== chatBotName) return null;
                return (
                  <Link
                    key={chatroom.id}
                    href={`/chat/${chatroom.id}?sessionId=${session.id}`}
                  >
                    <button className="rounded-4 bg-primary p-8 text-left text-white">
                      Chat Room: {chatroom.id}
                    </button>
                  </Link>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
