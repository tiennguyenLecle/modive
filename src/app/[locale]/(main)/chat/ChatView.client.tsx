'use client';

import { useRouter } from 'next/navigation';

import { Link } from '@/lib/navigation';

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
        <Link href="/chat/24d4608f-39f8-4d6e-b4ee-6073d0c058c7?sessionId=ab584cb2-c149-488f-9468-e1af8f009248">
          <button className="rounded-4 bg-primary p-8 text-left text-white">
            Chat Room: 24d4608f-39f8-4d6e-b4ee-6073d0c058c7
          </button>
        </Link>
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
