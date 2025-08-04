'use client';

import { useSession } from 'next-auth/react';

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
  const { data: userSession, status } = useSession();

  return (
    <div className="container min-h-0 overflow-auto p-4">
      <h2 className="text-22 font-semibold">User sessions</h2>
      <pre className="rounded mt-4 bg-gray-100 p-2">
        <code>{JSON.stringify(userSession, null, 2)}</code>
      </pre>

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
